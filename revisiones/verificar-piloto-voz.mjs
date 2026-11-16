import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
let pages;for(let n=0;n<40;n++){try{pages=await(await fetch('http://127.0.0.1:9241/json/list')).json();break}catch(e){if(n===39)throw e;await new Promise(r=>setTimeout(r,150));}}
const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let seq=0;const pending=new Map();ws.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}});
const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
await call('Page.enable');await call('Emulation.setDeviceMetricsOverride',{width:430,height:930,deviceScaleFactor:1,mobile:true});
const results=[];
for(const t of [1,7,16,23,29]){
 await call('Page.navigate',{url:pathToFileURL(path.resolve('piloto-marca.html')).href+'?t='+t});
 await new Promise(r=>setTimeout(r,1300));
 const result=await call('Runtime.evaluate',{expression:`JSON.stringify({phase:document.querySelector('#stage').dataset.phase,overflow:document.documentElement.scrollWidth>innerWidth,logo:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),text:document.querySelector('.story-scene.active').innerText})`,returnByValue:true});
 results.push(JSON.parse(result.result.value));
 const {data}=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync('revisiones/piloto-marca-'+t+'.png',Buffer.from(data,'base64'));
}
const evaluate=async(expression)=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const state=await evaluate('window.jm2StoryPlayer.getState()');
if(state.audioDuration<35||state.audioDuration>36||state.duration!==37.2||state.audioRate!==1)throw Error(JSON.stringify(state));
for(const [time,expected] of [[5.8,1],[11.4,2],[25.2,3],[31.2,4]]){const phase=await evaluate('document.querySelector("#seek").value='+time+';document.querySelector("#seek").dispatchEvent(new Event("input"));Number(document.querySelector("#stage").dataset.phase)');if(phase!==expected)throw Error('Cambio de escena incorrecto');}
await evaluate('document.querySelector("#seek").value=34.3;document.querySelector("#seek").dispatchEvent(new Event("input"));document.querySelector("#voice").click();document.querySelector("#play").click()');
await new Promise(r=>setTimeout(r,1600));
const ending=await evaluate('window.jm2StoryPlayer.getState()');
if(!ending.voice||ending.elapsed<35.1)throw Error('Reproduccion: '+JSON.stringify(ending));
console.log('OK: MP3 cargado, 35.16 segundos, cuatro cambios de escena, reproduccion a velocidad natural y cierre posterior al audio.');await call('Browser.close');
