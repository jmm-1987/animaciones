const fs=require('fs');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const catalog=JSON.parse(fs.readFileSync('audio/generados/catalogo.json','utf8'));
const campaigns=require('./crear-software-medida.cjs');
const episodes=[{file:'piloto-marca.html',title:'Las facturas, en su sitio.',hook:'Tu negocio no es<br><em>copiar datos.</em>',desc:'Por email, archivo o foto: las facturas llegan a una herramienta que prepara los datos para tu revisión.',tags:['Email','Archivo','Foto'],category:'FACTURAS'},...require('./negocios.cjs').map(e=>({file:`video-${e.id}.html`,title:e.title,hook:e.hook,desc:e.problem,tags:e.tags??e.inputs.map(v=>v[0]),demo:e.demo,category:e.sector}))];
episodes.push({file:'video-bocateria.html',title:'Tu bocatería. Pedidos por WhatsApp.',hook:'Tu carta.<br><em>Pedidos por WhatsApp.</em>',desc:'Demostración de la carta, el pedido y el mensaje. 50 € de desarrollo inicial y 10 €/mes.',tags:['Carta online','WhatsApp','50 € + 10 €/mes'],category:'BOCATERÍAS'});
episodes.push({file:'video-facturacion-oficios.html',title:'Tu oficio. Tu facturación a medida.',hook:'El trabajo, hecho.<br><em>¿La factura?</em>',desc:'Fontaneros, electricistas, instaladores y pintores: clientes, trabajos, materiales y facturas adaptados a tu actividad.',tags:['Clientes','Facturas','Presupuestos'],category:'FACTURACIÓN A MEDIDA'});
episodes.push(...campaigns.map(({id,title,hook,description,tags})=>({file:`video-${id}.html`,title,hook,desc:description,tags,category:'SOFTWARE A MEDIDA'})));
const cards=episodes.map((e,i)=>`<article class="video-card"><a class="cover" href="${e.file}" aria-label="Ver ${escape(e.title)}"><strong>${e.hook}</strong><div class="sources">${e.tags.map(t=>`<span>${escape(t)}</span>`).join('')}</div><div class="result"><b>${catalog[e.file]?'Con locución':'Guion preparado'}</b>${catalog[e.file]?'Audio incorporado al vídeo':'Animación lista para añadir la voz'}</div></a><div class="copy"><span class="meta">${String(i+1).padStart(2,'0')} · ${e.category}</span><h2>${escape(e.title)}</h2><p>${escape(e.desc)}</p><div class="actions"><a class="primary" href="${e.file}">Ver vídeo →</a>${e.demo?`<a class="secondary" href="${escape(e.demo)}">Probar web de la boda ↗</a>`:""}${e.demo&&fs.existsSync(e.file.replace(".html",".mp4"))?`<a class="secondary" href="${e.file.replace(".html",".mp4")}" download>Descargar MP4</a>`:""}<a class="secondary" href="guiones/${e.file.replace('.html','')}-locucion.txt" download>Descargar guion</a></div></div></article>`).join('');
const stories = [
  [
    "01-precios",
    "Precios"
  ],
  [
    "02-que-podemos-automatizar",
    "Qu? podemos automatizar"
  ],
  [
    "03-integraciones",
    "Integraciones"
  ],
  [
    "04-software-a-tu-medida",
    "Software a tu medida"
  ]
];
const storyCards = stories.map(([id, title]) => {
  const png = `historias-jm2/${id}.png`;
  return `<li><a href="${png}" aria-label="Ver ${escape(title)}"><img src="${png}" alt="" width="1080" height="1920" loading="lazy"></a><h3>${escape(title)}</h3><a class="secondary" href="${png}" download aria-label="Descargar ${escape(title)} en PNG">Descargar PNG</a></li>`;
}).join('');
const claudeCollection = `<section id="claude" aria-labelledby="claude-title">
  <h2 id="claude-title">Claude</h2>
  <article class="video-card">
    <a class="cover" href="jm2_tiktok_video1_standalone.html" aria-label="Ver el vídeo No lo pagues de golpe">
      <strong>No lo pagues<br><em>de golpe</em></strong>
      <div class="sources"><span>Software a medida</span><span>Cuota mensual</span></div>
    </a>
    <div class="copy">
      <h3>No lo pagues de golpe</h3>
      <p>Vídeo vertical de 24 segundos sobre el software a medida con cuota mensual, mantenimiento y mejoras.</p>
      <div class="actions"><a class="primary" href="jm2_tiktok_video1_standalone.html">Ver vídeo →</a></div>
    </div>
  </article>
</section>`;
fs.writeFileSync('index.html',`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>JM2 · Vídeos</title><link rel="stylesheet" href="biblioteca.css"><link rel="stylesheet" href="planning.css"></head><body><main><header><img src="logo.png" alt="JM2 Tech Studio"><span>Biblioteca de vídeos · ${episodes.length + 1} piezas</span></header><nav class="content-nav"><a href="index.html">Videos</a><a href="#historias-destacadas">Historias destacadas</a><a href="#claude">Claude</a><a href="planning.html">Planning y carruseles</a><a href="linkedin.html">Carruseles LinkedIn</a><a href="carta-bar/bar.html">Carta de bar ↗</a><a href="propuesta-web.html">Menús de boda ↗</a></nav><section class="intro"><span>SISTEMAS Y HERRAMIENTAS A MEDIDA</span><h1>Menos trabajo repetido.<br><em>Más negocio.</em></h1><p>Situaciones del día a día y herramientas que las hacen más sencillas.</p></section><section class="featured-stories" id="historias-destacadas" aria-labelledby="stories-title"><h2 id="stories-title">Historias destacadas</h2><ul>${storyCards}</ul></section>${claudeCollection}${cards}<footer>JM2 Tech Studio · Mérida</footer></main></body></html>`);
