(()=>{
const frames=[...document.querySelectorAll('iframe[data-menu-segment]')];let elapsed=0;
function render(time){elapsed=time;const marks=window.STORY_CONFIG.marks;for(const frame of frames){const i=Number(frame.dataset.menuSegment),start=marks[i+2],end=marks[i+3];if(time>=start&&time<=end){try{frame.contentWindow.renderMenuDemo?.(i,(time-start)/(end-start)*[6,6,8][i]);}catch{}}}}
frames.forEach(frame=>frame.addEventListener('load',()=>render(elapsed)));
window.jm2Navigation={render};render(window.jm2StoryPlayer?.getState().elapsed||0);
})();
