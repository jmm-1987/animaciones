const fs = require('node:fs');
const { createVideo } = require('./plantilla-video.cjs');

const campaigns = [
  {
    id: 'facturacion-a-tu-manera',
    title: 'Facturación a tu manera',
    hook: '¿Cómo facturas<br><em>en tu negocio?</em>',
    description: 'Clientes, precios, presupuestos y facturas configurados según tu forma de trabajar.',
    tags: ['Facturación', 'Presupuestos', 'Cuota mensual'],
    scenes: [
      [6, '¿Cómo facturas<br><em>en tu negocio?</em>', 'Cuéntanos cómo trabajas.', [['▤', 'Facturas'], ['▧', 'Presupuestos'], ['✓', 'A tu manera']], '¿Cómo facturas en tu negocio? Te preparamos una herramienta que sigue tus pasos.'],
      [7, '¿Guardas al cliente<br><em>o es puntual?</em>', 'Reutiliza sus datos cuando vuelva.', [['✓', 'Cliente guardado', 'Recupera sus datos'], ['＋', 'Cliente puntual', 'Introduce sus datos al facturar']], 'Si el cliente vuelve, recuperas sus datos en segundos. Si es puntual, los escribes al hacer la factura.'],
      [7, '¿A fin de mes<br><em>o trabajo a trabajo?</em>', 'Configura el momento de facturar.', [['▦', 'A fin de mes', 'Agrupa los trabajos del cliente'], ['⚡', 'Por trabajo', 'Factura al terminar']], 'Puedes juntar los trabajos de un cliente en una sola factura a fin de mes, o facturar cada trabajo al terminar.'],
      [7, '¿Catálogo con precios<br><em>o líneas manuales?</em>', 'Elige cómo añadir cada concepto.', [['▤', 'Catálogo de artículos', 'Selecciona el artículo y su precio'], ['＋', 'Concepto libre', 'Escribe la descripción y el importe']], 'Para lo que vendes a menudo, elige un artículo con su precio. Si el trabajo es distinto, escribe el concepto y el importe.'],
      [7, '¿Presupuestas primero<br><em>o facturas directamente?</em>', 'Pasa los conceptos del presupuesto a la factura.', [['▧', 'Presupuesto aceptado', 'Convierte el presupuesto en factura'], ['▤', 'Factura directa', 'Emite desde el primer paso']], 'Cuando te aceptan un presupuesto, lo pasas a factura sin copiar las líneas. También puedes emitir una factura directamente.'],
      [6, '¿Cómo la envías?', 'Elige el canal que usa tu cliente.', [['print', 'Imprimir'], ['email', 'Correo electrónico'], ['whatsapp', 'WhatsApp']], 'Con la factura lista, puedes imprimirla o enviar el PDF por correo electrónico o por WhatsApp.'],
      [9, 'Lo dejamos listo<br><em>para tu negocio.</em>', 'Cuéntanos cómo facturas ↗', [['✓', 'Tu forma de trabajar'], ['↻', 'Software actualizado'], ['€', 'Cuota mensual', 'Sin grandes costes iniciales']], 'Cuéntanos cómo facturas. Lo dejamos listo para tu negocio y mantenemos el software actualizado por una cuota mensual, sin grandes costes iniciales.'],
    ],
  },
  {
    id: 'software-que-crece-contigo',
    title: 'Tu aplicación debe evolucionar',
    hook: 'Tu aplicación debe evolucionar<br><em>al ritmo de tu negocio.</em>',
    description: 'Software propio para empresas y autónomos, con mejoras a petición y una cuota mensual.',
    tags: ['Software a medida', 'Mejoras a petición', 'Cuota mensual'],
    scenes: [
      [6, '', '', [], 'Suena el teléfono. Hay WhatsApps sin contestar, papeles sueltos y correos que se pierden.'],
      [8, 'La aplicación con la que controlas tu negocio<br><em>DEBE evolucionar</em><br>al ritmo de tu negocio.', 'Software a medida para empresas y autónomos.', [['▤', 'Un nuevo servicio'], ['＋', 'Una persona más en el equipo'], ['↻', 'Otra forma de trabajar']], 'La aplicación con la que controlas tu negocio debe evolucionar al ritmo de tu negocio.'],
      [7, 'Introduce los datos<br><em>una sola vez.</em>', 'Comparte los datos entre los pasos del trabajo.', [['✓', 'Cliente guardado'], ['↓', 'Presupuesto preparado'], ['↓', 'Factura con sus datos']], 'Guardas los datos del cliente una vez. Los usas en el presupuesto y la factura, sin volver a escribirlos.'],
      [7, 'Consulta tus trabajos<br><em>en un vistazo.</em>', 'Cada persona sabe qué queda por hacer.', [['◷', 'Pendiente', 'Instalación en calle Mayor'], ['→', 'En curso', 'Revisión del equipo'], ['✓', 'Terminado', 'Mantenimiento mensual']], 'En un solo panel ves qué trabajos faltan, cuáles están en marcha y cuáles ha terminado el equipo.'],
      [8, '¿Necesitas un cambio?<br><em>Pídenoslo.</em>', 'Te ayudamos a adaptar el software cuando lo necesites.', [['email', 'Tu petición', '«Queremos avisos de cobros pendientes»'], ['⚙', 'Preparamos la mejora'], ['✓', 'Avisos incorporados']], 'Por ejemplo, si se te pasan los cobros, nos pides un aviso. Lo incorporamos para que puedas hacer el seguimiento desde tu herramienta.'],
      [7, 'Tu aplicación cambia<br><em>cuando lo necesitas.</em>', 'El servicio se cobra mediante una cuota mensual.', [], 'Pagas una cuota mensual y nos pides mejoras cuando las necesites. Así la herramienta sigue sirviendo a medida que cambia tu negocio.'],
      [6, '¿Qué tarea te quita<br><em>más tiempo?</em>', 'Cuéntanos qué quieres simplificar ↗', [['✓', 'Tu propio software'], ['↻', 'Adaptado a tu negocio']], '¿Qué tarea repites todas las semanas? Cuéntanosla y vemos cómo simplificarla con un software a tu medida.'],
    ],
  },
];

