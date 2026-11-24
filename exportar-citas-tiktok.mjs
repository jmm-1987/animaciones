import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {mkdtemp, readFile, rm, rename} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {dirname, join, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {setTimeout as delay} from 'node:timers/promises';

const chrome = process.argv[2] ?? 'chrome';
const invoice = process.argv.includes('--factura');
const input = invoice ? 'video-factura-automatica.html' : 'citas.html';
const filename = invoice ? 'video-factura-automatica.mp4' : 'citas-tiktok.mp4';
const player = invoice ? 'invoiceVideo' : 'citasTikTok';
const tempRoot = resolve(tmpdir());
const profile = await mkdtemp(join(tempRoot, 'jm2-citas-'));
const browser = spawn(chrome, ['--headless', '--disable-gpu', '--no-first-run',
  '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank'],
  {windowsHide: true, stdio: ['ignore', 'ignore', 'inherit']});
let socket, encoder;
const output = resolve(filename);
const temporaryOutput = join(profile, filename);

try {
  let address;
  for (let attempt = 0; attempt < 100 && !address; attempt++) {
    const ports = await readFile(join(profile, 'DevToolsActivePort'), 'utf8').catch(() => '');
    if (ports) address = 'http://127.0.0.1:' + ports.split(/\r?\n/)[0];
    else await delay(100);
  }
  if (!address) throw new Error('Chrome no inició la sesión de renderizado.');
  const pages = await (await fetch(address + '/json/list')).json();
  socket = new WebSocket(pages.find(page => page.type === 'page').webSocketDebuggerUrl);
  await new Promise((ok, fail) => {
    socket.addEventListener('open', ok, {once: true});
    socket.addEventListener('error', fail, {once: true});
  });

  const pending = new Map();
  let id = 0;
  socket.addEventListener('close', ({code, reason}) => {
    for (const request of pending.values()) {
      request.reject(new Error('Chrome cerró la conexión (' + code + '): ' + reason));
    }
    pending.clear();
  });
  socket.addEventListener('message', ({data}) => {
    const reply = JSON.parse(data);
    const request = pending.get(reply.id);
    if (!request) return;
    pending.delete(reply.id);
    if (reply.error) request.reject(new Error(reply.error.message));
    else request.resolve(reply.result);
  });
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    pending.set(++id, {resolve, reject});
    socket.send(JSON.stringify({id, method, params}));
  });
  async function evaluate(expression) {
    const result = await call('Runtime.evaluate', {expression, returnByValue: true});
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
    return result.result.value;
  }
  await call('Emulation.setDeviceMetricsOverride', {
    width: 405, height: 720, deviceScaleFactor: 8 / 3, mobile: false
  });
  const navigation = await call('Page.navigate', {url: String(pathToFileURL(resolve(input))) + '?render=tiktok'});
  if (navigation.errorText) throw new Error(navigation.errorText);
  let duration;
  for (let attempt = 0; attempt < 100 && !duration; attempt++) {
    duration = await evaluate('document.fonts.status === "loaded" && window.' + player + '?.duration');
    if (!duration) await delay(100);
  }
  if (!duration) throw new Error('No se ha cargado la animación de ' + input);
  const reviewTimes = invoice ? [2, 7.8, 11.8, 15.8, 19] : [2.8, 6, 9.8, 15.3, 19.3, 22.8, 26.8];
  for (const time of reviewTimes) {
    const overflow = await evaluate(`(() => {
      ${player}.seek(${time});
      const scene = ${invoice ? "document.querySelector('.scene:not([hidden])')" :
        "[...document.querySelectorAll('.scene')].findLast(node => node.style.visibility === 'visible')"};
      if (${invoice} && scene.querySelector('.demo-app:empty')) throw new Error('La demostración de factura está vacía');
      return [...scene.querySelectorAll('h1,h2,.card,.phone,.toast,.inc,.end,.cost-row,.demo-app,.spreadsheet')]
        .filter(node => node.getBoundingClientRect().bottom > ${invoice ? 690 : 600} || node.getBoundingClientRect().top < 65)
        .map(node => {
          const box = node.getBoundingClientRect();
          return node.className + ' [' + Math.round(box.top) + ', ' + Math.round(box.bottom) + ']';
        });
    })()`);
    if (overflow.length) throw new Error('Contenido fuera de la zona segura: ' + overflow.join(', '));
  }
  const fps = 24;
  encoder = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe',
    '-framerate', String(fps), '-i', 'pipe:0', '-an', '-vf', 'scale=1080:1920,setsar=1',
    '-c:v', 'libx264', '-preset', 'fast', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', temporaryOutput], {windowsHide: true, stdio: ['pipe', 'ignore', 'inherit']});
  const encoded = once(encoder, 'close');
  encoded.catch(() => {});
  for (let frame = 0; frame < duration * fps; frame++) {
    await evaluate(player + '.seek(' + frame / fps + ')');
    const shot = await call('Page.captureScreenshot', {format: 'jpeg', quality: 94});
    if (!encoder.stdin.write(Buffer.from(shot.data, 'base64'))) await once(encoder.stdin, 'drain');
  }
  encoder.stdin.end();
  const [code] = await encoded;
  if (code !== 0) throw new Error('FFmpeg terminó con código ' + code);
  await rename(temporaryOutput, output);
  console.log(filename + ' · ' + duration + ' s · 1080 × 1920');
} finally {
  socket?.close();
  if (encoder && encoder.exitCode === null) encoder.kill();
  browser.kill();
  if (dirname(resolve(profile)) === tempRoot) {
    await rm(profile, {recursive: true, force: true, maxRetries: 6, retryDelay: 250});
  }
}
