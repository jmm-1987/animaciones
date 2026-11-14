(()=>{
const dataNode=document.querySelector('#narration-data');if(!dataNode)return;
const data=JSON.parse(dataNode.textContent),feedback=document.querySelector('#script-feedback');
async function copy(text){
 try{await navigator.clipboard.writeText(text);return true}catch{
  const area=document.createElement('textarea');area.value=text;area.setAttribute('aria-label','Texto para copiar');area.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(area);area.select();let copied=false;try{copied=document.execCommand('copy')}catch{}area.remove();return copied;
 }
}
document.querySelectorAll('[data-copy-script]').forEach(button=>button.addEventListener('click',async()=>{
 const key=button.dataset.copyScript,ok=await copy(data[key]);
 if(ok){feedback.textContent=key==='plain'?'Locución copiada, sin tiempos ni instrucciones.':'Guion con tiempos e indicaciones copiado.';document.querySelector('#copy-fallback')?.remove();}
 else{
  let area=document.querySelector('#copy-fallback');if(!area){area=document.createElement('textarea');area.id='copy-fallback';area.className='script-fallback';area.readOnly=true;area.setAttribute('aria-label','Texto seleccionado para copiar');feedback.after(area);}
  area.value=data[key];area.focus({preventScroll:true});area.select();feedback.textContent='Texto seleccionado. Pulsa Ctrl+C para copiarlo, o descarga el archivo TXT.';
 }
}));
document.querySelectorAll('[data-script-seek]').forEach(button=>button.addEventListener('click',()=>{
 const play=document.querySelector('#play'),seek=document.querySelector('#seek');if(play.getAttribute('aria-label')==='Pausar')play.click();seek.value=button.dataset.scriptSeek;seek.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('.story-player').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
}));
})();
