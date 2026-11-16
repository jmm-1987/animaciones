const paths={
 cliente:'<circle cx="60" cy="39" r="20"/><path d="M22 105V94a38 38 0 0 1 76 0v11Z"/>',
 trabajo:'<path d="m29 94 46-46a27 27 0 0 0 31-35L88 31 73 16A27 27 0 0 0 65 54L19 84a9 9 0 0 0 10 10Z"/>',
 materiales:'<path d="M30 15v30h30v30h30v30M15 15h30M15 45h30M75 90h30M75 110h30"/>',
 precios:'<rect x="25" y="12" width="70" height="96" rx="12"/><path d="M40 30h40M40 50h40M40 72h10m20 0h10M40 91h10m20 0h10"/>',
 revisar:'<path d="M25 15h70v90H25Z M40 40l8 8 15-17M40 75l8 8 15-17M73 44h10M73 79h10"/>',
 emitir:'<path d="M30 12h43l22 22v74H30Z M73 12v25h22M43 64l12 12 26-27M44 93h36"/>',
 enviar:'<path d="m12 52 95-36-30 94-20-37-45-21Z M57 73l50-57"/>'
};
const icon=(name)=>`<svg viewBox="0 0 120 120" aria-hidden="true">${paths[name]}</svg>`;
const rail=(labels,active)=>`<div class="fp-rail">${labels.map((label,i)=>`<div class="${i===active?'current':i<active?'done':''}"><span>${i<active?'✓':String(i+1).padStart(2,'0')}</span><b>${label}</b></div>`).join('')}</div>`;
const panels=(labels,items)=>items.map((item,i)=>`<div data-step class="fp-step">${rail(labels,i)}${item}</div>`).join('');
function setup(e){
 const visuals=[['cliente','Cliente guardado','Datos de contacto','Listo para la próxima visita'],['trabajo','Tus servicios','Reparación de grifo','Mano de obra y materiales'],['precios','Tus precios','Conceptos habituales','Sin volver a escribirlos']];
 return `<div class="nv-scene fp-scene"><span class="mp-kicker">LO QUE YA TIENES</span><h1>${e.setupTitle}</h1>${panels(['Cliente','Servicios','Precios'],visuals.map(v=>`<div class="fp-saved">${icon(v[0])}<span class="fp-tag">GUARDADO ✓</span><h2>${v[1]}</h2><div class="fp-saved-detail"><b>${v[2]}</b><p>${v[3]}</p></div></div>`))}<p class="nv-example">Una herramienta con tus servicios y tu forma de facturar.</p></div>`;
}
function demo(e,phone){
 const entries=[['cliente','Cliente','Cliente de ejemplo'],['trabajo','Trabajo','Reparación de grifo'],['materiales','Materiales','Juntas y latiguillo']];
 return `<div class="nv-scene fp-scene fp-demo"><span class="mp-kicker">DESDE EL MÓVIL</span><h1>${e.demoTitle}</h1>${panels(['Eliges','Añades','Preparada'],entries.map((v,i)=>`<div class="fp-focus">${icon(v[0])}<span>PASO 0${i+1}</span><b>${['Eliges el cliente','Añades el trabajo','Añades los materiales'][i]}</b></div>${phone('Nueva factura',`<span class="nv-chip">${i===2?'LISTA PARA REVISAR':'BORRADOR'}</span><h2>Reparación de grifo</h2>${entries.map((entry,j)=>`<div class="fp-field ${j===i?'selected':j<i?'complete':'pending'}"><span>${entry[1]}</span><b>${j<=i?entry[2]:'Por añadir'}</b><i>${j<=i?'✓':'＋'}</i></div>`).join('')}<div class="nv-inline-note">Tus conceptos y precios guardados.</div>`,i===2?'Revisar factura':'Continuar')}`))}<p class="nv-example">Ejemplo ilustrativo · Herramienta adaptada a tu negocio.</p></div>`;
}
function result(e,delivery){
 const cards=[`<div class="fp-paper"><span>REVISIÓN FINAL</span><h2>Todo en orden.</h2>${['Datos del cliente','Trabajo y materiales','Importes e impuestos'].map(t=>`<div><b>${t}</b><i>✓</i></div>`).join('')}<p>Tú compruebas cada detalle.</p></div>`,`<div class="fp-issued">${icon('emitir')}<span>FACTURA EMITIDA</span><h2>Lista para<br>el cliente.</h2><div class="fp-stamp">✓ Emitida</div></div>`,`<div class="fp-send">${icon('enviar')}<h2>Se la haces llegar.</h2>${delivery}<p>También puedes imprimirla.</p></div>`];
 return `<div class="nv-scene fp-scene fp-result"><span class="mp-kicker">EL CONTROL SIGUE SIENDO TUYO</span><h1>${e.resultTitle}</h1>${panels(['Revisas','Emites','Envías'],cards)}<p class="nv-example">${e.benefit}</p></div>`;
}
module.exports={setup,demo,result,icon,panels};
