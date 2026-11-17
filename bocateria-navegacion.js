(()=>{
const frames=[...document.querySelectorAll('iframe[data-menu-segment]')];let elapsed=0;
function render(time){elapsed=time;for(const frame of frames){const i=Number(frame.dataset.menuSegment),start=[11,17,23][i],end=[17,23,31][i];if(time>=start&&time<=end){try{frame.contentWindow.renderMenuDemo?.(i,time-start);}catch{}}}}
frames.forEach(frame=>frame.addEventListener('load',()=>render(elapsed)));
window.jm2Navigation={render};render(window.jm2StoryPlayer?.getState().elapsed||0);
})();
