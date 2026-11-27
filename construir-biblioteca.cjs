const fs=require('fs');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const catalog=JSON.parse(fs.readFileSync('audio/generados/catalogo.json','utf8'));
const campaigns=require('./crear-software-medida.cjs');
const videoDates = {
  'citas.html': '2026-11-24',
  'jm2_tiktok_aplicacion_standalone.html': '2026-11-24',
  'jm2_tiktok_deca_standalone.html': '2026-11-24',
  'jm2_tiktok_video1_standalone.html': '2026-11-24',
  'piloto-marca.html': '2026-11-16',
  'video-bocateria.html': '2026-11-14',
  'video-citas-por-whatsapp.html': '2026-11-24',
  'video-climatizacion.html': '2026-11-16',
  'video-cobros.html': '2026-11-14',
  'video-factura-automatica.html': '2026-11-24',
  'video-facturacion-a-tu-manera.html': '2026-11-18',
  'video-facturacion-oficios.html': '2026-11-17',
  'video-facturas-a-su-manera.html': '2026-11-24',
  'video-fontanero.html': '2026-11-16',
  'video-presupuesto-dinamico.html': '2026-11-19',
  'video-software-que-crece-contigo.html': '2026-11-18',
  'video-taller-movil.html': '2026-11-16'
};
function renderVideoDate(file) {
  const date = videoDates[file];
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `<p class="video-date">Fecha de creación <time datetime="${date}">${day}/${month}/${year}</time></p>`;
}
const episodes=[{file:'piloto-marca.html',title:'Las facturas, en su sitio.',hook:'Tu negocio no es<br><em>copiar datos.</em>',desc:'Por email, archivo o foto: las facturas llegan a una herramienta que prepara los datos para tu revisión.',tags:['Email','Archivo','Foto'],category:'FACTURAS'},...require('./negocios.cjs').map(e=>({file:`video-${e.id}.html`,title:e.title,hook:e.hook,desc:e.problem,tags:e.tags??e.inputs.map(v=>v[0]),demo:e.demo,category:e.sector}))];
episodes.push({file:'video-bocateria.html',title:'Tu bocatería. Pedidos por WhatsApp.',hook:'Tu carta.<br><em>Pedidos por WhatsApp.</em>',desc:'Demostración de la carta, el pedido y el mensaje. 50 € de desarrollo inicial y 10 €/mes.',tags:['Carta online','WhatsApp','50 € + 10 €/mes'],category:'BOCATERÍAS'});
episodes.push({file:'video-facturacion-oficios.html',title:'Tu oficio. Tu facturación a medida.',hook:'El trabajo, hecho.<br><em>¿La factura?</em>',desc:'Fontaneros, electricistas, instaladores y pintores: clientes, trabajos, materiales y facturas adaptados a tu actividad.',tags:['Clientes','Facturas','Presupuestos'],category:'FACTURACIÓN A MEDIDA'});
episodes.push(...campaigns.map(({id,title,hook,description,tags})=>({file:`video-${id}.html`,title,hook,desc:description,tags,category:'SOFTWARE A MEDIDA'})));
const cards=episodes.map((e,i)=>`<article class="video-card"><a class="cover" href="${e.file}" aria-label="Ver ${escape(e.title)}"><strong>${e.hook}</strong><div class="sources">${e.tags.map(t=>`<span>${escape(t)}</span>`).join('')}</div><div class="result"><b>${catalog[e.file]?'Con locución':'Guion preparado'}</b>${catalog[e.file]?'Audio incorporado al vídeo':'Animación lista para añadir la voz'}</div></a><div class="copy"><span class="meta">${String(i+1).padStart(2,'0')} · ${e.category}</span><h2>${escape(e.title)}</h2>${renderVideoDate(e.file)}<p>${escape(e.desc)}</p><div class="actions"><a class="primary" href="${e.file}">Ver vídeo →</a>${e.demo?`<a class="secondary" href="${escape(e.demo)}">Probar web de la boda ↗</a>`:""}${e.demo&&fs.existsSync(e.file.replace(".html",".mp4"))?`<a class="secondary" href="${e.file.replace(".html",".mp4")}" download>Descargar MP4</a>`:""}<a class="secondary" href="guiones/${e.file.replace('.html','')}-locucion.txt" download>Descargar guion</a></div></div></article>`).join('');
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
const claudeVideos = [
  {
    file: 'jm2_tiktok_video1_standalone.html',
    title: 'No lo pagues de golpe',
    hook: 'No lo pagues<br><em>de golpe</em>',
    tags: ['Software a medida', 'Cuota mensual'],
    description: 'Vídeo vertical de 30 segundos sobre el software a medida con cuota mensual, mantenimiento y mejoras.'
  },
  {
    file: 'jm2_tiktok_deca_standalone.html',
    title: 'DeCA en transporte',
    hook: '¿Llevas listo<br><em>el DeCA?</em>',
    tags: ['Transporte de mercancías', 'Documento de control'],
    description: 'Qué es el DeCA, qué datos revisar antes de salir y cuándo mostrar el QR.'
  },
  {
    file: 'jm2_tiktok_aplicacion_standalone.html',
    title: '¿Necesitas una aplicación?',
    hook: '¿Necesitas<br><em>una aplicación?</em>',
    tags: ['Software a medida', 'Gestión de pedidos'],
    description: 'Un ejemplo de cómo quitar pasos cuando el mismo pedido pasa por WhatsApp, Excel y otro programa.'
  }
];

