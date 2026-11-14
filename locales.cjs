const {figure}=require('./personajes-editorial.cjs');
const configs={
 conciliacion:{label:'ESTUDIO DE INTERIORISMO · MATERIALES',wall:'#eee7e2',floor:'#cbbab0',gender:'woman',skin:'#d99a76',hair:'#35303d',shirt:'#58769c'},
 presupuestos:{label:'REFORMAS · A PIE DE OBRA',wall:'#f3e7d7',floor:'#d7c5ac',gender:'man',skin:'#dba17e',hair:'#583e30',shirt:'#1557f5'},
 citas:{label:'FISIOTERAPIA · SALA DE TRATAMIENTO',wall:'#e1f0e9',floor:'#c4d9d1',gender:'woman',skin:'#efbb97',hair:'#644332',shirt:'#397f77'},
 datos:{label:'DISTRIBUIDORA · ALMACÉN',wall:'#e5eaf4',floor:'#c2cad8',gender:'man',skin:'#ae7552',hair:'#302937',shirt:'#1557f5'},
 informes:{label:'MODA · TIENDA DE BARRIO',wall:'#f5e5e6',floor:'#dec8c2',gender:'woman',skin:'#d99a76',hair:'#35303d',shirt:'#96566e'},
 documentos:{label:'ARCHIVO · ASESORÍA JURÍDICA',wall:'#eee8dd',floor:'#c9bdac',gender:'man',skin:'#e3af89',hair:'#aeb3b7',shirt:'#425a77'},
 pedidos:{label:'FLORISTERÍA · ENCARGOS',wall:'#f0e5ed',floor:'#c5d3c0',gender:'woman',skin:'#a86d4e',hair:'#302937',shirt:'#517c5c',apron:true},
 bocateria:{label:'BOCATERÍA · EN PLENA COCINA',wall:'#eef1e4',floor:'#d4d7c9',gender:'man',skin:'#ae7552',hair:'#302937',shirt:'#1557f5',apron:true,phone:true},
 tpv:{label:'PAPELERÍA · MOSTRADOR',wall:'#e7edff',floor:'#c8d4e8',gender:'woman',skin:'#dba17e',hair:'#583e30',shirt:'#1557f5'},
 cobros:{label:'TALLER MECÁNICO · ENTREGA DE VEHÍCULOS',wall:'#e5ebef',floor:'#bac5cb',gender:'man',skin:'#c68d6d',hair:'#302937',shirt:'#1557f5'},
 facturas:{label:'PANADERÍA · ZONA DE PEDIDOS',wall:'#f4eadc',floor:'#d6c3ac',gender:'woman',skin:'#dba17e',hair:'#343047',shirt:'#1557f5',apron:true},
 presentacion:{label:'DISTRIBUCIÓN · RECEPCIÓN DE MERCANCÍA',wall:'#e4ecf8',floor:'#c8d1e0',gender:'man',skin:'#ae7552',hair:'#302937',shirt:'#1557f5'}
};
const box=(x,y,w=110,h=100)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#d4ad79"/><path d="M${x+w/2} ${y}V${y+h}" stroke="#f4dfbe" stroke-width="18"/>`;
const flowers=(x,y)=>`<g transform="translate(${x} ${y})"><path d="M-30 0L-16 130H40L58 0" fill="#d8bc92"/><path d="M0 60L-25-90M18 50L20-125M35 60L65-90" fill="none" stroke="#64866a" stroke-width="8"/><g fill="#d997b0"><circle cx="-25" cy="-90" r="25"/><circle cx="20" cy="-125" r="30"/><circle cx="65" cy="-90" r="25"/></g></g>`;
function locationArt(type){
 const c=configs[type];if(!c)throw Error('Local desconocido: '+type);
 let back='',front='';
 if(type==='conciliacion'){
 back=`<rect x="60" y="155" width="300" height="465" rx="8" fill="#d9c9bd"/><path d="M75 175H200V375H75Z" fill="#e8ddca"/><path d="M215 175H345V375H215Z" fill="#aabcb1"/><path d="M75 390H200V600H75Z" fill="#c59883"/><path d="M215 390H345V600H215Z" fill="#b8c8d8"/><rect x="680" y="170" width="235" height="330" fill="white"/><path d="M705 200H890V470H705Z" fill="#e9edf1"/><path d="M735 445V275H850V445M735 340H850M780 275V445" stroke="#a9b7bf" stroke-width="8" fill="none"/>`;
 front=`<path d="M650 670H925V740H650Z" fill="#a78c79"/><path d="M680 740V855M900 740V855" stroke="#8d7360" stroke-width="16"/><path d="M675 650L750 590 880 620 810 680Z" fill="#fff"/><path d="M700 630L760 610 830 630" stroke="#7395ff" stroke-width="4" fill="none"/><rect x="80" y="720" width="210" height="100" rx="8" fill="#d7b9a5"/>`;
 }else if(type==='presupuestos'){
 back=`<path d="M70 170H440V610H70Z" fill="#dfc5a3"/><path d="M90 190H420V590H90Z" fill="#b7cde6"/><path d="M255 190V590M90 390H420" stroke="#fff" stroke-width="16"/><path d="M650 190H920V535H650Z" fill="#e7d3b6"/><path d="M650 260H920M650 330H920M650 400H920M650 470H920M730 190V260M830 260V330M730 330V400M830 400V470" stroke="#bfa27e" stroke-width="5"/><path d="M730 210L840 660M820 210L930 660M750 290H840M770 370H860M790 450H880M810 530H900" stroke="#8e7358" stroke-width="16"/>`;
 front=`<rect x="60" y="640" width="540" height="50" fill="#c29b69"/><path d="M100 690L80 855M550 690L580 855" stroke="#8e7358" stroke-width="18"/><path d="M110 630L250 595 400 626 260 660Z" fill="white"/><path d="M174 628L265 609 336 628M220 616L288 642" stroke="#7395ff" stroke-width="3"/><rect x="685" y="680" width="190" height="100" rx="12" fill="#1557f5"/><path d="M735 680V650H825V680" fill="none" stroke="#101725" stroke-width="12"/>`;
 }else if(type==='citas'){
 back=`<rect x="70" y="170" width="240" height="280" rx="10" fill="#fff"/><circle cx="190" cy="238" r="25" fill="#a8c6b8"/><path d="M190 270V370M190 290L145 330M190 290L235 330M190 370L153 420M190 370L227 420" stroke="#79a997" stroke-width="13"/><rect x="690" y="175" width="230" height="360" rx="8" fill="#b4d5c9"/><path d="M700 360H910" stroke="#fff" stroke-width="6"/><circle cx="720" cy="320" r="8" fill="#7395ff"/>`;
 front=`<rect x="370" y="550" width="560" height="100" rx="30" fill="#94c3b3"/><rect x="760" y="530" width="150" height="45" rx="20" fill="white"/><path d="M410 650V840M880 650V840M410 800H880" stroke="#63877c" stroke-width="20"/><rect x="80" y="620" width="130" height="120" rx="18" fill="#a5cabc"/><path d="M90 740V820M195 740V820" stroke="#63877c" stroke-width="12"/>`;
 }else if(type==='datos'||type==='presentacion'){
 back=`<path d="M60 160H940V600H60Z" fill="#cbd6e6"/><path d="M65 160V620M350 160V620M650 160V620M935 160V620M60 350H940M60 570H940" stroke="#687b96" stroke-width="16"/>${box(90,235,100,100)}${box(220,215,100,120)}${box(380,220,120,115)}${box(520,250,100,85)}${box(690,235,100,100)}${box(810,215,100,120)}${box(90,410,230,140)}${box(690,410,220,140)}`;
 front=`${box(80,695,200,140)}<path d="M570 785H900M625 790L595 870M860 790L895 870" stroke="#687b96" stroke-width="18"/>${box(650,665,190,115)}<path d="M920 580V800H750" fill="none" stroke="#1557f5" stroke-width="15"/><circle cx="800" cy="825" r="22" fill="#101725"/><circle cx="920" cy="825" r="22" fill="#101725"/>`;
 }else if(type==='informes'){
 back=`<path d="M70 220H400M95 220V600M375 220V600M630 220H935M650 220V600M910 220V600" stroke="#af8f8f" stroke-width="12"/>${[140,250,710,815].map((x,i)=>`<path d="M${x} 245L${x+35} 275 ${x+60} 255 ${x+85} 315 ${x+60} 330V480H${x}V330L${x-25} 315Z" fill="${['#7395ff','#b96b81','#d4b67d','#8ca08c'][i]}"/><path d="M${x+20} 240L${x+30} 225 ${x+45} 240" fill="none" stroke="#657187" stroke-width="4"/>`).join('')}`;
 front=`<rect x="50" y="660" width="390" height="170" rx="15" fill="#d6aeb1"/><path d="M80 645H380V665H80Z" fill="#fbfcff"/><path d="M110 620H340V643H110Z" fill="#7395ff"/><rect x="730" y="670" width="130" height="150" rx="5" fill="#e4c59b"/><path d="M760 670V630Q800 595 830 630V670" fill="none" stroke="#a7865e" stroke-width="9"/>`;
 }else if(type==='documentos'){
 back=`<rect x="55" y="150" width="890" height="490" fill="#9a8066"/>${[300,470,635].map(y=>`<path d="M60 ${y}H940" stroke="#d1b99d" stroke-width="14"/>`).join('')}${[90,135,180,225,270,720,765,810,855,900].map((x,i)=>`<path d="M${x} 180V280M${x} 330V450M${x} 500V610" stroke="${i%2?'#d4c9b7':'#8d9fb9'}" stroke-width="27"/>`).join('')}<rect x="350" y="180" width="300" height="250" fill="#f4eddf"/><path d="M500 220V370M430 260H570M450 260L420 320H480ZM550 260L520 320H580Z" fill="none" stroke="#a78652" stroke-width="9"/>`;
 front=`<rect x="80" y="715" width="250" height="110" fill="#d9bc8f"/><path d="M70 715H340" stroke="#a78652" stroke-width="18"/><text x="205" y="785" text-anchor="middle" font-size="25" fill="#657187">ARCHIVO</text>`;
 }else if(type==='pedidos'){
 back=`<path d="M65 160H935V560H65Z" fill="#d9e8e1"/><path d="M65 350H935M350 160V560M650 160V560" stroke="#b2c6bf" stroke-width="12"/>${flowers(160,400)}${flowers(780,380)}${flowers(865,570)}`;
 front=`<path d="M80 690H650V745H80Z" fill="#d6b48e"/><path d="M110 745V855M620 745V855" stroke="#9c7b58" stroke-width="18"/>${flowers(740,690)}<path d="M140 680L185 560 260 610 320 560 370 680Z" fill="#dbca9e"/><g fill="#d997b0"><circle cx="180" cy="560" r="28"/><circle cx="255" cy="540" r="33"/><circle cx="320" cy="560" r="27"/></g>`;
 }else if(type==='bocateria'){
 back=`<path d="M60 160H940V610H60Z" fill="#f7f7ef"/>${[250,350,450,550].map(y=>`<path d="M65 ${y}H935" stroke="#d4ddd6" stroke-width="3"/>`).join('')}<path d="M650 160H900L940 310H610Z" fill="#b9c4cc"/><path d="M650 330H900" stroke="#7e929b" stroke-width="9"/>`;
 front=`<rect x="35" y="690" width="930" height="170" rx="12" fill="#c9d2ce"/><rect x="30" y="660" width="940" height="40" rx="10" fill="white"/><rect x="630" y="555" width="250" height="100" rx="15" fill="#343d61"/><path d="M650 580H860M650 610H860M650 640H860" stroke="#657187" stroke-width="7"/><path d="M100 612Q100 555 220 555Q340 555 340 612Z" fill="#e8b56b"/><path d="M110 620H330" stroke="#78a578" stroke-width="16"/><path d="M110 640H330" stroke="#c46c4e" stroke-width="16"/>`;
 }else if(type==='tpv'){
 back=`<rect x="60" y="160" width="310" height="440" fill="#d2def5"/><path d="M60 370H370" stroke="#a2b5d7" stroke-width="12"/>${[100,165,230,295].map((x,i)=>`<rect x="${x}" y="215" width="45" height="135" rx="5" fill="${i%2?'#7395ff':'#fff'}"/>`).join('')}<path d="M690 200H920V540H690Z" fill="#fff"/><path d="M720 240H890M720 290H890M720 340H890M720 390H890M720 440H890" stroke="#dce4f3" stroke-width="20"/>`;
 front=`<rect x="40" y="670" width="920" height="180" rx="12" fill="#c8d4e8"/><rect x="30" y="640" width="940" height="45" fill="white"/><rect x="650" y="470" width="220" height="145" rx="12" fill="#101725"/><rect x="665" y="485" width="190" height="110" fill="#eaf0ff"/><path d="M760 615V640" stroke="#101725" stroke-width="15"/><rect x="100" y="520" width="95" height="115" rx="7" fill="#1557f5"/><path d="M245 635L300 530" stroke="#f2453d" stroke-width="14"/>`;
 }else if(type==='cobros'){
 back=`<path d="M70 160H930V600H70Z" fill="#c1cdd5"/><path d="M80 170H920V280H80Z" fill="#a5b5c2"/><path d="M150 350H350V700M750 350H880V700" fill="none" stroke="#7395ff" stroke-width="30"/><path d="M100 510L175 420H340L420 510V610H100Z" fill="#8da5b7"/><path d="M180 435H325L365 500H140Z" fill="#dfedf6"/><circle cx="170" cy="610" r="45" fill="#343d61"/><circle cx="350" cy="610" r="45" fill="#343d61"/>`;
 front=`<path d="M630 710H950V850H630Z" fill="#687d90"/><path d="M650 740H930M650 790H930" stroke="#b7c7d3" stroke-width="4"/><rect x="695" y="665" width="175" height="35" rx="5" fill="white"/>`;
 }else{
 back=`<path d="M70 170H400V610H70Z" fill="#b99a77"/><path d="M70 330H400M70 490H400" stroke="#e8d0ab" stroke-width="14"/>${[210,370,530].map(y=>`<path d="M100 ${y+70}Q100 ${y}175 ${y}H290Q370 ${y}370 ${y+70}Z" fill="#dfb16c"/>`).join('')}<rect x="690" y="210" width="240" height="350" rx="18" fill="#d6c6b1"/><circle cx="810" cy="370" r="80" fill="#b4a28e"/>`;
 front=`${box(70,700,220,130)}<path d="M640 700H940V760H640Z" fill="#c6a681"/><path d="M665 760V855M920 760V855" stroke="#9a7b59" stroke-width="15"/><path d="M710 680L840 660 900 695 760 715Z" fill="white"/>`;
 }
 const x=type==='citas'?95:type==='cobros'?165:115;
 return `<svg viewBox="0 0 1000 900" role="img" aria-label="${c.label.toLowerCase()}, con una persona de estilo editorial"><rect width="1000" height="900" fill="${c.wall}"/><path d="M0 650H1000V900H0Z" fill="${c.floor}"/>${back}<g transform="translate(${x} 180) scale(2)">${figure(c)}</g>${front}</svg>`;
}
module.exports={configs,locationArt};
