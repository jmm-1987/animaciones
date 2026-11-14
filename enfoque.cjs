// Aplicación común del montaje con un solo foco por secuencia.
module.exports=function focus(html){
 if(html.includes('data-montaje="integrado"'))return html;
 if(/<title>Historias de (oficina|negocios)/.test(html))return html.replaceAll('17 segundos','25 segundos').replaceAll('17 S','25 S');
 if(!/(?:class="player"|id="player")/.test(html)||!html.includes('id="stage"'))return html;
 if(!html.includes('href="enfoque.css"'))html=html.replace('</head>','<link rel="stylesheet" href="enfoque.css"></head>');
 if(!html.includes('src="enfoque.js"'))html=html.replace('</body>','<script src="enfoque.js"></script></body>');
 if(html.includes('max="17"')){
  html=html.replace('max="17"','max="25"').replaceAll('0:17','0:25');
  html=html.replace(/<script>([\s\S]*?)<\/script>/g,(all,code)=>{
   code=code.replace(/\b17\b/g,'25').replace(/marks\s*=\s*\[[^\]]*\]/,'marks=[0,4,9,14,19,25]');
   if(html.includes('class="scene closing"'))code=code.replace('const t=elapsed-3','const t=elapsed-4').replace('(elapsed-9)','(elapsed-14)');
   return '<script>'+code+'</script>';
  });
 }
 return html;
};
