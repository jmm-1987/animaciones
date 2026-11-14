(()=>{
const stage=document.querySelector('#stage');if(!stage)return;
stage.classList.add('single-focus');
const title=document.createElement('div');title.className='focus-title';title.setAttribute('aria-hidden','true');stage.append(title);
const name=location.pathname.split('/').pop();
const messages={
 'video-presupuestos.html':['Tu cliente espera.','Las tarifas, dispersas.','Reúne los datos.','Revisa y envía.'],
 'video-citas.html':['La camilla, vacía.','El paciente no llega.','Un aviso a tiempo.','La cita, confirmada.'],
 'video-datos.html':['El mismo dato, otra vez.','Tres sistemas separados.','Escríbelo una sola vez.','Todos actualizados.'],
 'video-informes.html':['Viernes. Falta el informe.','Cifras por todas partes.','Reúne tus datos.','Listo para decidir.'],
 'video-documentos.html':['¿Dónde está el contrato?','Demasiadas versiones.','Una sola búsqueda.','El documento correcto.'],
 'video-pedidos.html':['Un pedido por mensaje.','Se pierde entre chats.','Detecta los datos.','Revisa y confirma.'],
 'video-bocateria.html':['El teléfono no para.','Anotar mientras cocinas.','Tu cliente pide en la web.','Llega a tu WhatsApp.'],
 'video-tpv.html':['La cola crece.','Añade los productos.','Genera el ticket.','Imprime y entrega.'],
 'video-cobros.html':['¿Qué queda por cobrar?','Todos los cobros a la vista.','Controla los vencimientos.','Recuerda el pago.'],
 'index-comic.html':['Otra mañana de facturas.','Copiar, una y otra vez.','Lee los datos del PDF.','Revisa el resultado.'],
 'presentacion.html':['Llegan más facturas.','Copiar lleva tiempo.','La factura se lee sola.','Los datos, listos para revisar.']
};
const labels=messages[name]||messages['presentacion.html'];
const seek=document.querySelector('#seek');const voiced=!seek||Number(seek.max)<20;
const marks=voiced?[0,2.5,6.1,9.2,12.9,17.91]:[0,4,9,14,19,25];
const progress=document.querySelector('#progress');
function update(){
 let elapsed=seek?Number(seek.value):Number(progress?.getAttribute('aria-valuenow')||0)/100*17.91;
 let phase=0;while(phase<4&&elapsed>=marks[phase+1])phase++;
 const since=elapsed-marks[phase];
 title.textContent=phase<4?labels[phase]:'';
 stage.classList.toggle('focus-intro',phase<4&&since<.85);
 stage.classList.toggle('focus-closing',phase===4);
 stage.classList.toggle('focus-contact',phase===4&&since>=1.3);
 requestAnimationFrame(update);
}
update();
})();