const orderVideos = [...require('./crear-del-caos-al-control.cjs').map(video =>
  video.mp4 && fs.existsSync(video.mp4) ? {...video, file: video.mp4, source: video.file} : video
), {
  file: 'citas-tiktok.mp4',
  source: 'citas.html',
  title: '¿Sigues gestionando las citas por WhatsApp?',
  hook: '¿Y si tu cliente<br><em>reservara solo?</em>',
  tags: ['Reservas online', 'WhatsApp', 'TikTok 9:16'],
  description: 'Vídeo de 27 segundos. El cliente elige una hora y la reserva queda confirmada en el calendario.'
}];
const renderCollectionCards = videos => videos.map(({file, source, title, hook, tags, description}) => `<article class="video-card">
  <a class="cover" href="${file}" aria-label="Ver el vídeo ${escape(title)}">
    <strong>${hook}</strong>
    <div class="sources">${tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div>
  </a>
  <div class="copy">
    <h3>${escape(title)}</h3>
    ${renderVideoDate(source ?? file)}
    <p>${escape(description)}</p>
    <div class="actions"><a class="primary" href="${file}" aria-label="Ver el vídeo ${escape(title)}">Ver vídeo →</a>${source ? `<a class="secondary" href="${file}" download>Descargar MP4</a><a class="secondary" href="${source}">Ver versión interactiva</a>` : ''}</div>
  </div>
</article>`).join('\n');
const claudeCollection = `<section id="claude" aria-labelledby="claude-title">
  <h2 id="claude-title">Claude</h2>
  ${renderCollectionCards(claudeVideos)}
</section>`;
const orderCollection = `<section id="del-caos-al-control" aria-labelledby="order-title">
  <h2 id="order-title">Del caos al control</h2>
  ${renderCollectionCards(orderVideos)}
</section>`;
fs.writeFileSync('index.html',`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>JM2 · Vídeos</title><link rel="stylesheet" href="biblioteca.css"><link rel="stylesheet" href="planning.css"></head><body><main><header><img src="logo.png" alt="JM2 Tech Studio"><span>Biblioteca de vídeos · ${episodes.length + claudeVideos.length + orderVideos.length} piezas</span></header><nav class="content-nav"><a href="index.html">Videos</a><a href="#historias-destacadas">Historias destacadas</a><a href="#claude">Claude</a><a href="#del-caos-al-control">Del caos al control</a><a href="planning.html">Planning y carruseles</a><a href="linkedin.html">Carruseles LinkedIn</a><a href="carta-bar/bar.html">Carta de bar ↗</a><a href="propuesta-web.html">Menús de boda ↗</a></nav><section class="intro"><span>SISTEMAS Y HERRAMIENTAS A MEDIDA</span><h1>Menos trabajo repetido.<br><em>Más negocio.</em></h1><p>Situaciones del día a día y herramientas que las hacen más sencillas.</p></section><section class="asesoria-demos" aria-labelledby="asesoria-title"><h2 id="asesoria-title">Pruebas de Asesor&#237;a JM2</h2><div class="actions"><a class="primary" href="jm2-asesoria-version-1.html">Ver versi&#243;n 1</a><a class="primary" href="jm2-asesoria-version-2.html">Ver versi&#243;n 2</a><a class="primary" href="jm2-asesoria-version-3.html">Versi&#243;n 3 &#183; Cian nocturno</a><a class="primary" href="jm2-asesoria-version-4.html">Versi&#243;n 4 &#183; Azul el&#233;ctrico</a><a class="primary" href="jm2-asesoria-version-5.html">Versi&#243;n 5 &#183; Factura en el m&#243;vil</a><a class="primary" href="jm2-asesoria-version-6.html">Versi&#243;n 6 &#183; Expediente fiscal</a><a class="primary" href="jm2-asesoria-portada.html">Portada &#183; Otro concepto de asesor&#237;a</a><a class="primary" href="asesoriaclaude.html">Versi&#243;n 7 &#183; Claude</a><a class="primary" href="jm2-un-dia.html">Un d&#237;a con JM2</a></div></section><section class="featured-stories" id="historias-destacadas" aria-labelledby="stories-title"><h2 id="stories-title">Historias destacadas</h2><ul>${storyCards}</ul></section>${claudeCollection}${orderCollection}${cards}<footer>JM2 Tech Studio · Mérida</footer></main></body></html>`);
