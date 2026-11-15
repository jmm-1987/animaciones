const svg=body=>`<svg viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
const icons={
 whatsapp:'<img src="whatsapp.svg" alt="">',
 email:'<img src="gmail-original.png" alt="">',
 calendar:'<img src="google-calendar-original.png" alt="">',
 sheets:svg('<path d="M20 7H46L55 16V56H20Z" fill="#e9f6ef"/><path d="M46 7V17H55M29 26H47M29 35H47M29 44H47M38 26V49"/><rect x="5" y="22" width="25" height="27" rx="4" fill="#23834f" stroke="#23834f"/><path d="M12 29L22 42M22 29L12 42" stroke="white"/>'),
 crm:svg('<rect x="7" y="10" width="50" height="44" rx="7"/><path d="M7 21H57M17 31H27M35 31H47M17 41H27M35 41H47"/><path d="M16 16H19M24 16H27"/>'),
 web:svg('<path d="M9 26L14 9H50L55 26M9 26Q9 34 17 34Q25 34 25 26Q25 34 32 34Q39 34 39 26Q39 34 47 34Q55 34 55 26ZM14 34V55H50V34"/><path d="M25 10V26M39 10V26M29 55V40H43V55"/>')
};
function integrationScene(){
 const nodes=[
 {key:'whatsapp',name:'WhatsApp',x:30,y:40,dx:-170,dy:-90,color:'#25a95d'},
 {key:'email',name:'Gmail',x:690,y:40,dx:170,dy:-90,color:'#3478dd'},
 {key:'calendar',name:'Google Calendar',x:0,y:315,dx:-210,dy:0,color:'#4777ed'},
 {key:'sheets',name:'Hojas de cálculo',x:720,y:315,dx:210,dy:0,color:'#23834f'},
 {key:'crm',name:'CRM',x:145,y:585,dx:-130,dy:120,color:'#8c5ad4'},
 {key:'web',name:'Tu web / tienda',x:575,y:585,dx:130,dy:120,color:'#df8a32'}
 ];
 const wires=nodes.map((n,i)=>{const cx=n.x+95,cy=n.y+80,dx=460-cx,dy=395-cy,length=Math.hypot(dx,dy);return `<path data-integration-wire="${i}" d="M${cx+dx/length*70} ${cy+dy/length*70}L460 395" pathLength="1" stroke="${n.color}"/>`}).join('');
 return `<div class="billing-reel personalized-offer integrations-beat"><span class="billing-eyebrow">CON LO QUE HEMOS VISTO CONTIGO</span><h1>Te proponemos<br>una solución<br><em>a tu medida.</em></h1><div class="integration-map" aria-label="Tu sistema conectado con WhatsApp, correo, calendario, hojas de cálculo, CRM y tienda web"><svg class="integration-wires" viewBox="0 0 920 790" aria-hidden="true">${wires}</svg><div class="integration-hub">${svg('<path d="M19 6H42L52 16V57H12V6Z"/><path d="M41 6V18H52M22 29H42M22 38H42M22 47H34"/>')}<strong>Tu sistema</strong></div>${nodes.map((n,i)=>`<div class="integration-node" role="img" aria-label="${n.name}" data-integration="${i}" data-flight-x="${n.dx}" data-flight-y="${n.dy}" style="left:${n.x}px;top:${n.y}px;--integration-color:${n.color}"><span>${icons[n.key]}</span></div>`).join('')}</div><p class="integration-summary">Conectado con las herramientas<br><strong>que usas en tu negocio.</strong></p></div>`;
}
module.exports={integrationScene};
