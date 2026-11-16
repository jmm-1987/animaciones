const fs=require('fs');
const path=require('path');
const escape=text=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function buildPublications(story){
 const platforms=[['instagram','Instagram'],['tiktok','TikTok']];
 const base=path.basename(story.file,'.html');
 const sections=platforms.map(([key,label])=>{
  const text=story.publications?.[key];
  if(typeof text!=='string'||!text.trim())throw Error('Falta el texto de publicación de '+label+' para '+story.file);
  const file=`guiones/${base}-${key}.txt`;
  fs.writeFileSync(file,text.trim()+'\n');
  return `<section class="publication-platform" aria-labelledby="post-${key}-title"><h3 id="post-${key}-title">${label}</h3><textarea id="post-${key}" rows="12" readonly aria-label="Texto de publicación para ${label}" spellcheck="false">${escape(text.trim())}</textarea><div class="publication-actions"><button type="button" data-copy-publication="post-${key}">Copiar texto de ${label}</button><a href="${file}" download>Descargar .txt</a></div></section>`;
 }).join('');
 return `<details class="video-tools publication-tools"><summary>Texto para publicar · Instagram y TikTok</summary><div class="publication-content"><p>Listo para pegar junto al vídeo, con los hashtags incluidos.</p>${sections}<p class="publication-feedback" role="status" aria-live="polite"></p></div></details>`;
}
module.exports={buildPublications};