const channelIcons = {
  whatsapp: '<img src="whatsapp-logo-green.svg" alt="">',
  email: '<svg viewBox="0 0 48 48"><rect x="4" y="9" width="40" height="30" rx="5"/><path d="m6 12 18 14 18-14"/></svg>',
  print: '<svg viewBox="0 0 48 48"><path d="M13 17V5h22v12M13 36H5V17h38v19h-8M13 29h22v14H13zM34 23h3"/></svg>',
};

const appViews = [
  ['Configuración', 'Tu espacio de trabajo', 'Cambio reciente', 'Servicio añadido', 'Mantenimiento preventivo', [
    ['Servicios', 'Mantenimiento preventivo', 'Activo'],
    ['Equipo', 'Lucía Martín', 'Alta completada'],
    ['Flujo de trabajo', 'Revisión antes de facturar', 'Activado'],
  ]],
  ['Clientes', 'Comercial Rivera', 'Factura F-104', 'Comercial Rivera', '484,00 € · Lista para enviar', [
    ['Ficha de cliente', 'Comercial Rivera', 'Guardada'],
    ['Presupuesto P-023', 'Comercial Rivera · 484,00 €', 'Aceptado'],
    ['Factura F-104', 'Comercial Rivera · 484,00 €', 'Preparada'],
  ]],
  ['Trabajos', 'Planning del equipo', 'Mi próximo trabajo', 'Instalación en calle Mayor', 'Hoy, 10:30 · Pendiente', [
    ['Instalación en calle Mayor', 'Hoy · Lucía Martín', 'Pendiente'],
    ['Revisión del equipo', 'Hoy · Pablo Ruiz', 'En curso'],
    ['Mantenimiento mensual', 'Ayer · Lucía Martín', 'Terminado'],
  ]],
  ['Cobros', 'Avisos de cobro', 'Aviso de cobro', 'Factura F-104', 'Vence hoy · 484,00 €', [
    ['F-104 · Comercial Rivera', '484,00 €', 'Vence hoy'],
    ['F-107 · Taller Norte', '620,00 €', 'Vence en 3 días'],
    ['Recordatorios', 'Avisar el día del vencimiento', 'Activados'],
  ]],
  ['Actualizaciones', 'Mejoras de la aplicación', '', '', '', [
    ['Avisos de cobro', 'Mejora solicitada por el equipo', 'Disponible'],
    ['Exportar el planning', 'Descarga el calendario de trabajos', 'Disponible'],
    ['Filtros de trabajos', 'Mejora solicitada por el equipo', 'En revisión'],
  ]],
  ['Inicio', 'Resumen del negocio', 'Hoy', '2 trabajos por revisar', 'Consulta el planning del equipo', [
    ['Clientes', 'Comercial Rivera', 'Ficha actualizada'],
    ['Trabajos', 'Instalación en calle Mayor', 'Pendiente'],
    ['Cobros', 'Factura F-104 · 484,00 €', 'Vence hoy'],
  ]],
];

