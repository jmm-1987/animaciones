const fs=require('fs');
const {createVideo}=require('./plantilla-video.cjs');
const mascot=require('./robot.cjs');
const robot=`<svg viewBox="0 0 420 340" aria-label="Robot de JM2" role="img">${mascot}</svg>`;
const personComputer=require('./persona-ordenador.cjs');
const invoice=`<div class="mp-invoice"><div class="mp-doc-icon">↗</div><span>FACTURA</span><h3>Materiales Norte</h3><div class="mp-doc-line"></div><div class="mp-doc-line short"></div><dl><div><dt>Referencia</dt><dd>F-128</dd></div><div><dt>Fecha</dt><dd>16 / 11</dd></div><div><dt>Total</dt><dd>435,60 €</dd></div></dl><div class="mp-doc-bottom">PDF · 1 documento</div></div>`;
const fields=`<div class="mp-field" style="--order:0"><span>Proveedor</span><b>Materiales Norte</b><i>✓</i></div><div class="mp-field" style="--order:1"><span>Referencia</span><b>F-128</b><i>✓</i></div><div class="mp-field" style="--order:2"><span>Importe</span><b>435,60 €</b><i>✓</i></div>`;
const intake=`<div class="mp-intake" aria-label="Recepción de facturas por email, carga manual o foto"><div class="mp-channel" style="--order:0"><svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="10" width="36" height="28" rx="5"/><path d="M7 13L24 26 41 13"/></svg><b>Por email</b><span>Factura adjunta</span></div><div class="mp-channel" style="--order:1"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 30V6M15 15L24 6 33 15M7 28V38Q7 42 12 42H36Q41 42 41 38V28"/></svg><b>Carga manual</b><span>Subes el archivo</span></div><div class="mp-channel" style="--order:2"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 15H14L18 9H30L34 15H42V39H6Z"/><circle cx="24" cy="26" r="8"/></svg><b>Una foto</b><span>Desde el móvil</span></div></div><svg class="mp-intake-paths" viewBox="0 0 850 100" aria-hidden="true"><path d="M140 0V30Q140 50 160 50H405Q425 50 425 70V100M425 0V100M710 0V30Q710 50 690 50H445Q425 50 425 70"/><circle r="5"><animateMotion dur="2.6s" repeatCount="indefinite" path="M140 0V30Q140 50 160 50H405Q425 50 425 70V100"/></circle><circle r="5"><animateMotion dur="2.6s" begin=".8s" repeatCount="indefinite" path="M425 0V100"/></circle><circle r="5"><animateMotion dur="2.6s" begin="1.5s" repeatCount="indefinite" path="M710 0V30Q710 50 690 50H445Q425 50 425 70"/></circle></svg><div class="mp-intake-hub"><img src="brand_logo.png" alt=""><div><b>Recibe → Lee → Prepara</b><span>Las facturas llegan a la misma herramienta.</span></div></div>`;
const shots=[
`<div class="mp-scene mp-opening"><span class="mp-kicker">PARA QUIENES LLEVAN UN NEGOCIO</span><h1>Tu negocio<br>no es<br><em>copiar datos.</em></h1><div class="mp-opening-art"><div class="mp-float mp-float-back">Otra factura.</div>${invoice}<div class="mp-float mp-float-front">Y otra vez a teclear<span class="mp-caret">|</span></div></div><p class="mp-bottom">Y, sin embargo, ahí se va parte del día.</p></div>`,
`<div class="mp-scene mp-repetition"><span class="mp-kicker">LA PARTE QUE SE REPITE</span><h1>Abrir. Copiar.<br>Volver a empezar.</h1><div class="mp-repeat-stack"><div class="mp-task" style="--order:0"><span>01</span><b>Abrir la factura</b><i>↗</i></div><div class="mp-task" style="--order:1"><span>02</span><b>Buscar los datos</b><i>⌕</i></div><div class="mp-task" style="--order:2"><span>03</span><b>Pasarlos al registro</b><i>↵</i></div><div class="mp-task mp-task-again" style="--order:3"><span>04</span><b>Repetir con la siguiente…</b><i>↻</i></div></div><div class="mp-person-at-desk">${personComputer}</div><p class="mp-bottom">La tarea hace falta.<br>Repetirla a mano puede cambiar.</p></div>`,
`<div class="mp-scene mp-solution mp-with-intake"><span class="mp-kicker">ESTO ES LO QUE CONSTRUIMOS EN JM2</span><h1>Lleguen como lleguen.<br><em>En el mismo sitio.</em></h1><div class="mp-demo">${intake}<div class="mp-register"><header><span class="mp-window-dots">● ● ●</span><b>Tu registro de facturas</b></header>${fields}<footer><span>✓ Datos preparados</span><b>Pendiente de tu revisión</b></footer></div></div><p class="mp-bottom">Recibir. Leer. Preparar.<br>Tú revisas el resultado.</p></div>`,
`<div class="mp-scene mp-benefit"><span class="mp-kicker">EL CONTROL SIGUE SIENDO TUYO</span><h1>Tú revisas.<br><em>Y sigues.</em></h1><div class="mp-review"><span class="mp-review-icon">✓</span><div><small>FACTURA F-128</small><h3>Todo en su sitio.</h3><p>Proveedor, referencia e importe.</p></div><div class="mp-review-button">Revisar datos <span>→</span></div></div><div class="mp-benefit-copy"><span>MENOS COPIAR Y PEGAR</span><p>Más atención para<br>lo que necesita tu negocio.</p></div><p class="mp-example">Ejemplo ilustrativo · El resultado se revisa antes de utilizarlo.</p></div>`
];
const story={file:'piloto-marca.html',audioKey:'piloto-marca.html',title:'Tu negocio no es copiar datos',variant:'marca',voice:false,timing:{duration:32,marks:[0,5,11,20,27,32]},copy:['Tu negocio no es copiar datos.','Abrir. Copiar. Volver a empezar.','Una factura entra. Los datos, listos.','Tú revisas. Y sigues.'],shots,narration:['Tu negocio no es copiar datos. Y, sin embargo, ahí se va parte del día.','Abrir una factura, buscar los datos, pasarlos al registro. Y volver a empezar.','En eso trabajamos: creamos una herramienta que lee tus facturas y prepara los datos en tu registro. Adaptada a tu forma de trabajar.','Tú revisas el resultado. Menos copiar y pegar, y más atención para lo que necesita tu negocio.','Sistemas y herramientas a medida. Para facilitar tu día a día.'],social:{keyword:'TU NEGOCIO',message:''}};
story.publications={
 instagram:`Tu negocio no es copiar datos. Pero, a veces, parte del día se va en eso.

Una factura llega por email. Otra la tienes en un archivo. Otra, en una foto del móvil.

En JM2 creamos herramientas que las reúnen en el mismo sitio, leen sus datos y los preparan en un registro. Tú revisas el resultado y mantienes el control.

Menos copiar y pegar. Más atención para lo que necesita tu negocio.

¿Qué tarea repetida te gustaría quitarte de encima?

#JM2TechStudio #Automatizacion #HerramientasAMedida #PequeñosNegocios #Merida`,
 tiktok:`Una factura por email, un archivo o una foto. Todo al mismo sitio y los datos preparados para revisar.

Así creamos en JM2 herramientas a medida para que pases menos tiempo copiando y pegando.

¿Qué tarea repites cada día en tu negocio?

#JM2TechStudio #Automatizacion #Negocios`
};
story.narration=[
 'Tu negocio no es copiar datos. Y, sin embargo, ahí se va parte del día.',
 'Abrir una factura, buscar los datos, pasarlos al registro. Y volver a empezar.',
 'En eso trabajamos. Creamos una herramienta que recibe tus facturas por email, te permite subir un archivo o añadir una foto desde el móvil. Lleguen como lleguen, las reúne en el mismo sitio, lee sus datos y los prepara en tu registro.',
 'Tú revisas el resultado. Menos copiar y pegar, y más atención para lo que necesita tu negocio.',
 'Sistemas y herramientas a medida. Para facilitar tu día a día.'
];
// Montaje de la locución descargada: conservar sus pausas al regenerar el piloto.
const catalogPath='audio/generados/catalogo.json';
const savedAudio=fs.existsSync(catalogPath)?JSON.parse(fs.readFileSync(catalogPath,'utf8'))[story.file]:null;
if(savedAudio){story.timing={duration:savedAudio.duration,marks:savedAudio.marks,audioRate:1};}
const ending=`<section class="story-scene ending mp-ending" data-scene="4" aria-label="Sistemas y herramientas a medida"><div class="mp-end-mark"><img src="brand_logo.png" alt=""></div><h2>Menos trabajo repetido.<br><em>Más negocio.</em></h2><img class="ending-logo" src="logo.png" alt="JM2 Tech Studio"><p>Sistemas y herramientas a medida.</p><span>Para facilitar tu día a día.</span></section>`;
createVideo(story,ending);
console.log('Vídeo y guiones actualizados.');
