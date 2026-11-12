const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('js/app.js', 'utf8');
const css = fs.readFileSync('css/styles.css', 'utf8');

// 1. Verify project triggers in HTML have data in js
const triggers = [];
const regex = /data-project-id=["']([^"']+)["']/g;
let m;
while ((m = regex.exec(html)) !== null) {
  triggers.push(m[1]);
}
console.log(`Found ${triggers.length} project/cert triggers in index.html`);
const missing = triggers.filter(id => !js.includes(`'${id}':`) && !js.includes(`"${id}":`) && !js.includes(`${id}:`));
console.log('Missing data in js/app.js:', missing);

// 2. Verify all internal anchor hrefs exist as IDs
const anchors = [];
const hrefRegex = /href=["']#([^"']+)["']/g;
while ((m = hrefRegex.exec(html)) !== null) {
  if (m[1] && m[1] !== '') anchors.push(m[1]);
}
const uniqueAnchors = [...new Set(anchors)];
console.log('Found internal anchors:', uniqueAnchors);
const missingAnchors = uniqueAnchors.filter(id => !html.includes(`id="${id}"`) && !html.includes(`id='${id}'`));
console.log('Missing anchor targets in HTML:', missingAnchors);

console.log('Verification script complete.');
