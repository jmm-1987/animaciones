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
const files=fs.readdirSync('.').filter(n=>(n.startsWith('video-')&&n.endsWith('.html'))||n==='index-comic.html'||n==='presentacion.html');
const failures=[];let count=0;
for(const file of files){
 const config=JSON.parse(fs.readFileSync(file,'utf8').match(/window.STORY_CONFIG=(.*?);<\/script>/)[1]);
 const times=config.marks.slice(0,-1).map((mark,i)=>mark+(config.marks[i+1]-mark)*.6);
 for(let i=0;i<times.length;i++){
  const loaded=once('Page.loadEventFired');await call('Page.navigate',{url:pathToFileURL(process.cwd()+'/'+file).href+'?t='+times[i]});await loaded;
  const {result}=await call('Runtime.evaluate',{expression:`(()=>{const s=document.querySelector('.story-scene.active'),stage=document.querySelector('.story-stage'),shot=s.querySelector('.shot'),visual=s.querySelector('.shot-visual');const problems=[];if(Number(s.dataset.scene)!==${i})problems.push('fase');if([...document.querySelectorAll('.story-scene')].filter(s=>!s.inert).length!==1)problems.push('inert');if(shot){const r=shot.getBoundingClientRect(),v=visual.getBoundingClientRect(),child=[...visual.children].find(n=>!n.classList.contains('local-label')),c=child?.getBoundingClientRect();if(r.bottom>document.querySelector('.story-controls').getBoundingClientRect().top)problems.push('solapa controles');if(c&&c.height>v.height+2)problems.push('visual recortado '+c.height+'/'+v.height);if(r.top<document.querySelector('.story-header').getBoundingClientRect().bottom)problems.push('solapa cabecera')}return {problems,phase:s.dataset.scene,caption:s.querySelector('.shot-caption')?.textContent}})()`,returnByValue:true});
  if(result.value.problems.length)failures.push({file,time:times[i],...result.value});count++;
  if((file==='video-cobros.html'&&[0,2,4].includes(i))||(file==='video-bocateria.html'&&i===0)||(file==='video-conciliacion.html'&&[0,2,3,4,5].includes(i))){
   const {data}=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync('revisiones/rrss-'+file.replace('.html','')+'-'+i+'.png',Buffer.from(data,'base64'));
  }
  if(config.voice&&i===4){
   const {result:audioResult}=await call('Runtime.evaluate',{expression:`(()=>{const audio=window.__qaAudio[0],seek=document.querySelector('#seek');seek.value=10;seek.dispatchEvent(new Event('input'));return {rate:audio.playbackRate,pitch:audio.preservesPitch,currentTime:audio.currentTime,elapsed:Number(seek.value)}})()`,returnByValue:true});
   const a=audioResult.value;if(a.rate!==config.audioRate||!a.pitch||Math.abs(a.currentTime-10*config.audioRate)>.02)failures.push({file,audio:a});
  }
 }
}
console.log(JSON.stringify({checked:count,failures},null,2));
fs.writeFileSync('revisiones/resultado.json',JSON.stringify({checked:count,failures},null,2));
await call('Browser.close');
if(failures.length)process.exitCode=1;
