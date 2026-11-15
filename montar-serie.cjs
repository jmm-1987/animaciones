const fs=require('fs');
const {stories,createAll}=require('./historias.cjs');
const addContact=require('./contacto.cjs');
for(const file of createAll())console.log(file);
const episodes=Object.values(stories).filter(story=>!story.voice).sort((a,b)=>Number(a.file==='video-conciliacion.html')-Number(b.file==='video-conciliacion.html'));
const cards=episodes.map((s,i)=>`<a class="series-card" href="${s.file}"><small>EPISODIO ${String(i+1).padStart(2,'0')} · 32 S</small><h2>${s.title}</h2><span>Ver animación →</span></a>`).join('');
const html=`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Historias de negocios · JM2</title><link rel="stylesheet" href="marca.css"><style>*{box-sizing:border-box}body{margin:0;padding:35px 24px;font-family:'Segoe UI',Arial,sans-serif;color:#101725}main{max-width:1100px;margin:auto}header{display:flex;justify-content:space-between;align-items:center;gap:25px}header img{width:180px}header a{color:#1557f5;text-decoration:none}h1{font-size:clamp(38px,7vw,75px);line-height:1.05;letter-spacing:-2px;margin:50px 0 20px}.intro{font-size:19px;line-height:1.7;color:#657187;max-width:720px}.series-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:22px;margin:35px 0}.series-card{display:block;padding:28px;border:1px solid #dce4f3;border-radius:15px;background:white;color:inherit;text-decoration:none}.series-card:hover{border-color:#1557f5;box-shadow:0 10px 25px #10172510}.series-card small{font-size:11px;font-weight:850;color:#1557f5;letter-spacing:2px}.series-card h2{font-size:25px;line-height:1.25;min-height:65px}.series-card>span{font-weight:750;color:#1557f5}.narrated{padding:25px;background:#eaf0ff;border-radius:15px;display:flex;gap:20px;flex-wrap:wrap}.narrated a{color:#1557f5}a:focus-visible{outline:3px solid #1557f5;outline-offset:5px}</style></head><body><main><header><img src="logo.png" alt="JM2 Tech Studio"><a href="index.html">← Biblioteca completa</a></header><h1>Negocios distintos.<br>Soluciones a medida.</h1><p class="intro">${episodes.length} historias con un ritmo pausado. Cada una recorre su propio local, muestra una tarea concreta y explica cómo simplificarla.</p><div class="series-grid">${cards}</div><aside class="narrated"><b>También con narración:</b><a href="index-comic.html">Otra mañana de facturas →</a><a href="presentacion.html">Menos tareas, más tiempo →</a></aside><section class="library-brand" aria-label="JM2 Tech Studio"><img src="logo.png" alt="JM2 Tech Studio"><address class="brand-address">Pol Ind El Prado<br>C/Pamplona, 37<br>Mérida - Badajoz</address></section></main></body></html>`;
fs.writeFileSync('index-serie.html',addContact(html));

require('./catalogo-sistemas.cjs').createCatalog(stories);

require('./piloto-bocateria.cjs');

require('./promo-facturas.cjs');

require('./serie-gestion.cjs').createSeries();

require('./recursos-practicos.cjs').createResources();
