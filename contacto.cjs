const fs=require('fs');
const cta='<div class="contact-cta"><p>¿Quieres ahorrar tiempo en tu negocio?</p><strong>Hablemos · 711 552 468</strong><div class="contact-actions"><a class="contact-whatsapp" href="https://wa.me/34711552468" target="_blank" rel="noopener noreferrer"><img src="whatsapp.svg" alt="" width="32" height="32">Escríbenos por WhatsApp</a><a class="contact-call" href="tel:+34711552468"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/></svg>Llámanos</a></div></div>';
function addContact(html){
 if(!html.includes('</address>')&&/<title>Historias de (oficina|negocios)/.test(html))html=html.replace('</main>','<section class="library-brand" aria-label="JM2 Tech Studio"><img src="logo.png" alt="JM2 Tech Studio"><address class="brand-address">Pol Ind El Prado<br>C/Pamplona, 37<br>Mérida - Badajoz</address></section></main>');
 const result=html.includes('class="contact-cta"')?html:html.replace(/<\/address>/g,'</address>'+cta);
 return require('./enfoque.cjs')(result.replace(/(<div class="contact-cta"><p>)[\s\S]*?(<\/p>)/g,'$1En JM2 creamos sistemas y herramientas<br><b>a medida para tu negocio.</b>$2'));
}
module.exports=addContact;
if(require.main===module){for(const file of fs.readdirSync('.').filter(n=>n.endsWith('.html')))fs.writeFileSync(file,addContact(fs.readFileSync(file,'utf8')));console.log('Contacto añadido a todas las páginas.');}
