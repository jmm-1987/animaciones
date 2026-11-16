(()=>{
const stage=document.querySelector('body[data-serie="marca-piloto"] #stage');if(!stage)return;
let previous='';
function update(){
 const time=window.jm2StoryPlayer.getState().elapsed;
 const step=time<19.242?'recepcion':time<22.275?'lectura':'registro';
 if(step!==previous){stage.dataset.invoiceStep=step;previous=step;}
 requestAnimationFrame(update);
}
update();
})();
