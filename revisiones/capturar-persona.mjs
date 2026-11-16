import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
let pages;for(let n=0;n<40;n++){try{pages=await(await fetch('http://127.0.0.1:9241/json/list')).json();break}catch(e){if(n===39)throw e;await new Promise(r=>setTimeout(r,150));}}
const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let seq=0;const pending=new Map();ws.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}});
const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
await call('Page.enable');await call('Emulation.setDeviceMetricsOverride',{width:430,height:930,deviceScaleFactor:1,mobile:true});
const results=[];
for(const t of [7]){
 await call('Page.navigate',{url:pathToFileURL(path.resolve('piloto-marca.html')).href+'?t='+t});
 await new Promise(r=>setTimeout(r,1300));
 const result=await call('Runtime.evaluate',{expression:`JSON.stringify({phase:document.querySelector('#stage').dataset.phase,overflow:document.documentElement.scrollWidth>innerWidth,logo:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),text:document.querySelector('.story-scene.active').innerText})`,returnByValue:true});
 results.push(JSON.parse(result.result.value));
 const {data}=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync('revisiones/piloto-marca-'+t+'.png',Buffer.from(data,'base64'));
}
console.log('Escena de la persona capturada.');await call('Browser.close');