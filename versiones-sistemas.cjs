// Diagramas, documentos e interfaces. Ninguna figura humana en estas versiones.
const {scripts}=require('./guiones-rrss.cjs');
const pill=(text,color='')=>`<span class="sys-pill ${color}">${text}</span>`;
const item=(label,value,at)=>`<div class="sys-row" ${at===undefined?'':`data-at="${at}"`}><span>${label}</span><b>${value}</b></div>`;
const panel=(title,body)=>`<div class="sys-panel"><div class="sys-toolbar"><i></i><i></i><i></i><b>${title}</b></div><div class="sys-content">${body}</div></div>`;
const file=(title,body,color='')=>`<div class="sys-file ${color}"><span class="sys-file-tab">▤ ${title}</span>${body}</div>`;
const down=label=>`<div class="sys-connector"><i></i><span>${label||'↓'}</span></div>`;
const ok=text=>`<div class="sys-ok">✓ ${text}</div>`;
const button=text=>`<div class="sys-button">${text}<span>→</span></div>`;
const phone=(title,body)=>`<div class="sys-phone"><div class="sys-notch"></div><div class="sys-phone-title">${title}</div><div class="sys-phone-body">${body}</div></div>`;
const chat=(text,cls='')=>`<div class="sys-chat ${cls}">${text}</div>`;
const csv=()=>file('MOVIMIENTOS.CSV',`${item('18 nov · Ana López','+435,60 €')}${item('19 nov · Materiales Norte','−121,00 €')}${item('20 nov · Cargo sin referencia','−85,00 €')}`);
const invoice=()=>file('FACTURA F-128',`<h2>Almacenes Litoral</h2><div class="sys-field" data-at=".1"><small>PROVEEDOR</small><b>Almacenes Litoral</b></div><div class="sys-field" data-at=".26"><small>FECHA</small><b>12/06/2024</b></div><div class="sys-field" data-at=".42"><small>BASE IMPONIBLE</small><b>840,00 €</b></div><div class="sys-field" data-at=".58"><small>IVA · 21 %</small><b>176,40 €</b></div><div class="sys-scanner"></div>`);
const invoiceResult=()=>panel('Registro de facturas',`${pill('EXTRACCIÓN COMPLETADA')}<div class="sys-spreadsheet"><div class="sheet-head"><b>Campo</b><b>Dato leído</b></div>${item('Proveedor','Almacenes Litoral',.08)}${item('Fecha','12/06/2024',.23)}${item('Base imponible','840,00 €',.38)}${item('IVA','176,40 €',.53)}</div>${ok('Datos preparados. Tú revisas.')}`);
const receipt=()=>file('FACTURA SIMPLIFICADA',`<h2>PAPELERÍA DEMO</h2><p class="sys-small">Comercio Ejemplo, S.L. · B00000000<br>Calle Ejemplo, 1 · Mérida<br>Serie T · 000128 · 14/11/2026</p>${item('2 × Cuaderno','6,00 €')}${item('1 × Bolígrafo','2,00 €')}${item('Base imponible','6,61 €')}${item('IVA 21 %','1,39 €')}<div class="sys-total"><span>TOTAL</span><b>8,00 €</b></div><p class="sys-small">IVA incluido · Ejemplo ilustrativo</p>`);
const appointment=()=>`<div class="sys-calendar"><div class="calendar-top">AGENDA · MIÉRCOLES</div><div class="calendar-hours"><span>09:00</span><div>Sesión completada ✓</div><span>10:00</span><div class="empty-slot">Ana López <b>No se ha presentado</b></div><span>11:00</span><div>Próxima sesión</div></div></div>`;
function firstDiagram(type){
 const diagrams={
  presupuestos:`<div class="sys-mini-quote">${pill('BORRADOR SIN ENVIAR','red')}<div>Presupuesto Ana López</div><strong>…</strong><span>Tarifa + medidas + cálculos</span></div>`,
  citas:appointment(),
  datos:`<div class="sys-mini-grid">${['CRM','PEDIDOS','FACTURAS'].map(t=>`<div><small>${t}</small><b>Ana López</b><span>Volver a escribir…</span></div>`).join('')}</div>`,
  informes:`<div class="sys-clock-card"><strong>18:42</strong><span>La tienda ya ha cerrado</span><div>Informe semanal <b>Sin terminar</b></div></div>`,
  documentos:`<div class="sys-folder-stack">${['Contrato_final.pdf','Contrato_final_2.pdf','Contrato_bueno.pdf'].map(t=>`<div>▤ ${t}<b>?</b></div>`).join('')}</div>`,
  pedidos:`<div class="sys-chat-preview">${chat('Ana: necesito <b>10 ramos</b>.')}${chat('¿A qué hora cerráis?','faded')}${chat('Te envío la foto…','faded')}</div>`,
  bocateria:`<div class="sys-call-card"><span class="sys-ring">☎</span><div><b>Otra llamada entrante</b><span>2 bocadillos · ¿sin cebolla?</span></div></div>`,
  tpv:`<div class="sys-ticket-wait"><span>▤</span><strong>Ticket pendiente</strong><div>6,00 € + 2,00 € = …</div></div>`,
  cobros:`<div class="sys-unpaid"><small>FACTURAS EMITIDAS</small><strong>780,00 €</strong><span>¿Qué parte sigue pendiente?</span></div>`,
  conciliacion:`<div class="sys-mini-match"><div><small>BANCO</small><b>+435,60 €</b></div><span>?</span><div><small>FACTURAS</small><b>F-128 · F-129</b></div></div>`,
  facturas:`<div class="sys-pdf-stack"><div>PDF</div><div>PDF</div><div>PDF</div><strong>Copiar otra vez…</strong></div>`,
  presentacion:`<div class="sys-pdf-stack"><div>PDF</div><div>PDF</div><div>PDF</div><strong>Correo → registro manual</strong></div>`
 };
 return diagrams[type];
}
function visualHook(type){const s=scripts[type];return `<div class="sys-hook"><span>${s.trigger}</span><h1>${s.hook}</h1><div class="sys-hook-art">${firstDiagram(type)}</div></div>`;}
function shots(type){
 const data={
 presupuestos:[
 panel('Antes · Preparación manual',`${file('TARIFAS',item('Servicio A','120 €'))}${down('Buscar medidas')}${file('NOTAS DEL CLIENTE',item('Cantidad','3 unidades'))}${down('Calcular y redactar')}${pill('PRESUPUESTO AÚN SIN ENVIAR','red')}`),
 `<div class="sys-flow">${panel('Tus datos, conectados',`${item('Servicio A','120 €',.05)}${item('Cantidad','3',.2)}${item('Condiciones','Tus tarifas',.35)}`)}${down('Generar presupuesto')}<div data-at=".5">${panel('Borrador preparado',`${item('Base / IVA','360 € / 75,60 €')}<div class="sys-total"><span>TOTAL</span><b>435,60 €</b></div>`)}</div></div>`,
 panel('Revisión → Envío',`${pill('PRESUPUESTO · ANA LÓPEZ')}<h2>435,60 €</h2>${item('Precios y condiciones','Revisados',.1)}${button('Enviar PDF al cliente')}<div data-at=".55">${ok('Presupuesto enviado')}<div class="sys-attachment">▤ Presupuesto_Ana.pdf</div></div>`)],
 citas:[appointment(),
 `<div class="sys-flow">${panel('Recordatorios de citas',`${item('Próxima sesión','Mañana · 10:00')}${item('Cliente','Ana López')}${item('Aviso automático','El día anterior',.15)}`)}${down('Enviar aviso')}<div data-at=".4">${chat('Hola, Ana. Tu sesión es mañana a las <b>10:00</b>. ¿Puedes confirmar?')}</div></div>`,
 phone('Confirmación de cita',`${chat('Tu próxima sesión: mañana a las 10:00.','faded')}<div data-at=".15">${chat('Sí, allí estaré. ¡Gracias!','reply')}</div><div class="sys-confirmed" data-at=".5"><small>AGENDA ACTUALIZADA</small><strong>10:00 · Ana López</strong><b>✓ Confirmada</b></div>`) ],
 datos:[`<div class="sys-repeat">${['CRM','Pedidos','Facturación'].map((t,i)=>`<div class="sys-repeat-card" data-at="${i*.18}"><small>${t}</small><div>Ana López<span>|</span></div><b>Entrada manual ${i+1} de 3</b></div>`).join('')}</div>`,
 `<div class="sys-flow">${panel('Una sola entrada',`<div class="sys-field"><small>CLIENTE</small><b>Ana López</b></div>${item('Pedido','P-2048')}`)}${down('Compartir información')}<div class="sys-destinations">${['CRM','Pedidos','Facturación'].map((t,i)=>`<div data-at="${.25+i*.16}"><b>${t}</b><span>Ana López</span><em>↓ Recibiendo</em></div>`).join('')}</div></div>`,
 panel('Información sincronizada',`${pill('ANA LÓPEZ · P-2048')}${item('CRM','✓ Actualizado',.08)}${item('Pedidos','✓ Actualizado',.26)}${item('Facturación','✓ Actualizada',.44)}${ok('Sin volver a introducir el mismo dato')}`)],
 informes:[`<div class="sys-flow">${file('VENTAS.XLSX',item('Ventas','2.400 €'))}${down('Copiar y pegar')}${file('GASTOS.XLSX',item('Gastos','1.100 €'))}${down('Comprobar cifras')}${pill('EL INFORME SIGUE SIN TERMINAR','red')}</div>`,
 `<div class="sys-flow"><div class="sys-source-pair">${file('VENTAS',`<strong>2.400 €</strong>`)}${file('GASTOS',`<strong>1.100 €</strong>`)}</div>${down('Alimentar tu informe')}<div data-at=".3">${panel('Resumen semanal',`${item('Ventas','2.400 €',.4)}${item('Gastos','1.100 €',.55)}${item('Diferencia','1.300 €',.7)}`)}</div></div>`,
 panel('Informe preparado para revisar',`<div class="sys-bars">${[.45,.6,.55,.8,1].map(n=>`<i style="--height:${n}"></i>`).join('')}</div>${item('Ventas de la semana','2.400 €')}${item('Gastos','1.100 €')}${ok('Fuentes reunidas. Tú tomas las decisiones.')}`)],
 documentos:[panel('Antes · Buscar entre versiones',`<div class="sys-file-tree"><div>▱ Correos</div><div>└ ▤ Contrato_final.pdf</div><div>▱ Descargas</div><div>└ ▤ Contrato_final_2.pdf</div><div>▱ Clientes</div><div>└ ▤ Contrato_bueno.pdf</div></div>${pill('¿CUÁL ES EL CORRECTO?','red')}`),
 panel('Buscador para tus documentos',`<span class="sys-label">CLIENTE O CONTENIDO</span><div class="sys-search">⌕ Contrato de Ana López<span>|</span></div><div class="sys-search-sources">${['Correos','Carpetas','Archivo'].map((t,i)=>`<div data-at="${.15+i*.18}">✓ ${t}</div>`).join('')}</div><div data-at=".65">${ok('Coincidencia encontrada')}</div>`),
 panel('Documento localizado',`${pill('COINCIDENCIA ENCONTRADA')}${file('CONTRATO_ANA.PDF',`${item('Cliente','Ana López')}${item('Fecha','12/06/2024')}${item('Carpeta','Clientes / Contratos')}`)}${button('Revisar y compartir')}`)],
 pedidos:[phone('Pedido perdido entre mensajes',`${chat('Ana: necesito <b>10 ramos</b>.')}<div data-at=".12">${chat('¿A qué hora cerráis?','faded')}</div><div data-at=".28">${chat('Te envío la foto.','faded')}</div><div data-at=".45">${chat('¿Tenéis otra variedad?','faded')}</div>${pill('ENCARGO SIN REGISTRAR','red')}`),
 `<div class="sys-flow">${chat('Ana: necesito <b>10 ramos</b> para el evento.')}${down('Extraer los datos del encargo')}<div data-at=".2">${panel('Borrador de pedido',`${item('Cliente','Ana',.25)}${item('Producto','Ramos',.42)}${item('Cantidad','10',.6)}`)}</div></div>`,
 panel('Registro de encargos',`${pill('PENDIENTE DE TU REVISIÓN')}${item('Cliente','Ana')}${item('Producto / Cantidad','10 ramos')}${button('Confirmar encargo')}<div data-at=".55">${ok('Confirmado · A preparar los ramos')}</div>`)],
 bocateria:[phone('Llamada en curso',`<div class="sys-audio-wave"><i></i><i></i><i></i><i></i><i></i></div>${chat('Dos de pollo. Uno sin cebolla…')}<div class="sys-scribble">2 pollo / 1 sin… / ¿hora?</div>${pill('ESCUCHAR · APUNTAR · COCINAR','red')}`),
 phone('Tu bocatería · Pedidos web',`<div class="sys-food"><svg viewBox="0 0 260 130" role="img" aria-label="Bocadillo"><path d="M25 62Q20 12 84 12H180Q240 12 238 62Z" fill="#e8b56b"/><path d="M30 72H230" stroke="#76a878" stroke-width="17"/><path d="M30 92H230" stroke="#c46c4e" stroke-width="16"/><path d="M25 100H239Q235 126 200 126H60Q30 126 25 100Z" fill="#e8b56b"/></svg></div><h2>Bocadillo de pollo</h2>${item('Cantidad','−  2  +')}${item('Ingredientes','1 sin cebolla',.12)}${item('Recogida','21:00',.28)}${button('Enviar pedido por WhatsApp')}`),
 phone('<img class="sys-wa" src="whatsapp.svg" alt="WhatsApp"> WhatsApp · Tienda',`${chat('<small>DESDE TU WEB DE PEDIDOS</small><h2>Hola, soy Ana.</h2><p><b>2 bocadillos de pollo</b><br>Uno sin cebolla.<br>Recogida: <b>21:00</b>.</p>')}<div data-at=".45">${ok('Pedido recibido. Listo para preparar.')}</div>`) ],
 tpv:[panel('TPV · Nueva venta',`<div class="sys-products"><div><span>▤</span><b>Cuaderno</b><small>3,00 €</small></div><div><span>╱</span><b>Bolígrafo</b><small>2,00 €</small></div></div>${item('2 × Cuaderno','6,00 €',.1)}${item('1 × Bolígrafo','2,00 €',.35)}<div class="sys-total" data-at=".6"><span>TOTAL</span><b>8,00 €</b></div><i class="sys-tap"></i>`),
 `<div class="sys-flow"><div class="sys-service-options"><span>✓ Tus productos</span><span>✓ Tus precios</span><span>✓ Tu impresora</span></div>${receipt()}</div>`,
 `<div class="sys-printing"><div class="sys-print-window"><div class="sys-print-paper">${receipt()}</div></div><div class="sys-printer"><i></i><strong>IMPRESORA TÉRMICA</strong><span></span></div></div>`],
 cobros:[panel('Facturas pendientes de cobro',`<div class="sys-money"><small>PENDIENTE</small><strong>780,00 €</strong></div>${item('Ana · F-128','180 € · Vencida')}${item('Luis · F-129','240 € · Hoy')}${item('Marta · F-130','360 € · Próxima')}`),
 `<div class="sys-due-flow">${[['14 NOV','180 € · Ana','Vencido','red'],['16 NOV · HOY','240 € · Luis','Revisa el cobro','amber'],['20 NOV','360 € · Marta','Prepara el aviso','']].map((v,i)=>`<div data-at="${i*.18}"><strong>${v[0]}</strong><b>${v[1]}</b>${pill(v[2],v[3])}</div>`).join('')}</div>`,
 phone('Recordatorio de pago · Marta',`${chat('Hola, Marta.<br>La factura <b>F-130</b>, de <b>360 €</b>, vence el <b>20 de noviembre</b>.<br>Si ya has pagado, gracias. Si necesitas ayuda, escríbenos.')}<div data-at=".35">${ok('Recordatorio enviado')}</div><div class="sys-pending" data-at=".6">El cobro sigue pendiente hasta confirmar el pago.</div>`) ],
 conciliacion:[`<div class="sys-flow">${csv()}${down('Buscar a qué factura corresponde')}${file('FACTURAS',`${item('F-128 · Ana López','435,60 €')}${item('P-204 · Materiales Norte','121,00 €')}`)}</div>`,
 panel('Importar los archivos de tu negocio',`<div class="sys-import">▤ <div><b>Movimientos del banco</b><small>movimientos.csv</small></div><em data-at=".12">✓</em></div><div class="sys-import" data-at=".2">▤ <div><b>Facturas de clientes y proveedores</b><small>facturas.xlsx</small></div><em data-at=".35">✓</em></div>${down('Comparar importe y referencia')}<div data-at=".6">${ok('Importación completada')}</div>`),
 `<div class="sys-match-flow">${pill('PROPUESTA · SIN CONFIRMAR','amber')}${file('MOVIMIENTO BANCARIO',`${item('Ana López','+435,60 €')}${item('Referencia','F-128')}`)}${down('Importe y referencia coinciden')}<div data-at=".25">${file('FACTURA DE CLIENTE',`${item('F-128 · Ana López','435,60 €')}`)}</div><div class="sys-pending" data-at=".55">Tú revisas antes de confirmar.</div></div>`,
 panel('Revisión de conciliaciones',`${item('F-128 · +435,60 €','✓ Confirmada',.1)}${item('P-204 · −121,00 €','✓ Confirmada',.3)}<div class="sys-pending" data-at=".5"><b>−85,00 € · Sin coincidencia clara</b><p>Pendiente de revisar. No se asigna a una factura.</p></div>`) ],
 facturas:[`<div class="sys-flow">${file('FACTURA.PDF',`${item('Proveedor','Almacenes Litoral')}${item('Base / IVA','840 € / 176,40 €')}`)}${down('Copiar a mano')}<div class="sys-empty-sheet"><span>Proveedor</span><span>Fecha</span><span>Base / IVA</span><b>…</b></div></div>`,invoice(),invoiceResult()],
 presentacion:[panel('Bandeja de entrada · Facturas',`${['Almacenes Litoral','Norte Suministros','Transportes Ibáñez'].map((t,i)=>`<div class="sys-inbox-row" data-at="${i*.15}"><b>${t}</b><span>▤ PDF</span></div>`).join('')}${pill('+17 FACTURAS POR PASAR AL REGISTRO','red')}`),invoice(),invoiceResult()]
 };
 return [visualHook(type),...data[type]];
}
const captions={
 presupuestos:['','','En JM2 conectamos tus tarifas y medidas para preparar presupuestos.','Revisas el importe y envías el PDF al cliente.'],
 citas:['','','JM2 conecta tu agenda con los avisos de cita.','La respuesta del paciente actualiza la confirmación.'],
 datos:['','','JM2 conecta tus programas con una sola entrada de datos.','La información llega a cada herramienta. Sin teclearla de nuevo.'],
 informes:['','','JM2 reúne tus fuentes en un informe a medida.','Datos reunidos y gráficos listos. Tú revisas y decides.'],
 documentos:['','','JM2 monta un buscador sobre tus documentos.','Localizas el archivo correcto y lo tienes listo para compartir.'],
 pedidos:['','','JM2 convierte los mensajes de pedido en borradores para revisar.','Confirmas los datos y el encargo queda registrado.'],
 bocateria:['','','JM2 monta tu carta web con cantidades, ingredientes y recogida.','El pedido viaja desde la web al WhatsApp de tu tienda.'],
 tpv:['','','JM2 configura tus productos, precios e impresión de tickets.','La impresora saca la factura simplificada. Sigues atendiendo.'],
 cobros:['','','JM2 organiza los vencimientos y los avisos a tus clientes.','El aviso se registra. El pago se confirma cuando se recibe.'],
 conciliacion:['','','JM2 importa movimientos y facturas para compararlos.','Propone coincidencias por importe y referencia. Tú revisas.','Confirmas las correctas. Las demás siguen pendientes.'],
 facturas:['','','JM2 extrae los datos de tus facturas.','Los campos pasan al registro, preparados para revisar.'],
 presentacion:['','','JM2 convierte el PDF en datos para tu negocio.','El registro se completa. Tú compruebas el resultado.']
};
function systemStory(type,original){const copy=[...original.copy];for(let i=2;i<copy.length;i++)copy[i]=captions[type][i];return {...original,file:original.file.replace('.html','-sistema.html'),shots:shots(type),copy,variant:'sistema',originalFile:original.file};}
module.exports={systemStory};
