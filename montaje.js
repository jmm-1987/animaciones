(()=>{
const config=window.STORY_CONFIG;if(!config)return;
const generated=window.JM2_AUDIO_CATALOG?.[config.file];
if(generated&&generated.marks.length===config.marks.length){
 Object.assign(config,generated);
 document.querySelectorAll('[data-go]').forEach((button,i)=>{button.dataset.go=config.marks[i]});
 document.querySelectorAll('[data-script-seek]').forEach((button,i)=>{button.dataset.scriptSeek=config.marks[i]});
}
const $=s=>document.querySelector(s),player=$('.story-player'),stage=$('#stage'),play=$('#play'),seek=$('#seek'),voiceButton=$('#voice'),scenes=[...document.querySelectorAll('[data-scene]')],nav=[...document.querySelectorAll('[data-go]')];
const {marks}=config,lastPhase=marks.length-2,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let duration=config.duration,audioRate=config.audioRate||1,audio=null,elapsed=0,playing=true,last=null,frame=0,voice=false;
function defaultAudio(){if(!config.builtinAudio)return null;const element=new Audio(config.builtinAudio);element.preload='auto';return element;}
audio=defaultAudio();if(audio){audio.playbackRate=audioRate;audio.preservesPitch=true;}
const preview=new URLSearchParams(location.search).get('t');if(preview!==null){elapsed=Math.max(0,Math.min(duration,Number(preview)||0));playing=false;stage.classList.add('preview');}
function fit(){stage.style.transform='scale('+player.clientWidth/1080+')'}new ResizeObserver(fit).observe(player);fit();
function render(){
 let phase=0;while(phase<lastPhase&&elapsed>=marks[phase+1])phase++;
 const end=phase===lastPhase?duration:marks[phase+1],p=Math.max(0,Math.min(1,(elapsed-marks[phase])/(end-marks[phase])));
 stage.dataset.phase=phase;stage.style.setProperty('--p',reduced?1:Math.min(1,p*1.6));stage.classList.toggle('contact-visible',phase===lastPhase&&elapsed-marks[lastPhase]>=1.25);
 scenes.forEach((scene,i)=>{const active=i===phase;scene.classList.toggle('active',active);scene.inert=!active;scene.setAttribute('aria-hidden',String(!active));if(active){scene.querySelectorAll('[data-at]').forEach(node=>{const on=reduced||p>=Number(node.dataset.at);node.style.opacity=on?'1':'0';node.style.transform=on?'translateY(0)':'translateY(12px)'});const steps=[...scene.querySelectorAll('[data-step]')];steps.forEach((node,j)=>node.hidden=j!==Math.min(steps.length-1,Math.floor(p*steps.length)))}});
 window.jm2Navigation?.render(elapsed);
 // Si el plano ya lleva su logotipo, retirar el de la cabecera.
 const header=$('.story-header');if(header)header.hidden=Boolean(scenes[phase]?.querySelector('img[src$="logo.png"]'));
 nav.forEach((n,i)=>n.setAttribute('aria-current',String(i===phase)));seek.max=duration;seek.value=elapsed;$('#time').textContent='0:'+String(Math.floor(elapsed)).padStart(2,'0')+' / 0:'+Math.ceil(duration);
}
function controls(){play.textContent=playing?'Ⅱ':'▶';play.setAttribute('aria-label',playing?'Pausar':'Reproducir');if(voiceButton){voiceButton.disabled=!audio;voiceButton.textContent=audio?(voice?'Silenciar voz':'Activar voz'):'Sin audio';voiceButton.setAttribute('aria-pressed',String(voice));}}
function pause(){playing=false;cancelAnimationFrame(frame);audio?.pause();controls();}
function sync(){
 if(!audio)return;audio.pause();const target=Math.min(elapsed,duration)*audioRate;
 try{audio.currentTime=Number.isFinite(audio.duration)?Math.min(target,audio.duration):target}catch{}
 if(voice&&playing&&(!Number.isFinite(audio.duration)||target<audio.duration-.02))audio.play().catch(()=>{voice=false;controls();$('#status').textContent='Pulsa Activar voz para reproducir el audio.'});
}
function tick(now){if(!playing)return;if(last!==null)elapsed=Math.min(duration,elapsed+Math.min((now-last)/1000,.1));last=now;if(audio&&voice&&!audio.paused&&!audio.seeking&&!audio.ended)elapsed=Math.min(duration,audio.currentTime/audioRate);render();if(elapsed>=duration)pause();else frame=requestAnimationFrame(tick)}
function start(){cancelAnimationFrame(frame);if(elapsed>=duration)elapsed=0;playing=true;last=null;controls();render();sync();frame=requestAnimationFrame(tick)}
function disposeAudio(){if(!audio)return;audio.pause();audio.removeAttribute('src');audio.load();}
function useAudio(element){
 pause();disposeAudio();audio=element;audioRate=1;audio.playbackRate=1;audio.preservesPitch=true;voice=true;elapsed=0;last=null;
 // Si la voz dura más, mantener el cierre hasta que termine: nunca cortarla.
 duration=Math.max(config.duration,Number.isFinite(audio.duration)?audio.duration:0);controls();render();
 audio.addEventListener('error',()=>{pause();voice=false;controls();$('#status').textContent='No se pudo reproducir este audio. Selecciona otro archivo.'});
}
function resetAudio(){pause();disposeAudio();audio=defaultAudio();audioRate=config.audioRate||1;if(audio){audio.playbackRate=audioRate;audio.preservesPitch=true;}duration=config.duration;voice=false;elapsed=0;last=null;controls();render();}
window.jm2StoryPlayer={useAudio,resetAudio,pause,seekTo(seconds){pause();elapsed=Math.max(0,Math.min(duration,Number(seconds)||0));last=null;render();sync();},playFromStart(){elapsed=0;start()},getState(){return {elapsed,duration,playing,voice,audioRate,audioDuration:audio?.duration||0}}};
play.onclick=()=>playing?pause():start();$('#restart').onclick=()=>{elapsed=0;start()};seek.oninput=()=>{elapsed=Number(seek.value);last=null;render();sync()};nav.forEach(button=>button.onclick=()=>{elapsed=Number(button.dataset.go);last=null;render();sync()});
if(voiceButton)voiceButton.onclick=()=>{if(!audio)return;voice=!voice;controls();sync()};
document.addEventListener('keydown',e=>{if(e.code==='Space'&&!['BUTTON','INPUT','A','TEXTAREA','SUMMARY'].includes(document.activeElement.tagName)){e.preventDefault();play.click()}});window.addEventListener('pagehide',()=>audio?.pause());controls();render();if(playing)frame=requestAnimationFrame(tick);
})();
