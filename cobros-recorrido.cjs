function button(){
 return `<div class="co-query-button"><span class="co-query-button-icon">€</span><b>Obtener pendientes de cobro</b><span class="co-query-button-arrow">→</span></div>`;
}

function invoiceList(){
 const invoices=[
  ['F-031','Reparación de tubería','12/11/2026','480 €','Vencida','co-query-overdue'],
  ['F-032','Instalación de termo','03/12/2026','320 €','En plazo','co-query-current'],
  ['F-033','Revisión anual','12/12/2026','240 €','En plazo','co-query-current']
 ];
 return `<div class="co-query-results"><div class="co-query-results-head"><span>FACTURA Y TRABAJO</span><span>VENCIMIENTO</span><span>IMPORTE</span></div>${invoices.map((row,i)=>`<div class="co-query-row ${row[5]}" data-at="${.12+i*.19}"><div><b>${row[0]}</b><span>${row[1]}</span></div><div><b>${row[2]}</b><span class="co-query-badge">${row[4]}</span></div><strong>${row[3]}</strong></div>`).join('')}<div class="co-query-grand-total" data-at=".72"><span>TOTAL PENDIENTE</span><strong>1.040 €</strong></div></div>`;
}

function shots(){
 const opening=`<div class="nv-scene co-scene co-query-scene"><span class="mp-kicker">CONTROL DE COBROS</span><h1>¿Qué te queda<br><em>por cobrar?</em></h1><div class="co-query-panel"><div class="co-query-toolbar"><span>● ● ●</span><b>Panel de tu negocio</b></div><div class="co-query-panel-body"><span>FACTURAS</span><h2>Consulta tus pendientes</h2>${button()}<p>Importes y vencimientos en una sola vista</p></div></div><p class="nv-example">Ejemplo ilustrativo · Consulta tus facturas pendientes.</p></div>`;
 const click=`<div class="nv-scene co-scene co-query-scene"><span class="mp-kicker">UNA CONSULTA SENCILLA</span><h1>Pulsas el botón.<br><em>Y aparece la lista.</em></h1><div class="co-query-click-panel"><span>CONSULTA DE FACTURAS</span>${button()}<div class="co-query-pointer" data-at=".35" aria-hidden="true">↖</div><div class="co-query-loaded" data-at=".6"><span>✓</span> Pendientes encontrados</div></div><p class="nv-example">Ejemplo ilustrativo · La lista reúne importes y fechas de vencimiento.</p></div>`;
 const results=`<div class="nv-scene co-scene co-query-scene"><span class="mp-kicker">EL LISTADO DE PENDIENTES</span><h1>Tus facturas,<br><em>en un listado.</em></h1>${invoiceList()}<p class="nv-example">Ejemplo ilustrativo · 480 € + 320 € + 240 € = 1.040 € pendientes.</p></div>`;
 const due=`<div class="nv-scene co-scene co-query-scene"><span class="mp-kicker">IMPORTE TOTAL Y VENCIMIENTOS</span><h1>Lo vencido.<br><em>Y lo que viene.</em></h1><div class="co-query-summary"><div class="co-query-summary-total" data-at="0"><span>TOTAL PENDIENTE</span><strong>1.040 €</strong></div><div class="co-query-summary-card co-query-summary-overdue" data-at=".25"><span>VENCIDA · F-031</span><b>480 €</b><small>Vencimiento · 12/11/2026</small></div><div class="co-query-summary-card co-query-summary-current" data-at=".48"><span>PRÓXIMOS VENCIMIENTOS</span><b>560 €</b><small>320 € · 03/12/2026<br>240 € · 12/12/2026</small></div></div><p class="nv-example">Datos ficticios de ejemplo · El listado te ayuda a decidir qué revisar primero.</p></div>`;
 return [opening,click,results,due];
}

module.exports={shots};
