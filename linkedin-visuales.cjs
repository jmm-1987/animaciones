const ink='#182232',blue='#1557f5',mint='#d8f3e4',orange='#ffcf94',pale='#edf3ff';
const text=(x,y,t,size=28,color=ink,weight=650)=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${t}</text>`;
function symbol(type,x,y){
 const shapes={pdf:`<path d="M-44-58h57l32 32v83h-89Z" fill="white" stroke="${blue}" stroke-width="5"/><path d="M13-58v32h32" fill="${pale}" stroke="${blue}" stroke-width="5"/>${text(0,20,'PDF',29,blue)}`,
 sheet:`<rect x="-57" y="-53" width="114" height="106" rx="12" fill="white" stroke="${blue}" stroke-width="5"/><path d="M-57-15H57M-57 18H57M-18-15V53M19-15V53" stroke="#bacdf6" stroke-width="4"/>`,
 person:`<circle cy="-25" r="27" fill="${blue}"/><path d="M-48 58v-12a48 48 0 0 1 96 0v12" fill="${blue}"/>`,
 check:`<circle r="57" fill="${mint}"/><path d="m-29 0 20 21 39-44" fill="none" stroke="#278259" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
 clock:`<circle r="55" fill="white" stroke="${blue}" stroke-width="5"/><path d="M0-32V0L25 18" fill="none" stroke="${blue}" stroke-width="6" stroke-linecap="round"/>`,
 pin:`<path d="M0 62Q-55 1-44-26a46 46 0 0 1 88 0Q55 1 0 62Z" fill="${blue}"/><circle cy="-12" r="17" fill="white"/>`,
 warning:`<path d="m0-62 66 115H-66Z" fill="${orange}"/><path d="M0-23V14" stroke="${ink}" stroke-width="8" stroke-linecap="round"/><circle cy="33" r="5" fill="${ink}"/>`,
 chat:`<path d="M-58-48H58V32H-16L-48 58V32H-58Z" fill="white" stroke="${blue}" stroke-width="5"/><path d="M-34-20H34M-34 0H16" stroke="${blue}" stroke-width="5" stroke-linecap="round"/>`,
 tool:`<rect x="-58" y="-49" width="116" height="98" rx="14" fill="white" stroke="${blue}" stroke-width="5"/><path d="M-58-20H58" stroke="${blue}" stroke-width="5"/>${text(0,24,'↗',50,blue)}`,
 file:`<path d="M-44-58h57l32 32v83h-89Z" fill="white" stroke="${blue}" stroke-width="5"/><path d="M-23-5H23M-23 14H23M-23 33H10" stroke="${blue}" stroke-width="5"/>`
 };
 return `<g transform="translate(${x} ${y})">${shapes[type]||shapes.file}</g>`;
}
function card(x,y,w,h,type,title,sub='',fill=pale){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="${fill}"/>${symbol(type,x+w/2,y+100)}${text(x+w/2,y+205,title,31)}${sub?text(x+w/2,y+249,sub,24,'#67778e',450):''}`;}
const arrow=(x,y)=>`<path d="M${x-28} ${y}h56m-18-18 18 18-18 18" fill="none" stroke="${blue}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
const pill=(x,y,w,t,fill=mint)=>`<rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="${fill}"/>${text(x+w/2,y+42,t,27)}`;
const trio=(a,b,c)=>card(0,100,260,300,...a)+arrow(290,250)+card(320,100,260,300,...b)+arrow(610,250)+card(640,100,260,300,...c);
function graphic(id,i){let s='';
 if(id==='que-automatizar')s=[
 card(15,75,300,330,'pdf','Factura.pdf')+arrow(360,245)+card(405,75,470,330,'sheet','Copiar · Pegar · Repetir','¿Te suena?',orange),
 card(0,70,270,330,'pdf','Factura.pdf')+arrow(315,240)+`<rect x="365" y="70" width="535" height="330" rx="28" fill="${pale}"/>`+['Proveedor','Fecha','Importe'].map((t,j)=>`<rect x="395" y="${105+j*90}" width="475" height="68" rx="12" fill="white"/>${text(632,150+j*90,t+'  _ _ _',29,'#7689a7',450)}`).join(''),
 trio(['pdf','Archivo'],['tool','Prepara'],['file','Borrador']),
 card(0,65,385,330,'file','Importe: por revisar','Dato marcado',orange)+arrow(450,230)+card(515,65,385,330,'person','Tú confirmas','Antes de guardar',mint),
 card(0,65,405,330,'clock','Tiempo de revisión','Cuenta todo')+card(495,65,405,330,'warning','Correcciones','También cuentan',orange),
 trio(['file','Una tarea'],['tool','Una prueba'],['check','Un resultado'])
 ][i];
 if(id==='datos-repetidos')s=[
 symbol('person',450,45)+trio(['pin','Agenda A'],['pin','Hoja B'],['pin','Documento C'])+pill(235,425,430,'¿Dónde lo actualizas?',orange),
 `<rect x="70" y="50" width="760" height="180" rx="30" fill="${mint}"/>${symbol('chat',180,140)}${text(530,135,'Nueva dirección',43)}${text(530,185,'Calle Norte, 12',31,'#597564',450)}`+card(100,280,300,280,'pin','Copia antigua','',orange)+card(500,280,300,280,'pin','Otra copia','',orange),
 card(0,70,270,320,'pin','Calle Sur, 8','Agenda',orange)+card(315,70,270,320,'pin','Calle Norte, 12','Mensaje',mint)+card(630,70,270,320,'pin','Calle Sur, 8','Presupuesto',orange)+pill(250,425,400,'¿Cuál usas?',orange),
 `<rect x="140" y="35" width="620" height="370" rx="30" fill="${pale}"/>${symbol('person',275,145)}${text(540,125,'Ficha del cliente',38)}${text(540,178,'Calle Norte, 12',30,'#657d9e',450)}<path d="M180 235H720" stroke="#ccdaf1" stroke-width="3"/>${text(450,295,'Responsable: administración',29)}${text(450,350,'Actualizado y revisado ✓',29,'#278259')}`,
 card(0,110,270,310,'person','Ficha al día','Origen del dato',mint)+arrow(315,265)+card(365,0,535,250,'pin','Agenda')+card(365,280,535,250,'file','Borrador'),
 card(0,80,400,340,'pin','¿Dónde vive?','Elige una ficha')+card(500,80,400,340,'person','¿Quién lo cambia?','Asigna a alguien',mint)
 ][i];
 if(id==='antes-de-encargar')s=[
 card(0,75,385,330,'chat','«Necesito una app»')+arrow(450,240)+card(515,75,385,330,'pin','¿Para qué tarea?','Empieza por aquí',orange),
 card(0,70,385,330,'file','Visita terminada','Datos por reunir')+arrow(450,235)+card(515,70,385,330,'clock','Presupuesto pendiente','Se queda para mañana',orange),
 card(0,80,270,330,'check','Normal','Completo',mint)+card(315,80,270,330,'warning','Incompleto','Falta un dato',orange)+card(630,80,270,330,'file','Corregido','Algo cambió'),
 card(0,80,385,330,'tool','Prepara borrador')+arrow(450,245)+card(515,80,385,330,'person','Revisa y confirma','Tú decides',mint),
 card(0,70,400,330,'check','Caso completo','¿Sale bien?',mint)+card(500,70,400,330,'warning','Falta un dato','¿Lo avisa?',orange),
 trio(['chat','Un problema'],['file','Tres ejemplos'],['person','Quién revisa'])
 ][i];
 return `<svg viewBox="0 0 900 580" role="img" aria-label="${['Ejemplo visual','Situación del negocio','Proceso ilustrado','Revisión del proceso','Comprobación','Pasos para empezar'][i]}">${s}</svg>`;
}
module.exports={graphic};
