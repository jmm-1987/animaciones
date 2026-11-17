// Recorrido determinista sobre las funciones reales de la carta. Sin envíos.
(()=>{
if(!new URLSearchParams(location.search).has('walkthrough'))return;
const style=document.createElement('style');style.textContent='#demo-touch{position:fixed;width:48px;height:48px;margin:-24px 0 0 -24px;border:3px solid #f66540;border-radius:50%;background:#ffcc6655;box-shadow:0 0 0 7px #ff704325;z-index:999;pointer-events:none}input.demo-focus,textarea.demo-focus{outline:2px solid #f66540;outline-offset:2px}';document.head.append(style);
const touch=document.createElement('div');touch.id='demo-touch';touch.hidden=true;document.body.append(touch);
let lastKey='';
const smooth=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);};
const typed=(text,t,start,speed=14)=>text.slice(0,Math.max(0,Math.floor((t-start)*speed)));
function tap(selector,age){const node=typeof selector==='string'?document.querySelector(selector):selector;if(!node||age<0||age>.65){touch.hidden=true;return;}const r=node.getBoundingClientRect();touch.hidden=false;touch.style.left=(r.left+r.width/2)+'px';touch.style.top=(r.top+r.height/2)+'px';touch.style.opacity=String(1-age/.65);touch.style.transform='scale('+(0.7+age*.8)+')';}
window.renderMenuDemo=(segment,t)=>{
 t=Math.max(0,t);let nextCart={},nextCat='Bocadillos',open=false,delivery=false;
 if(segment===0){if(t>=1.9)nextCart[0]=1;if(t>=3)nextCat='Bebidas';if(t>=4.1)nextCart[12]=1;if(t>=5)nextCart[12]=2;}
 else{nextCart={0:1,12:segment===1&&t>=2&&t<3.5?3:2};nextCat='Bebidas';open=segment===2||t>=.65;delivery=segment===2&&t>=4.7&&t<6.5;}
 const key=JSON.stringify([nextCart,nextCat,open,delivery]);
 if(key!==lastKey){cart=nextCart;cat=nextCat;tabs();grid();bar();$('sheet').style.display='none';if(open)openCart();setFulfillment(delivery?'delivery':'pickup');lastKey=key;}
 document.querySelectorAll('.demo-focus').forEach(n=>n.classList.remove('demo-focus'));
 if(segment===0){const header=document.querySelector('header').offsetHeight;window.scrollTo(0,header*smooth(t/.9));const tab=[...document.querySelectorAll('.tab')].find(n=>n.textContent.includes(t<3?'Bocadillos':'Bebidas'));tab?.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});if(t>=5)tap('#c12 .qty button:last-child',t-5);else if(t>=4.1)tap('#c12 .qty button:last-child',t-4.1);else if(t>=3)tap(tab,t-3);else if(t>=1.9)tap('#c0 .qty button:last-child',t-1.9);else tap(tab,t-.9);}
 if(segment===1){window.scrollTo(0,document.querySelector('header').offsetHeight);$('panel').scrollTop=0;if(t>=3.5)tap('#items .item:last-child .qty button:first-child',t-3.5);else if(t>=2)tap('#items .item:last-child .qty button:last-child',t-2);else tap('#bar',t-.3);}
 if(segment===2){
  $('name').value=typed('Ana',t,.3);$('phone').value=typed('600 000 000',t,1.1,13);$('pickupTime').value=t>=2.6?'21:00':'';$('note').value=typed('Sin salsa',t,3.2,13);$('street').value=typed('Calle de ejemplo',t,5,22);$('streetNumber').value=t>=5.7?'12':'';$('town').value=t>=5.9?'Tu localidad':'';
  const max=$('panel').scrollHeight-$('panel').clientHeight;
  $('panel').scrollTop=max*smooth((t-.3)/1.1);
  let target=null,age=1;if(t>=7.2){target='.send';age=t-7.2;}else if(t>=6.5){target='#pickupChoice';age=t-6.5;}else if(t>=4.7&&t<5.15){target='#deliveryChoice';age=t-4.7;}
  if(target){document.querySelector(target)?.scrollIntoView({block:'center',behavior:'instant'});tap(target,age);}else{touch.hidden=true;const field=t<1.1?'name':t<2.6?'phone':t<3.2?'pickupTime':t<4.7?'note':t<5.7?'street':'town';$(field).classList.add('demo-focus');$(field).scrollIntoView({block:'center',behavior:'instant'});}
 }
};
})();
