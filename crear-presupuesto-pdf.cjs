const fs = require('node:fs');
const path = require('node:path');
const {menus, money, initialGuests} = require('./menus-boda.js');

function createPdf(menu) {
 const commands = [];
 function label(x, y, size, value, bold = false) {
  const escaped = value.replace(/[\\()]/g, '\\$&');
  commands.push(`0.12 0.18 0.16 rg BT /${bold ? 'F2' : 'F1'} ${size} Tf ${x} ${y} Td (${escaped}) Tj ET`);
 }
 function rectangle(x, y, width, height, color) {
  commands.push(`${color} rg ${x} ${y} ${width} ${height} re f`);
 }
 const euros = cents => money(cents).replace(/\s*€/, ' EUR');

 rectangle(48, 755, 499, 4, '0.10 0.23 0.17');
 label(48, 728, 12, 'BANQUETE DE BODA', true);
 label(48, 672, 36, `Menú ${menu.name}`, true);
 label(48, 640, 17, `Propuesta para ${initialGuests} invitados`);
 label(48, 600, 11, 'Presupuesto de ejemplo');

 rectangle(48, 528, 499, 36, '0.91 0.94 0.90');
 label(62, 542, 12, 'Platos del menú', true);
 menu.dishes.forEach((dish, index) => {
  const y = 501 - index * 39;
  label(62, y, 13, dish);
  rectangle(48, y - 13, 499, 1, '0.88 0.90 0.88');
 });
 rectangle(343, 343, 204, 48, '0.91 0.94 0.90');
 label(48, 362, 13, `${euros(menu.cents)} por persona`);
 label(360, 362, 14, 'Total', true);
 label(447, 362, 14, euros(menu.cents * initialGuests), true);
 label(48, 56, 10, 'Banquete de boda   |   Documento de ejemplo');
 label(497, 56, 10, '1 / 1');

 const stream = commands.join('\n') + '\n';
 const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Count 1 /Kids [3 0 R] >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
  `<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}endstream`
 ];
 let pdf = '%PDF-1.4\n';
 const offsets = objects.map((object, index) => {
  const offset = Buffer.byteLength(pdf, 'latin1');
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  return String(offset).padStart(10, '0') + ' 00000 n \n';
 });
 const xref = Buffer.byteLength(pdf, 'latin1');
 pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.join('')}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
 fs.writeFileSync(path.join(__dirname, `menu-boda-${menu.id}.pdf`), pdf, 'latin1');
}

menus.forEach(createPdf);
