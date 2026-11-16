(()=>{
const root=document.querySelector('.publication-tools');if(!root)return;
const feedback=root.querySelector('.publication-feedback');
root.querySelectorAll('[data-copy-publication]').forEach(button=>button.addEventListener('click',async()=>{
 const area=document.getElementById(button.dataset.copyPublication);let copied=false;
 try{await navigator.clipboard.writeText(area.value);copied=true;}catch{
  area.focus();area.select();try{copied=document.execCommand('copy');}catch{}
 }
 feedback.textContent=copied?'Texto copiado, con los hashtags incluidos.':'Selecciona el texto y cópialo con Ctrl + C o manteniendo pulsado en el móvil.';
}));
})();
