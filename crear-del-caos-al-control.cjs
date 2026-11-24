const fs = require('node:fs');
const person = require('./persona-ordenador.cjs');

const videos = [
  {
    file: 'video-citas-por-whatsapp.html',
    title: 'Citas por WhatsApp',
    hook: '¿A qué hora<br><em>era la cita?</em>',
    tags: ['WhatsApp', 'Agenda'],
    description: 'Los mensajes se amontonan. Una agenda propia reúne las citas y respeta los horarios del negocio.',
    scenes: [
      {title: '¿A qué hora era la cita?', lines: ['¿Me das hora mañana?', '¿Podemos cambiarla al jueves?', '¿A las cinco era lo mío?'], caption: 'Busca entre los chats y acaba dando la misma hora a dos clientes.'},
      {title: 'Una agenda con sus horarios', lines: ['Duración por servicio', 'Huecos y descansos', 'Confirmación por WhatsApp'], caption: 'Configura cuánto dura cada cita y qué horas quiere reservar para trabajar.'},
      {title: 'Mira la agenda y confirma', lines: ['10:00 · Ana · Confirmada', '11:30 · Hueco libre', '12:00 · Luis · Confirmada'], caption: 'Sigue atendiendo por WhatsApp. Abre su agenda, elige un hueco libre y confirma.'}
    ]
  },
  {
    file: 'video-facturas-a-su-manera.html',
    title: 'Facturas a su manera',
    hook: '¿Qué facturas<br><em>quedan por cobrar?</em>',
    tags: ['Facturación', 'Control de cobros'],
    description: 'De los partes y el Excel a un programa que factura como trabaja el negocio y muestra los cobros pendientes.',
    scenes: [
      {title: '¿Qué queda por cobrar?', lines: ['Un parte en papel', 'Una factura en Excel', 'Un pago sin apuntar'], caption: 'El trabajo está hecho, pero lleva un rato buscando si lo facturó y si ya le pagaron.'},
      {title: 'Su trabajo, en su programa', lines: ['Horas y materiales del parte', 'Precios por cliente', 'Su plantilla de factura'], caption: 'Registra el trabajo una vez. Su programa prepara la factura con los datos del parte.'},
      {title: 'Emite y controla los cobros', lines: ['Parte → Factura 024', 'Factura 024 · Pendiente', 'Factura 023 · Cobrada'], caption: 'Envía la factura y ve de un vistazo qué queda por cobrar.'}
    ]
  },
  {
    file: 'video-factura-automatica.html',
    mp4: 'video-factura-automatica.mp4',
    title: 'Así se prepara sola una factura',
    hook: '¿Sigues haciendo<br><em>las facturas en Excel?</em>',
    tags: ['Facturación', 'Automatización'],
    description: 'Una demostración en 20 segundos: cliente guardado, conceptos del trabajo y factura lista para revisar.',
    duration: 20000,
    invoiceDemo: true,
    scenes: [
      {
        title: 'Si todavía haces esto con las facturas, estás perdiendo una hora al día',
        visual: `<div class="spreadsheet">
          <div class="sheet-title">▦ <b>Facturas.xlsx</b></div>
          <div class="sheet-formula"><span>C5</span><i>ƒx</i><code>=SUMA(C3:C4)</code></div>
          <table aria-label="Factura n.º 024 en una hoja de cálculo">
            <thead><tr><td></td><th scope="col">A</th><th scope="col">B</th><th scope="col">C</th></tr></thead>
            <tbody>
              <tr><th scope="row">1</th><td colspan="3"><b>Factura n.º 024 · Ana López</b></td></tr>
              <tr><th scope="row">2</th><td>Concepto</td><td>Cant.</td><td>Importe</td></tr>
              <tr><th scope="row">3</th><td>Mano de obra</td><td>2 h</td><td>70,00 €</td></tr>
              <tr><th scope="row">4</th><td>Materiales</td><td>1</td><td>25,00 €</td></tr>
              <tr><th scope="row">5</th><td>Base</td><td></td><td class="sheet-selection">95,00 €</td></tr>
            </tbody>
          </table>
          <div class="sheet-tabs"><span>Facturas</span></div>
        </div>`
      },
      {title: '1. Elige el cliente', visual: '<div class="demo-app" id="of-client"></div>'},
      {title: '2. Recupera el trabajo', visual: '<div class="demo-app" id="of-lines"></div>'},
      {title: '3. Revisa la factura', visual: '<div class="demo-app" id="of-review"></div>'},
      {title: 'Sígueme y te enseño una tarea automática cada semana'}
    ]
  }
];

