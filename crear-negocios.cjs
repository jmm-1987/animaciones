const fs=require('fs');
const {createVideo}=require('./plantilla-video.cjs');
const {shots}=require('./escenas-negocios.cjs');
const episodes=require('./negocios.cjs');
const catalog=JSON.parse(fs.readFileSync('audio/generados/catalogo.json','utf8'));
for(const e of episodes){
 const file=`video-${e.id}.html`,audio=catalog[file];
 const story={file,title:e.title,stylesheet:'serie-negocios.css',copy:[e.title,e.setupTitle.replace('<br>',' '),e.demoTitle.replace(/<[^>]+>/g,' '),e.resultTitle.replace(/<[^>]+>/g,' ')],shots:shots(e),narration:e.narration,publications:{instagram:e.instagram.replaceAll('\\n','\n'),tiktok:e.tiktok.replaceAll('\\n','\n')},timing:audio?{duration:audio.duration,marks:audio.marks,audioRate:1}:{duration:24,marks:[0,3,7,15,21,24]}};
 const ending=`<section class="story-scene ending mp-ending" data-scene="4" aria-label="${e.closing.replace(/<[^>]+>/g,' ')}"><div class="mp-end-mark"><img src="brand_logo.png" alt=""></div><h2>${e.closing}</h2><img class="ending-logo" src="logo.png" alt="JM2 Tech Studio"><p>Sistemas y herramientas a medida.</p><span>Para facilitar tu día a día.</span></section>`;
 createVideo(story,ending);
}
require('./construir-biblioteca.cjs');
console.log('Cuatro vídeos de negocios creados, con guiones y textos de publicación.');
