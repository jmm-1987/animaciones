const fs=require('fs');
const {timing}=require('./ritmos.cjs');
const addContact=require('./contacto.cjs');
function createCatalog(stories){
 const order=['presentacion','facturas','presupuestos','citas','datos','informes','documentos','pedidos','bocateria','tpv','cobros','conciliacion'];
 const cards=order.map((type,i)=>{const s=stories[type],file=s.file.replace('.html','-sistema.html'),duration={...timing(s.voice),...s.timing}.duration;return `<article class="systems-card"><small>VERSIÓN ${String(i+1).padStart(2,'0')} · ${Math.round(duration*10)/10} S</small><h2>${s.title}</h2><p>${s.social.pitch}</p><a href="${file}">Ver sin personajes →</a><a class="secondary" href="${s.file}">Comparar con personajes</a><a class="script" href="${file}#guion">Guion con tiempos y carga de audio</a></article>`}).join('');
 const html=`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sistemas en movimiento · JM2</title><link rel="stylesheet" href="marca.css"><link rel="stylesheet" href="sistemas.css"></head><body class="systems-index"><main><header><img src="logo.png" alt="JM2 Tech Studio"><a href="index.html">← Todas las historias</a></header><h1>Que se vea<br>cómo funciona.</h1><p class="gallery-intro">Las doce historias en una versión sin personajes: documentos que se leen, datos que viajan, pedidos que llegan y propuestas que se revisan. Puedes comparar cada una con su versión editorial.</p><div class="systems-grid">${cards}</div><section class="library-brand" aria-label="JM2 Tech Studio"><img src="logo.png" alt="JM2 Tech Studio"><address class="brand-address">Pol Ind El Prado<br>C/Pamplona, 37<br>Mérida - Badajoz</address></section></main></body></html>`;
 fs.writeFileSync('index-sistemas.html',addContact(html));
 let index=fs.readFileSync('index.html','utf8');
 index=index.replace(/<article class="card"[\s\S]*?<\/article>/g,card=>{if(card.includes('class="system-link"'))return card;const file=card.match(/href="([^"]+\.html)"/)[1];return card.replace('</div></article>','<a class="system-link" href="'+file.replace('.html','-sistema.html')+'">Ver versión sin personajes →</a></div></article>')});
 if(!index.includes('href="index-sistemas.html"'))index=index.replace('<aside class="collection">','<aside class="collection"><div><h2>Las 12 historias, también sin personajes</h2><p>Diagramas, documentos, interfaces y recorridos visuales para mostrar cómo funciona cada sistema.</p></div><a href="index-sistemas.html">Explorar las nuevas versiones →</a></aside><aside class="collection">');
 index=index.replace(/12 ANIMACIONES[^<]*/,'12 HISTORIAS · 2 VERSIONES');
 fs.writeFileSync('index.html',index);
}
module.exports={createCatalog};