const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function render({title, scenes, duration = 24000, invoiceDemo = false}) {
  const frames = scenes.map(({title, lines, caption, visual}, index) => `
    <section class="scene" data-step="${index}"${index ? ' hidden' : ''}>
      <h1>${escape(title)}</h1>
      ${visual ?? (lines ? `<div class="illustration">
        ${person}
        <ul class="items">${lines.map(line => `<li>${escape(line)}</li>`).join('')}</ul>
      </div>` : '')}
      ${caption ? `<p>${escape(caption)}</p>` : ''}
    </section>`).join('');

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(title)} · Del caos al control</title>
${invoiceDemo ? '<link rel="stylesheet" href="facturacion-oficios.css">' : ''}
<style>
*{box-sizing:border-box}body{margin:0;background:#101626;color:#182232;font:700 18px system-ui,sans-serif}
main{min-height:100svh;display:grid;place-content:center;justify-items:center;gap:12px;padding:12px}
.stage{width:min(94vw,430px,calc((100svh - 80px)*.5625));aspect-ratio:9/16;container-type:inline-size;position:relative;overflow:hidden;background:#fff9ed;border-radius:14px}
.brand{position:absolute;z-index:1;top:5cqw;left:7cqw;width:23cqw;height:10cqw;object-fit:contain}
.scene{position:absolute;inset:0;padding:21cqw 7cqw 7cqw;background:#fff9ed}
.scene[data-step="1"]{background:#e7efff}.scene[data-step="2"]{background:#e1f6ec}
h1{font-size:10cqw;line-height:1.02;letter-spacing:-.05em;margin:0;max-width:85cqw}
.illustration{height:77cqw;position:relative;margin-top:4cqw}
.illustration svg{position:absolute;bottom:0;left:-9cqw;width:69cqw;height:auto}
.items{list-style:none;position:absolute;top:4cqw;right:0;width:49cqw;padding:0;margin:0;display:grid;gap:3cqw}
.items li{background:white;border:2px solid #182232;border-radius:2.5cqw;padding:2.5cqw;font-size:4.1cqw;line-height:1.16;box-shadow:1cqw 1cqw #1557f5}
.scene[data-step="0"] li:nth-child(odd){rotate:-6deg;box-shadow:1cqw 1cqw #db563a}
.scene[data-step="0"] li:nth-child(even){rotate:7deg;box-shadow:1cqw 1cqw #db563a}
.scene[data-step="2"] li{box-shadow:1cqw 1cqw #178454}
.scene p{font-size:5.3cqw;line-height:1.25;margin:2cqw 0 0;max-width:83cqw}
.controls{display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center}
.controls a,.controls button{background:#fff;color:#182232;border:0;border-radius:8px;padding:8px 12px;font:inherit;font-size:14px;text-decoration:none;cursor:pointer}
.controls :focus-visible{outline:3px solid #f5c944;outline-offset:3px}
${invoiceDemo ? `
.invoice-demo h1{font-size:8.2cqw}
.invoice-demo .scene[data-step="4"]{display:grid;align-items:center;background:#e1f6ec}
.invoice-demo .scene[hidden]{display:none}
.spreadsheet{margin-top:7cqw;border:1px solid #b6c7bd;border-radius:2cqw;overflow:hidden;background:#fff;color:#182232;font-size:3.7cqw;box-shadow:0 2cqw 5cqw #18223225}
.sheet-title{display:flex;gap:2cqw;align-items:center;background:#217346;color:white;padding:2.6cqw 4cqw;font-size:4.6cqw}
.sheet-formula{display:flex;align-items:center;gap:2.8cqw;padding:1.5cqw 3cqw;background:#f6f7f6;border-bottom:1px solid #d8e1db}
.sheet-formula span{padding:.4cqw 2cqw;border:1px solid #d8e1db;background:#fff}
.spreadsheet table{width:100%;border-collapse:collapse}
.spreadsheet th,.spreadsheet td{border:1px solid #d8e1db;padding:1.5cqw 1.8cqw;white-space:nowrap}
.spreadsheet th{background:#edf2ee;color:#405247;text-align:center}
.spreadsheet tbody tr:nth-child(2) td{background:#e0efe4}
.spreadsheet td:last-child{text-align:right}
.spreadsheet tbody tr:first-child td{text-align:left}
.sheet-selection{outline:2px solid #217346;outline-offset:-2px;background:#f0f8f2}
.sheet-tabs{background:#edf2ee;padding:1.4cqw 3cqw}
.sheet-tabs span{color:#185c37;border-bottom:2px solid #217346}
.demo-app{margin-top:5cqw;padding:3cqw;border:1px solid #c9d5e5;border-radius:3cqw;background:#fff;font-size:3.8cqw}
.demo-app h2{font-size:5.2cqw;margin:.5cqw 0 2cqw}
.demo-app .of-field,.demo-app .of-line-item,.demo-app .of-client-card,.demo-app .of-app-action,.demo-app .of-total,.demo-app .of-checklist,.demo-app .of-search{padding:1.4cqw 2cqw;font-size:3.4cqw;margin:1cqw 0}
.demo-app .of-line-item p{font-size:3.2cqw;margin:.5cqw 0}
.demo-app .of-app-hint,.demo-app .of-app-chip{font-size:2.8cqw;margin:1cqw 0}
.demo-app .of-field>b,.demo-app .of-line-item>b,.demo-app .of-line-item>div,.demo-app .of-total b{font-size:3.8cqw}
.invoice-demo.render main{display:block;padding:0}
.invoice-demo.render .stage{width:100vw;border-radius:0}
.invoice-demo.render .controls{display:none}
` : ''}
</style></head><body${invoiceDemo ? ' class="invoice-demo"' : ''}><main>
  <div class="stage"><img class="brand" src="logo.png" alt="JM2 Tech Studio">${frames}</div>
  <nav class="controls" aria-label="Controles del vídeo"><button id="play">Pausar</button><button id="restart">Reiniciar</button><a href="index.html#del-caos-al-control">Biblioteca</a></nav>
</main>${invoiceDemo ? '<script src="facturacion-oficios.js"></script>' : ''}<script>
const scenes = [...document.querySelectorAll('.scene')];
const play = document.getElementById('play');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const duration = ${duration};
const sceneLength = duration / scenes.length;
${invoiceDemo ? `const renderMode = new URLSearchParams(location.search).has('render');
document.body.classList.toggle('render', renderMode);` : ''}
let elapsed = 0;
let last = performance.now();
let playing = true;
let current = 0;
let animations = [];

function show(index) {
  scenes[current].hidden = true;
  current = index;
  const scene = scenes[current];
  scene.hidden = false;
${invoiceDemo ? '  if (renderMode) return;' : ''}
  if (motion.matches) return;
  animations = [...scene.querySelectorAll('h1, svg, li, .scene > p, .spreadsheet, .demo-app')].map((item, order) =>
    item.animate([{opacity: 0, translate: '0 16px'}, {opacity: 1, translate: '0 0'}],
      {duration: 380, delay: order * 220, easing: 'ease-out', fill: 'both'}));
}

function draw() {
    const index = Math.min(scenes.length - 1, Math.floor(elapsed / sceneLength));
    if (index !== current) show(index);
${invoiceDemo ? `    const demoRanges = [[12, 17], [21, 28], [30, 36.8]];
    if (index >= 1 && index <= demoRanges.length) {
      const [start, end] = demoRanges[index - 1];
      const progress = (elapsed % sceneLength) / sceneLength;
      window.jm2Navigation?.render(start + (end - start) * progress);
    }` : ''}
}

function tick(now) {
  if (playing) {
    elapsed = Math.min(duration, elapsed + now - last);
    draw();
    if (elapsed === duration) {
      playing = false;
      play.textContent = 'Reproducir';
    }
  }
  last = now;
  requestAnimationFrame(tick);
}

function restart() {
  elapsed = 0;
  last = performance.now();
  playing = true;
  play.textContent = 'Pausar';
  show(0);
}

play.addEventListener('click', () => {
  if (elapsed === duration) return restart();
  playing = !playing;
  last = performance.now();
  for (const animation of animations) playing ? animation.play() : animation.pause();
  play.textContent = playing ? 'Pausar' : 'Reanudar';
});
document.getElementById('restart').addEventListener('click', restart);
restart();
${invoiceDemo ? `if (renderMode) {
  window.invoiceVideo = {duration: duration / 1000, seek(time) {
    elapsed = Math.max(0, Math.min(duration, time * 1000));
    draw();
  }};
} else requestAnimationFrame(tick);` : 'requestAnimationFrame(tick);'}
</script></body></html>`;
}

if (require.main === module) {
  for (const video of videos) fs.writeFileSync(video.file, render(video));
}

module.exports = videos;
