(()=>{
if(!window.jm2StoryPlayer)return;
const hand=document.querySelector('#billing-clock-hand'),digits=document.querySelector('#billing-clock-time'),clock=document.querySelector('.billing-clock'),steps=[...document.querySelectorAll('.analysis-step')],marks=window.STORY_CONFIG.marks,nodes=[...document.querySelectorAll('[data-integration]')],wires=[...document.querySelectorAll('[data-integration-wire]')];
if(!hand||!digits)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function update(){
 const t=window.jm2StoryPlayer.getState().elapsed,length=marks[2]-marks[1],seconds=Math.max(0,Math.min(length,t-marks[1]));
 hand.setAttribute('transform','rotate('+(reduced?Math.floor(seconds)*120:seconds*120)+' 300 350)');digits.textContent='00:'+String(Math.floor(seconds)).padStart(2,'0');clock.style.setProperty('--clock-progress',seconds/length);
 const focus=Math.min(2,Math.floor((t-marks[2])/(marks[3]-marks[2])*3));steps.forEach((step,i)=>step.classList.toggle('is-current',t>=marks[2]&&t<marks[3]&&i===focus));
 const local=t-marks[3];nodes.forEach((node,i)=>{const p=Math.max(0,Math.min(1,(local-.1-i*.35)/.5)),e=1-Math.pow(1-p,3),visible=reduced&&local>=0?1:e;node.style.opacity=visible;node.style.transform='translate('+(Number(node.dataset.flightX)*(1-visible))+'px,'+(Number(node.dataset.flightY)*(1-visible))+'px) scale('+(.65+.35*visible)+')';if(wires[i]){wires[i].style.strokeDashoffset=1-visible;wires[i].style.opacity=visible*.7}});
 requestAnimationFrame(update);
}
update();
})();
