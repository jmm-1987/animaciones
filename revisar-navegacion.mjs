import fs from 'node:fs';
const pages=await(await fetch('http://127.0.0.1:9243/json/list')).json(),ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));let id=0;const pending=new Map();ws.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}});const call=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
await call('Page.enable');await call('Emulation.setDeviceMetricsOverride',{width:1080,height:1920,deviceScaleFactor:1,mobile:false});await call('Page.navigate',{url:'http://127.0.0.1:8767/video-bocateria.html?t=0'});await new Promise(r=>setTimeout(r,1800));
await evaluate(`document.querySelector('.story-player').style.cssText='width:1080px;height:1920px;position:fixed;inset:0;z-index:999';document.querySelector('.story-controls').hidden=true;document.querySelector('.story-stage').style.transform='none';`);
const checks=[[11.2,0,0,0],[13.4,0,1,7.5],[15.4,0,2,9.5],[16.7,0,3,11.5],[19.5,1,4,13.5],[21.7,1,3,11.5],[28.7,2,3,11.5],[30.6,2,3,11.5],[11.2,0,0,0]];
for(const [time,segment,count,total] of checks){
 await evaluate(`window.jm2StoryPlayer.seekTo(${time})`);await new Promise(r=>setTimeout(r,60));
 const state=await evaluate(`(()=>{const f=document.querySelector('iframe[data-menu-segment="${segment}"]'),w=f.contentWindow,d=f.contentDocument;return {...w.eval('({category:cat,count:totals().n,total:totals().t,mode:fulfillment})'),name:d.querySelector('#name').value,scrolled:w.scrollY,panelScroll:d.querySelector('#panel').scrollTop,touchVisible:!d.querySelector('#demo-touch').hidden};})()`);
 if(state.count!==count||state.total!==total||(time===28.7&&state.mode!=='delivery')||(time===30.6&&(state.mode!=='pickup'||state.name!=='Ana')))throw Error(JSON.stringify({time,state}));
 if(time===15.4||time===28.7){const {data}=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`revisiones/bocateria/navegacion-${time}.png`,Buffer.from(data,'base64'));}
 console.log(JSON.stringify({time,...state}));
}
ws.close();console.log('OK: categorías, cantidades, total, datos y rebobinado.');
