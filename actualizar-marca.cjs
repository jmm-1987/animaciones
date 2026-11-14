const fs = require('fs');
const address = '<address class="brand-address">Pol Ind El Prado<br>C/Pamplona, 37<br>Mérida - Badajoz</address>';
const link = '<link rel="stylesheet" href="marca.css">';
const pages = fs.readdirSync('.').filter(name => name.endsWith('.html'));
const palette = text => text.replace(/#(?:2459ed|20273b|fff9e9|ffdc72|f36b53|fffdf7|f6f7fb|606b80)\b/gi, color => ({'#2459ed':'#1557f5','#20273b':'#101725','#fff9e9':'#fbfcff','#ffdc72':'#eaf0ff','#f36b53':'#f2453d','#fffdf7':'#fbfcff','#f6f7fb':'#fbfcff','#606b80':'#657187'}[color.toLowerCase()]));
for (const name of pages) {
  let html = palette(fs.readFileSync(name, 'utf8'));
  if (!html.includes('href="marca.css"')) html = html.replace('</head>', link + '\n</head>');
  if (!html.includes('Pol Ind El Prado')) {
    if (name === 'presentacion.html') {
      html = html.replace('<div class="tagline">', address + '\n        <div class="tagline">');
    } else if (name === 'index-comic.html') {
      html = html.replace('<div class="bottom-copy">', address.replace('brand-address', 'brand-address comic-address') + '\n <div class="bottom-copy">');
    } else if (name.startsWith('video-')) {
      html = html.replace(/(<div class="end-brand"><img[^>]+>)/, '$1' + address);
    } else {
      const brand = '<section class="library-brand" aria-label="JM2 Tech Studio · Dirección"><img src="logo.png" alt="JM2 Tech Studio">' + address + '</section>';
      html = html.replace('</main>', brand + '</main>');
    }
  }
  fs.writeFileSync(name, require('./contacto.cjs')(html));
}
// Mantener el estilo y la dirección cuando se vuelvan a generar los episodios.
let generator = palette(fs.readFileSync('montar-serie.cjs', 'utf8'));
if (!generator.includes('href="marca.css"')) generator = generator.replaceAll('</head>', link + '</head>');
if (!generator.includes('Pol Ind El Prado')) generator = generator.replace('<div class="end-brand"><img src="logo.png" alt="JM2 Tech Studio">', '<div class="end-brand"><img src="logo.png" alt="JM2 Tech Studio">' + address);
// La página de serie también conserva el pie de marca al regenerarse.
if (!generator.includes('class="library-brand"')) generator = generator.replace('</main>', '<section class="library-brand" aria-label="JM2 Tech Studio · Dirección"><img src="logo.png" alt="JM2 Tech Studio">' + address + '</section></main>');
fs.writeFileSync('montar-serie.cjs', generator);
console.log('Marca actualizada en ' + pages.length + ' páginas y en el generador.');