const deviceLayouts = ['overview', 'billing', 'field', 'alert', 'laptop', 'closing'];

function appDevices([section, title, mobileTitle, mobileItem, mobileDetail, rows], layout) {
  const desktop = !['field', 'closing'].includes(layout);
  const mobile = layout === 'field';
  return `<div class="jm-devices jm-devices--${layout}">
    ${desktop ? `<div class="jm-monitor">
      <div class="jm-desktop-screen">
        <div class="jm-app-bar"><b>JM2</b><span>Área de gestión / ${section}</span><i aria-hidden="true">LM</i></div>
        <div class="jm-app-body">
          <aside>${['Inicio', 'Clientes', 'Trabajos', 'Cobros', section]
            .filter((item, index, menu) => menu.indexOf(item) === index)
            .map(item => `<span${item === section ? ' class="current"' : ''}>${item}</span>`).join('')}</aside>
          <div class="jm-app-main"><h2>${title}</h2>
            ${rows.map(([name, detail, status]) => `<div class="jm-app-row"><div><b>${name}</b><small>${detail}</small></div><span>${status}</span></div>`).join('')}
          </div>
        </div>
        ${layout === 'alert' ? `<div class="jm-app-notification"><b>${mobileTitle}</b><span>${mobileItem} · ${mobileDetail}</span></div>` : ''}
      </div>
    </div>` : ''}
    ${mobile ? `<div class="jm-handset">
      <div class="jm-mobile-screen">
        <div class="jm-mobile-status" aria-hidden="true"><span>9:41</span><span>▴ ▰</span></div>
        <div class="jm-mobile-bar"><b>JM2</b><span>${section}</span></div>
        <div class="jm-mobile-content"><h2>${mobileTitle}</h2><div><b>${mobileItem}</b><small>${mobileDetail}</small></div>
          ${rows.map(([name, detail, status]) =>
            `<article><b>${name}</b><small>${detail}</small><span>${status}</span></article>`).join('')}
        </div>
        <div class="jm-mobile-nav">Inicio <strong>${section === 'Inicio' ? 'Trabajos' : section}</strong> Perfil</div>
      </div>
    </div>` : ''}
    ${layout === 'closing' ? `<div class="jm-workflow">
      ${rows.map(([name, detail, status]) => `<article><h2>${name}</h2><p>${detail}</p><small>${status}</small></article>`).join('')}
    </div>` : ''}
  </div>`.replace(/^[ \t]+$/gm, '');
}

