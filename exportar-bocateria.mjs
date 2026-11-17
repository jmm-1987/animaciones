import fs from 'node:fs';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
const pages=await(await fetch('http://127.0.0.1:9243/json/list')).json();
const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map();ws.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}});
const call=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
await call('Page.enable');await call('Emulation.setDeviceMetricsOverride',{width:1080,height:1920,deviceScaleFactor:1,mobile:false});
fs.mkdirSync('revisiones/bocateria',{recursive:true});
await call('Page.navigate',{url:'http://127.0.0.1:8767/video-bocateria.html?t=0'});await new Promise(r=>setTimeout(r,2200));
await evaluate(`(async()=>{await document.fonts.ready;document.querySelector('.story-player').style.cssText='width:1080px;height:1920px;position:fixed;inset:0;margin:0;z-index:999';document.querySelector('.story-controls').style.display='none';document.querySelector('.scene-nav').style.display='none';document.querySelector('.story-stage').style.transform='none';document.querySelector('.story-stage').classList.remove('preview');})()`);
const timing=await evaluate('window.STORY_CONFIG');
const reviewTimes=timing.marks.slice(0,-1).map((start,i)=>start+(timing.marks[i+1]-start)*.8);
for(const [i,t] of reviewTimes.entries()){
 await evaluate(`window.jm2StoryPlayer.seekTo(${t});document.getAnimations().forEach(a=>{a.pause();a.currentTime=${t*1000};});`);
 await new Promise(r=>setTimeout(r,70));
 const bounds=await evaluate(`(()=>{const active=document.querySelector('.story-scene.active'),stage=document.querySelector('.story-stage').getBoundingClientRect();return [...active.querySelectorAll('h1,.bc-bottom,.bc-price,.bc-ending>p')].map(n=>({text:n.textContent,box:n.getBoundingClientRect().bottom,limit:stage.bottom-100})).filter(n=>n.box>n.limit)})()`);
 if(bounds.length)throw Error('Texto fuera de cuadro: '+JSON.stringify(bounds));
 const {data}=await call('Page.captureScreenshot',{format:'png',clip:{x:0,y:0,width:1080,height:1920,scale:1}});fs.writeFileSync(`revisiones/bocateria/v2-${i}.png`,Buffer.from(data,'base64'));
}
console.log(reviewTimes.length+' escenas revisadas y capturadas.');
if(process.argv.includes('--review-only')){ws.close();process.exit(0);}
const fps=12,duration=timing.duration;
const encoder=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-i','pipe:0','-vf','fps=24,format=yuv420p','-c:v','libx264','-preset','fast','-crf','20','-t',String(duration),'-movflags','+faststart','video-bocateria.mp4'],{stdio:['pipe','inherit','inherit']});
let encoderError;encoder.on('error',e=>encoderError=e);encoder.stdin.on('error',e=>encoderError=e);const finished=once(encoder,'exit');
for(let frame=0;frame<fps*duration;frame++){
 if(encoderError)throw encoderError;const time=frame/fps;
 await evaluate(`window.jm2StoryPlayer.seekTo(${time});document.getAnimations().forEach(a=>{a.pause();a.currentTime=${time*1000};});`);
 const {data}=await call('Page.captureScreenshot',{format:'png',clip:{x:0,y:0,width:1080,height:1920,scale:1}});
 if(!encoder.stdin.write(Buffer.from(data,'base64')))await once(encoder.stdin,'drain');
 if(frame%(fps*7)===0)console.log('Exportados '+time+' / '+duration+' s');
}
encoder.stdin.end();const [code]=await finished;if(code!==0)throw Error('FFmpeg: '+code);console.log('MP4 animado: 1080 × 1920, '+duration+' s, 24 fps.');ws.close();
