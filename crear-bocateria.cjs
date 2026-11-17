const fs=require('fs');
const {createVideo}=require('./plantilla-video.cjs');
const titles=['Tu bocatería. Pedidos desde el móvil.','Elige bocadillos, raciones y bebidas.','Revisa cantidades y total.','¿Recogida o a domicilio?','El pedido, preparado para WhatsApp.','Tu carta. Tu bocatería.'];
const narration=['Así podrían hacer los pedidos en tu bocatería, desde el móvil.','El cliente consulta tu carta, ve los precios y añade bocadillos, raciones y bebidas.','Puede cambiar las cantidades y revisar el total antes de continuar.','Elige recogida, con hora o lo antes posible, o entrega a domicilio. Añade sus datos y las notas del pedido.','La web prepara el mensaje con los productos, el total y los datos. El cliente lo envía por WhatsApp y tú lo recibes.','Adaptado a tu bocatería. Cincuenta euros de desarrollo inicial y diez euros al mes. ¿Lo vemos con tu carta?'];
const captions=['Una carta online para tu negocio.','Categorías, productos y precios a mano.','El pedido se actualiza al instante.','Datos de contacto, hora o dirección y notas.','El cliente completa el envío en WhatsApp.','Escríbeme por aquí y lo vemos.'];
const shots=titles.slice(0,5).map((t,i)=>`<div class="bc-scene"><span class="bc-kicker">PARA BOCATERÍAS · DEMOSTRACIÓN</span><h1>${t}</h1><div class="bc-phone"><iframe title="Demostración de ${t}" src="demo-bocateria/bocateria.html?demo=${i}"></iframe></div><p>${captions[i]}</p></div>`);
const ending=`<section class="story-scene bc-ending" data-scene="5"><span class="bc-kicker">CARTA ONLINE · PEDIDOS POR WHATSAPP</span><h1>Tu carta.<br>Tu bocatería.</h1><div class="bc-price"><strong>10 €<small>/mes</small></strong><span>+ 50 € de desarrollo inicial</span></div><p>¿Lo vemos con tu carta?<br>Escríbeme por aquí.</p><img src="logo.png" alt="JM2 Tech Studio"></section>`;
const message='Hola, te comparto esta demo para que veas cómo podrían pedir tus clientes: eligen en tu carta, revisan el pedido y lo envían por WhatsApp. Son 50 € de desarrollo inicial y 10 € al mes. ¿Lo vemos con vuestra carta?';
createVideo({file:'video-bocateria.html',title:'Tu bocatería. Pedidos por WhatsApp.',stylesheet:'bocateria-video.css',copy:titles,shots,narration,publications:{instagram:message,tiktok:message},timing:{duration:56,marks:[0,6,14,21,32,45,56]}},ending);
fs.writeFileSync('video-bocateria.html',fs.readFileSync('video-bocateria.html','utf8').replace('<div class="video-top">','<div class="video-top"><a href="video-bocateria.mp4" download>Descargar vídeo MP4 · sin voz</a>'));
let demo=fs.readFileSync('demo-bocateria/bocateria.html','utf8').replace('<script src="clarity-consent.js" defer></script>','');
if(!demo.includes('DEMO_VIDEO'))demo=demo.replace('</body>',`<script>
// DEMO_VIDEO: datos ilustrativos y simulación local; no envía mensajes.
document.documentElement.dataset.theme='light';
const step=Number(new URLSearchParams(location.search).get('demo')||0);
if(step>=1){chg(0,1);chg(12,2);}
if(step>=2){openCart();$('name').value='Cliente de ejemplo';$('phone').value='600 000 000';$('pickupTime').value='21:00';$('note').value='Sin salsa en el bocadillo';}
if(step===3){setFulfillment('delivery');$('street').value='Calle de ejemplo';$('streetNumber').value='12, 1.º A';$('town').value='Tu localidad';}
window.open=(url)=>{const text=new URL(url).searchParams.get('text');document.body.innerHTML='<div style="padding:24px;background:#e9f5ec;min-height:100vh"><p style="font-size:13px">VISTA ILUSTRATIVA · MENSAJE PREPARADO</p><h2>WhatsApp de tu bocatería</h2><pre style="font:16px/1.65 system-ui;white-space:pre-wrap;background:white;border-radius:18px;padding:20px"></pre><p>El cliente pulsa enviar en WhatsApp.</p></div>';document.querySelector('pre').textContent=text;};
if(step===4)send();
document.addEventListener('click',e=>e.preventDefault(),true);
</script></body>`);
fs.writeFileSync('demo-bocateria/bocateria.html',demo);
fs.writeFileSync('guiones/video-bocateria-dm.txt',message+'\n');
console.log('Vídeo de bocatería y guiones creados.');