function sceneMarkup([, heading, caption, rows], index, count, appView) {
  const closing = index === count - 1;
  const cards = rows.map(([icon, title, detail], row) => `
    <div class="jm-option" style="--delay:${180 + row * 190}ms;--tilt:${row % 2 ? 2 : -2}deg">
      <span class="jm-icon${channelIcons[icon] ? ` jm-icon--${icon}` : ''}" aria-hidden="true">${channelIcons[icon] || icon}</span>
      <div><strong>${title}</strong>${detail ? `<small>${detail}</small>` : ''}</div>
    </div>`).join('');
  return `<div class="jm-scene${closing ? ' jm-closing' : ''}${appView ? ' jm-app-scene' : ''}">
    <div class="jm-glow" aria-hidden="true"></div>
    <div class="jm-mark">JM2 TECH STUDIO</div>
    <h1>${heading}</h1>
    ${appView ? appDevices(appView, deviceLayouts[index - 1]) : `<div class="jm-options">${cards}</div>`}
    <p class="jm-caption">${caption}</p>
    <div class="jm-progress" aria-hidden="true"><i style="--progress:${(index + 1) / count * 100}%"></i></div>
  </div>`;
}

function chaosOpening() {
  return `<div class="jm-scene jm-chaos">
    <div class="jm-desk">
      <div class="jm-paper jm-paper--back"><b>Presupuesto</b><i></i><i></i><i></i></div>
      <div class="jm-paper jm-paper--front"><b>Datos del cliente</b><i></i><i></i><i></i></div>
      <div class="jm-sticky">Llamar<br>al cliente</div>
      <div class="jm-phone">
        <div class="jm-phone-camera"></div>
        <span>Llamada entrante</span>
        <strong>Cliente</strong>
        <div class="jm-phone-answer" aria-hidden="true">☎</div>
      </div>
      <div class="jm-alert jm-alert--whatsapp">
        ${channelIcons.whatsapp}
        <div><strong>WhatsApp</strong><small>«¿Me envías el presupuesto?»</small></div><b>3</b>
      </div>
      <div class="jm-alert jm-alert--email">
        ${channelIcons.email}
        <div><strong>Correo electrónico</strong><small>«Reenvío los datos de facturación»</small></div>
      </div>
    </div>
  </div>`;
}

function buildCampaign(campaign) {
  const { id, title, scenes, description } = campaign;
  const file = `video-${id}.html`;
  const marks = [0];
  scenes.forEach(([seconds]) => marks.push(marks.at(-1) + seconds));
  const copy = scenes.map(([, heading]) => heading ? heading.replaceAll('<br>', ' ').replace(/<\/?em>/g, '') : 'Llamada entrante, papeles y mensajes pendientes');
  const views = id === 'software-que-crece-contigo' ? appViews : [];
  const shots = scenes.map((scene, i) => scene[1] ? sceneMarkup(scene, i, scenes.length, views[i - 1]) : chaosOpening());
  const post = `${description} Cuéntanos cómo trabajas y qué te gustaría simplificar. #SoftwareAMedida #Autonomos #Pymes #JM2TechStudio`;
  createVideo({
    file, title, copy, shots: shots.slice(0, -1), stylesheet: 'software-medida.css',
    timing: { duration: marks.at(-1), marks },
    narration: scenes.map(([, , , , voice]) => voice),
    publications: { instagram: post, tiktok: post },
  }, `<section class="story-scene" data-scene="${shots.length - 1}"><div class="shot"><div class="shot-visual">${shots.at(-1)}</div></div></section>`);
  const html = fs.readFileSync(file, 'utf8').replace('<div class="video-top">', `<div class="video-top"><a href="video-${id}.mp4" download>Descargar MP4</a>`);
  fs.writeFileSync(file, html);
}

if (require.main === module) {
  const [id] = process.argv.slice(2);
  const selected = campaigns.filter(campaign => !id || campaign.id === id);
  if (!selected.length) throw new Error(`Campaña desconocida: ${id}`);
  selected.forEach(buildCampaign);
}
module.exports = campaigns;
