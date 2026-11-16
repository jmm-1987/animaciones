const fs=require('fs');
const {buildNarration}=require('./locuciones.cjs');
const {buildPublications}=require('./publicaciones.cjs');
function createVideo(story,ending){
 const {duration,marks,audioRate=1}=story.timing;
 const narration=buildNarration('facturas',story,marks,duration);
 const publications=buildPublications(story);
 const scenes=story.shots.map((shot,i)=>`<section class="story-scene${i===0?' active':''}" data-scene="${i}" aria-label="${story.copy[i]}"><div class="shot"><div class="shot-visual">${shot}</div></div></section>`).join('');
 const config={duration,marks,audioRate,file:story.file,audioKey:story.audioKey||story.file};
 const tools=narration.html.replace('LOCUCIÓN · LISTA PARA PREPARAR EN CREATIFY','LOCUCIÓN').replace('Añade la voz desde tu móvil','Cambiar el audio').replace('TU AUDIO · PARA ESTA HISTORIA','AUDIO DE ESTE VÍDEO');
 const html=`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${story.title} · JM2</title><link rel="stylesheet" href="plantilla-video.css"><link rel="stylesheet" href="guiones.css"><link rel="stylesheet" href="piloto-marca.css">${story.stylesheet?`<link rel="stylesheet" href="${story.stylesheet}">`:""}</head><body data-montaje="integrado" data-serie="marca-piloto"><div class="video-top"><a href="index.html">← Vídeos</a><span>JM2 · Herramientas a medida</span></div><div class="story-page"><main class="story-player" aria-label="${story.title}"><div class="story-stage" id="stage"><header class="story-header"><img src="logo.png" alt="JM2 Tech Studio"><span>${story.title}</span></header>${scenes}${ending}<nav class="scene-nav" aria-label="Escenas">${marks.slice(0,-1).map((m,i)=>`<button type="button" data-go="${m}" aria-label="Escena ${i+1}">${i+1}</button>`).join('')}</nav></div><div class="story-controls"><button id="play" aria-label="Pausar">Ⅱ</button><button id="restart" aria-label="Reiniciar">↺</button><button id="voice" aria-pressed="false">Activar voz</button><input id="seek" type="range" min="0" max="${duration}" value="0" step=".01" aria-label="Posición del vídeo"><time id="time"></time></div><span id="status" class="sr-only" role="status"></span></main><details class="video-tools"><summary>Guion y audio</summary>${tools}</details>${publications}</div><script>window.STORY_CONFIG=${JSON.stringify(config)};</script><script src="audio/catalogo.js"></script><script src="montaje.js"></script><script src="guiones.js"></script><script src="publicaciones.js"></script><script src="audio-historia.js"></script><script src="piloto-marca.js"></script></body></html>`;
 fs.writeFileSync(story.file,html);
}
module.exports={createVideo};
