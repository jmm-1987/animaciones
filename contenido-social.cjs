const fs=require('fs');
const {buildPublications}=require('./publicaciones.cjs');
const sets=[
 {id:'facturas',title:'Tres entradas. Un mismo registro.',caption:'Tus facturas pueden llegar por email, en un archivo o en una foto del móvil.\n\nEn JM2 creamos herramientas para reunirlas, leer sus datos y prepararlos en un mismo registro. Tú revisas el resultado.\n\nDesliza para ver el recorrido. ¿Por dónde te llegan más facturas?\n\n#JM2TechStudio #Automatizacion #Autonomos #HerramientasAMedida #GestionDeNegocios',slides:[
 ['TUS FACTURAS','Llegan por tres sitios.<br><em>Los datos, a uno.</em>','Email, archivo o foto. Hay otra forma de reunirlas.','channels'],
 ['01 · EMAIL','La factura llega<br><em>por correo.</em>','El adjunto entra en la herramienta, sin ir copiando sus datos a mano.','mail'],
 ['02 · ARCHIVO','La tienes guardada.<br><em>La subes.</em>','Añades el documento desde tu dispositivo. La recepción es parte del proceso.','upload'],
 ['03 · FOTO','También desde<br><em>el móvil.</em>','Añades una foto legible de la factura para preparar sus datos.','photo'],
 ['UN MISMO DESTINO','Datos preparados.<br><em>Tú revisas.</em>','Proveedor, referencia e importe reunidos en un registro, pendientes de tu revisión.','register'],
 ['HERRAMIENTAS A MEDIDA','Recibir. Leer. Preparar.<br><em>Menos copiar.</em>','Creamos herramientas adaptadas a tus documentos y a tu forma de trabajar.','brand']
 ]},
 {id:'cobros',title:'Facturar y cobrar son pasos distintos.',caption:'Una factura enviada no confirma que el dinero haya llegado.\n\nSeparar lo emitido, lo pendiente, lo vencido y los cobros confirmados ayuda a ver qué hay que revisar. Antes de enviar un aviso, comprueba si el pago ya se ha recibido.\n\nEn JM2 creamos herramientas para reunir facturas, vencimientos y seguimiento en una vista.\n\nGuarda este carrusel para tu próxima revisión.\n\n#JM2TechStudio #Autonomos #ControlDeCobros #GestionDeNegocios #HerramientasAMedida',slides:[
 ['CONTROL DE COBROS','Factura enviada.<br><em>¿Dinero recibido?</em>','Son dos pasos distintos. Tenerlos separados ayuda a ver qué queda por hacer.','amounts'],
 ['01 · EMITIDA','La factura<br><em>ya está preparada.</em>','Que esté emitida o enviada no significa que hayas confirmado su cobro.','issued'],
 ['02 · PENDIENTE','Falta confirmar<br><em>el cobro.</em>','Revisa el importe pendiente y la información disponible sobre el pago.','pending'],
 ['03 · VENCIDA','La fecha ha pasado.<br><em>Toca comprobar.</em>','Si sigue pendiente, revisa si el pago ha llegado antes de enviar un recordatorio.','overdue'],
 ['04 · COBRO CONFIRMADO','Has revisado el pago.<br><em>Lo registras.</em>','Relacionas el ingreso con su factura y actualizas lo que queda pendiente.','paid'],
 ['UNA VISTA MÁS CLARA','Cada estado,<br><em>en su sitio.</em>','Facturas, importes y vencimientos. Herramientas a medida para seguir tus cobros.','brand']
 ]}
];
const icons={mail:'<rect x="8" y="15" width="64" height="48" rx="8"/><path d="M10 19L40 42 70 19"/>',upload:'<path d="M40 52V9M24 25L40 9 56 25M12 48V66H68V48"/>',photo:'<path d="M9 24H24L30 13H51L57 24H72V67H9Z"/><circle cx="40" cy="44" r="14"/>'};
const icon=key=>`<svg viewBox="0 0 80 80" aria-hidden="true">${icons[key]}</svg>`;
sets.push(
 {id:'facturar-movil',title:'Del trabajo terminado a la factura.',caption:'Acabas un trabajo y la factura se queda para después.\n\nCliente, servicio y materiales: tenerlos a mano en el móvil permite preparar la factura sin empezar de cero. Después revisas los datos y los importes, emites y eliges cómo enviarla.\n\nEn JM2 creamos herramientas adaptadas a tu actividad. Lo mostramos con un fontanero y un taller, pero el punto de partida es tu forma de trabajar.\n\n#JM2TechStudio #Autonomos #Facturacion #HerramientasAMedida #Profesionales',slides:[
 ['FACTURAR DESDE EL MÓVIL','Terminas el trabajo.<br><em>¿Y la factura?</em>','Cinco pasos para dejar de empezar desde cero en cada servicio.','mobile-work'],
 ['01 · CLIENTE','Sus datos,<br><em>a mano.</em>','Recuperas la información del cliente y compruebas que sigue siendo correcta.','client'],
 ['02 · TRABAJO','Lo que has hecho.<br><em>Lo que has usado.</em>','Añades servicio, mano de obra y materiales con tus conceptos habituales.','work'],
 ['03 · REVISIÓN','Antes de emitir,<br><em>compruebas.</em>','Revisas los datos, los conceptos, los importes y los impuestos aplicables.','review'],
 ['04 · ENVÍO','Desde el móvil.<br><em>Hasta el cliente.</em>','Emites y envías la factura por el canal que utilice tu negocio.','send'],
 ['HERRAMIENTAS A MEDIDA','El trabajo terminado.<br><em>La factura, al día.</em>','Menos repetir datos. Un recorrido pensado para tu actividad.','brand']
 ]},
 {id:'presupuestos',title:'Un presupuesto claro empieza antes del PDF.',caption:'Un presupuesto no empieza al darle a “enviar”.\n\nPrimero hay que reunir qué necesita el cliente, qué incluye el trabajo, los materiales, los precios y las condiciones.\n\nEn JM2 creamos herramientas para preparar propuestas con tu catálogo y tus tarifas. Tú revisas el alcance y los importes antes de compartir el documento.\n\n¿Dónde pierdes más tiempo al preparar un presupuesto?\n\n#JM2TechStudio #Presupuestos #Climatizacion #HerramientasAMedida #Negocios',slides:[
 ['PREPARAR PRESUPUESTOS','El cliente espera.<br><em>Las tarifas, dispersas.</em>','Reunir lo necesario también forma parte de preparar una buena propuesta.','quote'],
 ['01 · NECESIDAD','Primero,<br><em>qué necesita.</em>','Lo que has visto en la visita y lo que se ha acordado con el cliente.','need'],
 ['02 · ALCANCE','Qué entra.<br><em>Qué no entra.</em>','Equipo, trabajo y materiales descritos con claridad.','scope'],
 ['03 · PRECIOS','Tus conceptos.<br><em>Tus tarifas.</em>','Preparas la propuesta con los precios de tu negocio, sin buscarlos otra vez.','prices'],
 ['04 · REVISIÓN','Una propuesta clara.<br><em>Antes de enviarla.</em>','Compruebas alcance, importes y condiciones. Después preparas el documento.','quote-ready'],
 ['HERRAMIENTAS A MEDIDA','Menos buscar.<br><em>Más propuestas listas.</em>','Un ejemplo: reunir catálogo, instalación y materiales en una empresa de climatización.','brand']
 ]},
 {id:'tareas-repetidas',title:'¿Dónde se te va el tiempo?',caption:'A veces no es una tarea enorme. Es una pequeña tarea, repetida muchas veces.\n\nCopiar un dato. Buscar un precio. Revisar una factura pendiente. Reunir documentos que llegan por distintos sitios.\n\nUna buena primera pregunta es: ¿qué repites cada día y con qué información lo haces?\n\nEn JM2 creamos sistemas y herramientas a medida a partir de esas situaciones concretas. Cuéntanos una de las tuyas.\n\n#JM2TechStudio #Autonomos #PequeñosNegocios #Automatizacion #HerramientasAMedida',slides:[
 ['TU DÍA A DÍA','No es una gran tarea.<br><em>Son muchas pequeñas.</em>','La repetición también ocupa espacio en tu día.','tasks'],
 ['01 · COPIAR','El mismo dato.<br><em>Otra vez.</em>','Cliente, referencia o importe que vuelves a escribir en otra herramienta.','repeat'],
 ['02 · BUSCAR','Sabes que lo tienes.<br><em>Pero, ¿dónde?</em>','Un precio, una factura o el último documento del cliente.','search'],
 ['03 · SEGUIR','¿Está pendiente?<br><em>¿Ya está hecho?</em>','Estados y fechas que acabas revisando entre notas y mensajes.','follow'],
 ['POR DÓNDE EMPEZAR','Elige una tarea.<br><em>Cuenta su recorrido.</em>','Qué llega, qué haces con ello y qué necesitas al terminar.','route'],
 ['HERRAMIENTAS A MEDIDA','Tu forma de trabajar.<br><em>Un poco más fácil.</em>','Ahí empieza una herramienta útil. ¿Qué tarea repites más en tu negocio?','brand']
 ]}
);
function graphic(type){
 const demos={
 'mobile-work':['FACTURA DESDE EL MÓVIL',[['Cliente','Guardado'],['Trabajo','Terminado'],['Factura','Por preparar']]],
 client:['DATOS DEL CLIENTE',[['Nombre','Cliente de ejemplo'],['Contacto','Guardado'],['Datos','Para revisar']]],
 work:['TRABAJO REALIZADO',[['Servicio','Reparación'],['Materiales','Los utilizados'],['Precios','Tus tarifas']]],
 review:['REVISIÓN FINAL',[['Datos','Comprobar'],['Conceptos','Revisar'],['Importes','Verificar']]],
 send:['ENVÍO AL CLIENTE',[['WhatsApp','Compartir'],['Email','Enviar'],['Papel','Imprimir']]],
 quote:['PRESUPUESTO',[['Cliente','Esperando'],['Catálogo','Por consultar'],['Tarifas','Por reunir']]],
 need:['LA VISITA',[['Necesidad','Recogida'],['Datos','Anotados'],['Cliente','Identificado']]],
 scope:['QUÉ INCLUYE',[['Equipo','Seleccionado'],['Instalación','Descrita'],['Materiales','Detallados']]],
 prices:['TUS TARIFAS',[['Conceptos','Guardados'],['Cantidades','Revisadas'],['Precios','Actualizados por ti']]],
 'quote-ready':['ANTES DE ENVIAR',[['Alcance','Revisado'],['Importes','Comprobados'],['Condiciones','Confirmadas']]],
 tasks:['OTRA VEZ',[['Copiar','Un dato'],['Buscar','Un documento'],['Revisar','Un pendiente']]],
 repeat:['MISMO CLIENTE',[['Programa 1','Escribir'],['Programa 2','Volver a escribir'],['Programa 3','Repetir']]],
 search:['¿DÓNDE ESTÁ?',[['Carpetas','Una versión'],['Correo','Otro archivo'],['Móvil','Una foto']]],
 follow:['SEGUIMIENTO',[['Trabajo','En marcha'],['Presupuesto','Por enviar'],['Factura','Pendiente']]],
 route:['UNA TAREA CONCRETA',[['Entrada','Qué recibes'],['Trabajo','Qué haces'],['Resultado','Qué necesitas']]]
 };
 if(demos[type]){const [title,rows]=demos[type];return `<div class="cs-window"><div class="cs-window-top">${title}</div>${rows.map(v=>`<div class="cs-row"><span>${v[0]}</span><b>${v[1]}</b></div>`).join('')}</div>`;}
 if(type==='channels')return `<div class="cs-channels">${['mail','upload','photo'].map((k,i)=>`<div>${icon(k)}<b>${['Email','Archivo','Foto'][i]}</b></div>`).join('')}</div><div class="cs-arrow">↓</div><div class="cs-destination">Un mismo registro · Datos para revisar</div>`;
 if(type==='mail')return `<div class="cs-window"><div class="cs-window-top">Correo recibido</div><strong>Tu factura del servicio</strong><p>Documento adjunto</p><div class="cs-attachment">↗ &nbsp; factura.pdf</div></div>`;
 if(type==='upload')return `<div class="cs-upload">${icon('upload')}<strong>Subir factura</strong><p>Selecciona el archivo de tu dispositivo</p><span>factura.pdf &nbsp; ✓</span></div>`;
 if(type==='photo')return `<div class="cs-phone"><span></span><div class="cs-photo-frame"><b>FACTURA</b><p>Proveedor de ejemplo</p><hr><hr><strong>435,60 €</strong></div><small>Añadir foto de la factura</small><i></i></div>`;
 if(type==='register')return `<div class="cs-window"><div class="cs-window-top">Tu registro de facturas</div>${[['Proveedor','Materiales Norte'],['Referencia','F-128'],['Importe','435,60 €']].map(v=>`<div class="cs-row"><span>${v[0]}</span><b>${v[1]}</b></div>`).join('')}<div class="cs-status">Pendiente de tu revisión</div></div>`;
 if(type==='brand')return `<div class="cs-brand"><img src="../../brand_logo.png" alt=""><strong>Menos trabajo repetido.<br>Más negocio.</strong></div>`;
 const status={amounts:['FACTURA EMITIDA','480 €','COBRO CONFIRMADO','0 €'],issued:['FACTURA F-024','480 €','Estado','Emitida'],pending:['FACTURA F-024','480 €','Estado','Pendiente'],overdue:['FACTURA F-024','480 €','Vencimiento','Pasado · Revisar'],paid:['COBRO COMPROBADO','480 €','Pendiente de esta factura','0 €']}[type];
 return `<div class="cs-window"><div class="cs-window-top">Ejemplo ilustrativo</div><div class="cs-amount"><span>${status[0]}</span><strong>${status[1]}</strong></div><div class="cs-row"><span>${status[2]}</span><b>${status[3]}</b></div></div>`;
}
for(const set of sets){
 const folder=`carruseles/${set.id}`;fs.mkdirSync(folder,{recursive:true});
 for(const [i,s] of set.slides.entries()){
  const n=String(i+1).padStart(2,'0');
  fs.writeFileSync(`${folder}/${n}.html`,`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${set.title} · ${n}</title><link rel="stylesheet" href="../../carruseles.css"></head><body class="cs-export"><article class="cs-slide"><header><img src="../../logo.png" alt="JM2 Tech Studio"><span>${n} / 06</span></header><div class="cs-kicker">${s[0]}</div><h1>${s[1]}</h1><div class="cs-graphic">${graphic(s[3])}</div><p class="cs-description">${s[2]}</p><footer><span>${i===5?'Sistemas y herramientas a medida':'Desliza para seguir →'}</span><small>JM2 Tech Studio · ${set.id==='cobros'?'Ejemplo de seguimiento':'Ejemplo ilustrativo'}</small></footer></article></body></html>`);
 }
 const publications=buildPublications({file:`carrusel-${set.id}.html`,publications:{instagram:set.caption.replaceAll('\\n','\n'),tiktok:set.caption.replaceAll('\\n','\n')}});
 fs.writeFileSync(`carrusel-${set.id}.html`,`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${set.title} · JM2</title><link rel="stylesheet" href="plantilla-video.css"><link rel="stylesheet" href="carruseles.css"></head><body class="cs-preview"><main><header class="cs-page-header"><a href="planning.html">← Planning</a><span>Carrusel · 6 imágenes</span></header><h1>${set.title}</h1><p>Descarga las seis imágenes y súbelas en orden, de la 01 a la 06.</p><div class="cs-viewer" data-folder="${folder}"><iframe src="${folder}/01.html" title="Diapositiva 1 de 6"></iframe></div><nav class="cs-controls" aria-label="Diapositivas"><button data-carousel-step="-1" disabled>← Anterior</button><span id="cs-counter">1 / 6</span><button data-carousel-step="1">Siguiente →</button></nav><div class="cs-downloads"><a class="cs-button" href="${folder}/imagenes.zip" download>Descargar las 6 imágenes</a><a id="cs-download-current" href="${folder}/01.png" download>Descargar esta imagen</a></div>${publications}</main><script src="carruseles.js"></script><script src="publicaciones.js"></script></body></html>`);
}
module.exports={sets};
