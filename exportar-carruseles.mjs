// Con Chrome de revisión en localhost:9241. Exporta arte final, no la página de previsualización.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
let pages;
for(let n=0;n<40;n++){try{pages=await(await fetch('http://127.0.0.1:9241/json/list')).json();break}catch(e){if(n===39)throw e;await new Promise(r=>setTimeout(r,150));}}
const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let seq=0;const pending=new Map();ws.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}});
const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
await call('Page.enable');await call('Emulation.setDeviceMetricsOverride',{width:1080,height:1350,deviceScaleFactor:1,mobile:false});
let total=0;
for(const folder of fs.readdirSync('carruseles')){
 for(let i=1;i<=6;i++){
  const base=path.resolve('carruseles',folder,String(i).padStart(2,'0'));
  await call('Page.navigate',{url:pathToFileURL(base+'.html').href});
  await new Promise(r=>setTimeout(r,180));
  const result=await call('Runtime.evaluate',{expression:`(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));const h=document.querySelector('h1').getBoundingClientRect(),g=document.querySelector('.cs-graphic').getBoundingClientRect(),d=document.querySelector('.cs-description').getBoundingClientRect();return {width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>1080||document.documentElement.scrollHeight>1350,overlap:h.bottom>g.top||d.top<g.bottom};})()`,awaitPromise:true,returnByValue:true});
  if(result.exceptionDetails||result.result.value?.overflow||result.result.value?.overlap)throw Error(folder+'/'+i+': '+JSON.stringify(result));
  const {data}=await call('Page.captureScreenshot',{format:'png',clip:{x:0,y:0,width:1080,height:1350,scale:1}});
  fs.writeFileSync(base+'.png',Buffer.from(data,'base64'));total++;
 }
 console.log(folder+': 6 PNG exportados.');
}
await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
for(const file of ['index.html','planning.html','carrusel-facturas.html']){
 await call('Page.navigate',{url:pathToFileURL(path.resolve(file)).href});await new Promise(r=>setTimeout(r,350));
 const r=await call('Runtime.evaluate',{expression:'document.documentElement.scrollWidth<=innerWidth',returnByValue:true});if(!r.result.value)throw Error('Desbordamiento en '+file);
 const {data}=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync('revisiones/'+file.replace('.html','')+'-social.png',Buffer.from(data,'base64'));
}
console.log('OK: '+total+' imagenes a 1080 x 1350 y paginas revisadas en movil.');await call('Browser.close');
