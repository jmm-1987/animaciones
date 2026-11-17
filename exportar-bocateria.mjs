import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';
const pages=await(await fetch('http://127.0.0.1:9243/json/list')).json();
const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map();ws.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}});
const call=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
await call('Page.enable');
await call('Emulation.setDeviceMetricsOverride',{width:1080,height:1920,deviceScaleFactor:1,mobile:false});
fs.mkdirSync('revisiones/bocateria',{recursive:true});
const times=[1,7,15,22,33,46],durations=[6,8,7,11,13,11];
for(let i=0;i<times.length;i++){
 await call('Page.navigate',{url:pathToFileURL(path.resolve('video-bocateria.html')).href+'?t='+times[i]});
 await new Promise(r=>setTimeout(r,1800));
 await call('Runtime.evaluate',{expression:`document.querySelector('.story-player').style.cssText='width:1080px;height:1920px;position:fixed;inset:0;margin:0;z-index:999';document.querySelector('.story-controls').style.display='none';document.querySelector('.scene-nav').style.display='none';document.querySelector('.story-stage').style.transform='none'`});
 await new Promise(r=>setTimeout(r,200));
 const {data}=await call('Page.captureScreenshot',{format:'png',clip:{x:0,y:0,width:1080,height:1920,scale:1}});
 fs.writeFileSync(`revisiones/bocateria/${i}.png`,Buffer.from(data,'base64'));
 console.log('Escena '+(i+1)+' capturada');
}
await call('Browser.close');
const list=times.map((_,i)=>`file '${i}.png'\nduration ${durations[i]}`).join('\n')+"\nfile '5.png'\n";
fs.writeFileSync('revisiones/bocateria/montaje.txt',list);
const result=spawnSync('ffmpeg',['-y','-f','concat','-safe','0','-i','revisiones/bocateria/montaje.txt','-vf','fps=25,format=yuv420p','-c:v','libx264','-preset','fast','-crf','20','-t','56','-movflags','+faststart','video-bocateria.mp4'],{stdio:'inherit'});
if(result.status!==0)process.exit(1);
