const fs=require('fs');
const {createVideo}=require('./plantilla-video.cjs');
const {shots}=require('./escenas-negocios.cjs');
const episodes=require('./negocios.cjs');
const catalog=JSON.parse(fs.readFileSync('audio/generados/catalogo.json','utf8'));
for(const e of episodes){
 const file=`video-${e.id}.html`,audio=catalog[file];
 const story={file,title:e.title,stylesheet:'serie-negocios.css',copy:[e.title,e.setupTitle.replace('<br>',' '),e.demoTitle.replace(/<[^>]+>/g,' '),e.resultTitle.replace(/<[^>]+>/g,' ')],shots:shots(e),narration:e.narration,publications:{instagram:e.instagram.replaceAll('\\n','\n'),tiktok:e.tiktok.replaceAll('\\n','\n')},timing:audio?{duration:audio.duration,marks:audio.marks,audioRate:1}:(e.timing||{duration:24,marks:[0,3,7,15,21,24]})};
 const endingSteps=e.closingSteps?`<span class="mp-ending-kicker">CÓMO EMPEZAMOS</span><h2 class="mp-ending-title">${e.closing}</h2><ol class="mp-ending-steps">${e.closingSteps.map(step=>`<li>${step}</li>`).join('')}</ol>`:`<h2>${e.closing}</h2>`;
 const closingNote=e.closingNote??'Para facilitar tu día a día.';
 const ending=`<section class="story-scene ending mp-ending${e.closingSteps?' mp-ending--steps':''}" data-scene="4" aria-label="${[e.closing,...(e.closingSteps||[])].join(' ')}"><div class="mp-end-mark"><img src="brand_logo.png" alt=""></div>${endingSteps}<img class="ending-logo" src="logo.png" alt="JM2 Tech Studio"><p>Sistemas y herramientas a medida.</p>${closingNote?`<span>${closingNote}</span>`:""}</section>`;
 createVideo(story,ending);
}
require('./construir-biblioteca.cjs');
console.log(`${episodes.length} vídeos de negocios creados, con guiones y textos de publicación.`);
