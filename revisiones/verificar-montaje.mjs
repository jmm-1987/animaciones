import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
let pages;for(let attempt=0;attempt<30;attempt++){try{pages=await(await fetch('http://127.0.0.1:9238/json/list')).json();break}catch(error){if(attempt===29)throw error;await new Promise(resolve=>setTimeout(resolve,100))}}
const socket=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
await new Promise(resolve=>socket.addEventListener('open',resolve,{once:true}));
let sequence=0;const pending=new Map(),events=new Map();
socket.addEventListener('message',({data})=>{const message=JSON.parse(data);if(message.id){const callback=pending.get(message.id);pending.delete(message.id);message.error?callback.reject(message.error):callback.resolve(message.result)}else for(const callback of events.get(message.method)||[])callback(message.params)});
const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))});
const once=event=>new Promise(resolve=>{events.set(event,[params=>{events.delete(event);resolve(params)}])});
await call('Page.enable');await call('Runtime.enable');await call('Emulation.setDeviceMetricsOverride',{width:540,height:1000,deviceScaleFactor:1,mobile:false});
await call('Page.addScriptToEvaluateOnNewDocument',{source:'window.__qaAudio=[];const NativeAudio=window.Audio;window.Audio=function(...args){const audio=new NativeAudio(...args);window.__qaAudio.push(audio);return audio};window.Audio.prototype=NativeAudio.prototype;'});
const files=fs.readdirSync('.').filter(n=>n.endsWith('.html')&&(!process.argv[2]||(process.argv[2].endsWith('.html')?n===process.argv[2]:n.startsWith(process.argv[2])))&&fs.readFileSync(n,'utf8').includes('window.STORY_CONFIG='));
const failures=[];let count=0;
for(const file of files){
 const config=JSON.parse(fs.readFileSync(file,'utf8').match(/window.STORY_CONFIG=(.*?);<\/script>/)[1]);
 const times=config.marks.slice(0,-1).map((mark,i)=>mark+(config.marks[i+1]-mark)*.6);
 for(let i=0;i<times.length;i++){
  const loaded=once('Page.loadEventFired');await call('Page.navigate',{url:pathToFileURL(process.cwd()+'/'+file).href+'?t='+times[i]});await loaded;
  const {result}=await call('Runtime.evaluate',{expression:`(()=>{const s=document.querySelector('.story-scene.active'),stage=document.querySelector('.story-stage'),shot=s.querySelector('.shot'),visual=s.querySelector('.shot-visual');const problems=[];const logos=[...stage.querySelectorAll('img[src$="logo.png"]')].filter(img=>img.getClientRects().length&&getComputedStyle(img).visibility!=='hidden');if(logos.length!==(document.body.dataset.promo==='facturas'&&s.dataset.scene==='1'?0:1))problems.push('logotipos visibles: '+logos.length);if(Number(s.dataset.scene)!==${i})problems.push('fase');if([...document.querySelectorAll('.story-scene')].filter(s=>!s.inert).length!==1)problems.push('inert');if(shot){const r=shot.getBoundingClientRect(),v=visual.getBoundingClientRect(),child=[...visual.children].find(n=>!n.classList.contains('local-label')),c=child?.getBoundingClientRect();if(r.bottom>document.querySelector('.story-controls').getBoundingClientRect().top)problems.push('solapa controles');if(c&&c.height>v.height+2)problems.push('visual recortado '+c.height+'/'+v.height);if(r.top<document.querySelector('.story-header').getBoundingClientRect().bottom)problems.push('solapa cabecera')}return {problems,phase:s.dataset.scene,caption:s.querySelector('.shot-caption')?.textContent}})()`,returnByValue:true});
  if(result.value.problems.length)failures.push({file,time:times[i],...result.value});count++;
  if((file==='video-cobros.html'&&[0,2,4].includes(i))||(file==='video-bocateria.html'&&i===0)||(file==='video-conciliacion.html'&&[0,2,3,4,5].includes(i))||(file.includes('-sistema.html')&&[2,3].includes(i))||file==='piloto-bocateria.html'||file==='promo-facturas.html'||file.startsWith('gestion-')||file.startsWith('practico-')){
   const {data}=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync('revisiones/rrss-'+file.replace('.html','')+'-'+i+'.png',Buffer.from(data,'base64'));
  }
  if(file==='piloto-bocateria.html'&&i===2){
   const {result:order}=await call('Runtime.evaluate',{expression:`({quantity:document.querySelector('#pilot-quantity').textContent,total:document.querySelector('#pilot-total').textContent,ingredient:document.querySelector('.ingredient').classList.contains('selected')})`,returnByValue:true});
   if(order.value.quantity!=='2'||!order.value.total.includes('12,00')||!order.value.ingredient)failures.push({file,order:order.value});
  }
  if(file==='promo-facturas.html'&&i===1){
   const {result:clock}=await call('Runtime.evaluate',{expression:"({text:document.querySelector('.timer-beat h1').textContent,clock:!!document.querySelector('.billing-clock'),images:document.querySelector('.timer-beat').querySelectorAll('img').length,digits:document.querySelector('#billing-clock-time').textContent})",returnByValue:true});
   if(!clock.value.clock||clock.value.images||clock.value.digits==='00:00')failures.push({file,clock:clock.value});
  }
  if(file==='promo-facturas.html'&&i===3){
   const {result:integrations}=await call('Runtime.evaluate',{expression:`({count:document.querySelectorAll('[data-integration]').length,wires:document.querySelectorAll('[data-integration-wire]').length,visible:[...document.querySelectorAll('[data-integration]')].filter(n=>Number(n.style.opacity)>.95).length})`,returnByValue:true});
   if(integrations.value.count!==6||integrations.value.wires!==6||integrations.value.visible!==6)failures.push({file,integrations:integrations.value});
  }
  if(file==='promo-facturas.html'&&i===2){
   const {result:meeting}=await call('Runtime.evaluate',{expression:`(()=>{const m=document.querySelector('.process-meeting'),r=m.getBoundingClientRect();return {people:m.querySelectorAll('.meeting-person').length,gender:[...m.querySelectorAll('[data-gender]')].map(n=>n.dataset.gender),clipped:r.bottom>document.querySelector('.billing-reel.process-analysis').getBoundingClientRect().bottom,controls:r.bottom>document.querySelector('.story-controls').getBoundingClientRect().top}})()`,returnByValue:true});
   if(meeting.value.people!==2||meeting.value.clipped||meeting.value.controls)failures.push({file,meeting:meeting.value});
  }
  if(file==='promo-facturas.html'&&i===0){
   const {result:cover}=await call('Runtime.evaluate',{expression:`(()=>{const invoice=document.querySelector('.real-invoice.front'),caption=document.querySelector('.billing-hook-last');return {count:document.querySelectorAll('.real-invoice').length,overlap:invoice&&caption?invoice.getBoundingClientRect().bottom>caption.getBoundingClientRect().top:false}})()`,returnByValue:true});
   if(cover.value.count!==2||cover.value.overlap)failures.push({file,cover:cover.value});
  }
  if(file.startsWith('gestion-')&&i===0){
   const {result:papers}=await call('Runtime.evaluate',{expression:`(()=>{const visual=document.querySelector('.story-scene.active .shot-visual').getBoundingClientRect();return [...document.querySelectorAll('.cover-paper')].map(p=>{const r=p.getBoundingClientRect();return {side:p.className,bottom:r.bottom,limit:visual.bottom,clipped:r.bottom>visual.bottom+1}})})()`,returnByValue:true});
   if(papers.value.length!==2||papers.value.some(p=>p.clipped))failures.push({file,papers:papers.value});
  }
  if(file.startsWith('practico-')&&i===times.length-1){
   const {result:resource}=await call('Runtime.evaluate',{expression:`({present:!!document.querySelector('#recurso'),links:[...document.querySelectorAll('#recurso a[download]')].length,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth})`,returnByValue:true});
   if(!resource.value.present||resource.value.links<2||resource.value.overflow)failures.push({file,resource:resource.value});
   if(file==='practico-recordatorio.html'){
    const {result:message}=await call('Runtime.evaluate',{expression:`(()=>{const f=document.querySelector('#reminder-form');f.elements.name.value='Luis';f.elements.invoice.value='F-170';f.elements.balance.value='400.5';f.elements.due.value='2026-11-20';f.elements.business.value='Mi negocio';f.dispatchEvent(new Event('input'));return document.querySelector('#reminder-preview').value})()`,returnByValue:true});
    if(!message.value.includes('Luis')||!message.value.includes('400,50')||!message.value.includes('F-170')||!message.value.includes('Mi negocio'))failures.push({file,message:message.value});
    await call('Runtime.evaluate',{expression:`document.querySelector('#recurso').scrollIntoView()`});const {data}=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync('revisiones/recurso-recordatorio.png',Buffer.from(data,'base64'));
   }
  }
  if(config.builtinAudio&&i===4){
   const {result:audioResult}=await call('Runtime.evaluate',{expression:`(()=>{const audio=window.__qaAudio[0],seek=document.querySelector('#seek');seek.value=10;seek.dispatchEvent(new Event('input'));return {rate:audio.playbackRate,pitch:audio.preservesPitch,currentTime:audio.currentTime,elapsed:Number(seek.value)}})()`,returnByValue:true});
   const a=audioResult.value;if(a.rate!==config.audioRate||!a.pitch||Math.abs(a.currentTime-10*config.audioRate)>.02)failures.push({file,audio:a});
  }
  if(i===times.length-1){
   const {result:scriptResult}=await call('Runtime.evaluate',{expression:`(()=>{const data=JSON.parse(document.querySelector('#narration-data').textContent),rows=[...document.querySelectorAll('.script-table tbody tr')],seek=document.querySelector('#seek');document.querySelector('[data-script-seek]').click();return {rows:rows.length,textMatches:document.querySelector('#script-plain').value===data.plain,jump:Number(seek.value),paused:document.querySelector('#play').getAttribute('aria-label')==='Reproducir'}})()`,returnByValue:true});
   const script=scriptResult.value;if(script.rows!==config.marks.length-1||!script.textMatches||script.jump!==0||!script.paused)failures.push({file,script});
   if(file==='video-conciliacion.html'){
    const {result:copyResult}=await call('Runtime.evaluate',{expression:`(async()=>{document.querySelector('[data-copy-script="plain"]').click();await new Promise(resolve=>setTimeout(resolve,300));return document.querySelector('#script-feedback').textContent})()`,awaitPromise:true,returnByValue:true,userGesture:true});
    if(!copyResult.value)failures.push({file,copy:'Sin respuesta del botón'});
    const {result:layoutResult}=await call('Runtime.evaluate',{expression:`(()=>{const fallback=document.querySelector('#copy-fallback');return {overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,selected:fallback?fallback.selectionEnd-fallback.selectionStart===fallback.value.length:true}})()`,returnByValue:true});
    if(layoutResult.value.overflow||!layoutResult.value.selected)failures.push({file,scriptLayout:layoutResult.value});
    await call('Runtime.evaluate',{expression:`document.querySelector('#guion').scrollIntoView()`});
    const {data}=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync('revisiones/guion-conciliacion.png',Buffer.from(data,'base64'));
   }
  }
 }
}
console.log(JSON.stringify({checked:count,failures},null,2));
fs.writeFileSync('revisiones/resultado.json',JSON.stringify({checked:count,failures},null,2));
await call('Browser.close');
if(failures.length)process.exitCode=1;
