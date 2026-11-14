(()=>{
const input=document.querySelector('#story-audio');if(!input)return;
const player=window.jm2StoryPlayer,key=window.STORY_CONFIG.file,status=document.querySelector('#audio-upload-status'),info=document.querySelector('#audio-file-info'),start=document.querySelector('#play-uploaded-audio'),remove=document.querySelector('#remove-uploaded-audio'),download=document.querySelector('#download-uploaded-audio');
let version=0,objectURL=null,installed=false;
function openStore(){return new Promise((resolve,reject)=>{if(!window.indexedDB){reject(new Error('Sin almacenamiento'));return}const request=indexedDB.open('jm2-audios-historias',1);request.onupgradeneeded=()=>{request.result.createObjectStore('audios')};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);request.onblocked=()=>reject(new Error('Almacenamiento ocupado'));});}
async function storage(mode,value){const db=await openStore();try{return await new Promise((resolve,reject)=>{const tx=db.transaction('audios',mode==='get'?'readonly':'readwrite'),store=tx.objectStore('audios');let result;const request=mode==='get'?store.get(key):mode==='delete'?store.delete(key):store.put(value,key);request.onsuccess=()=>{result=request.result};tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Operación cancelada'));});}finally{db.close();}}
function decode(url){return new Promise((resolve,reject)=>{const element=new Audio();element.preload='metadata';let timer=setTimeout(()=>finish(false),15000);function finish(ok){clearTimeout(timer);element.removeEventListener('loadedmetadata',ready);element.removeEventListener('error',failed);if(ok)resolve(element);else{element.removeAttribute('src');element.load();reject(new Error('Audio no compatible'));}}function ready(){finish(Number.isFinite(element.duration)&&element.duration>0)}function failed(){finish(false)}element.addEventListener('loadedmetadata',ready);element.addEventListener('error',failed);element.src=url;element.load();});}
const seconds=n=>Math.round(n*10)/10;
async function install(record,token){
 const url=URL.createObjectURL(record.blob);let element;
 try{element=await decode(url)}catch(error){URL.revokeObjectURL(url);throw error}
 if(token!==version){element.removeAttribute('src');element.load();URL.revokeObjectURL(url);return false;}
 player.useAudio(element);if(objectURL)URL.revokeObjectURL(objectURL);objectURL=url;installed=true;start.disabled=false;remove.disabled=false;download.hidden=false;download.href=url;download.download=record.name;
 const base=window.STORY_CONFIG.duration;
 info.textContent=record.name+' · '+seconds(element.duration)+' s. '+(element.duration>base+.1?'El cierre se mantiene hasta que termine el audio.':'La historia conserva sus '+seconds(base)+' s.');
 return true;
}
input.addEventListener('change',async()=>{
 const file=input.files?.[0];if(!file)return;const token=++version;
 if(file.type&&!file.type.startsWith('audio/')&&!/\.(mp3|wav|m4a|aac|ogg|opus|webm|mp4|flac)$/i.test(file.name)){status.textContent='Selecciona un archivo de audio, por ejemplo MP3, M4A o WAV.';input.value='';return;}
 player.pause();status.textContent='Preparando el audio…';input.disabled=true;start.disabled=true;remove.disabled=true;
 const record={blob:file,name:file.name,savedAt:Date.now()};
 try{if(!await install(record,token))return;let saved=false;try{await storage('put',record);saved=true}catch{}if(token===version)status.textContent=saved?'Audio listo y guardado en este navegador para esta historia. Pulsa «Reproducir con la historia».':'Audio listo para esta sesión. El navegador no ha permitido guardarlo. Pulsa «Reproducir con la historia».';}
 catch{if(token===version){status.textContent='No se ha podido leer este archivo. Prueba con otro audio MP3, M4A o WAV.';start.disabled=!installed;remove.disabled=!installed;}}
 finally{if(token===version){input.disabled=false;input.value='';}}
});
start.addEventListener('click',()=>{player.playFromStart();document.querySelector('.story-player').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});
remove.addEventListener('click',async()=>{++version;player.resetAudio();installed=false;start.disabled=true;remove.disabled=true;download.hidden=true;download.removeAttribute('href');if(objectURL){URL.revokeObjectURL(objectURL);objectURL=null}info.textContent='Ningún audio personalizado cargado.';try{await storage('delete');status.textContent='Audio eliminado de esta historia y de este navegador.'}catch{status.textContent='Audio quitado de la reproducción. No se pudo borrar la copia guardada; vuelve a intentarlo.';remove.disabled=false;}});
(async()=>{const token=version;try{const record=await storage('get');if(!record||token!==version)return;status.textContent='Recuperando el audio guardado…';if(await install(record,token))status.textContent='Tu audio guardado está listo. Pulsa «Reproducir con la historia».';}catch{if(token===version)status.textContent='Puedes añadir un audio. Si el navegador no permite guardarlo, funcionará durante esta sesión.';}})();
})();
