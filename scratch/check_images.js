const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
// remove comments
html = html.replace(/<!--[\s\S]*?-->/g, '');
const regex = /<img[^>]+src=["']([^"']+)["']/g;
let match;
let missing = 0;
let total = 0;
while ((match = regex.exec(html)) !== null) {
  const src = match[1];
  if (!src.startsWith('http')) {
    total++;
    if (!fs.existsSync(src)) {
      console.error('MISSING:', src);
      missing++;
    }
  }
}
console.log(`Active local images in index.html. Total: ${total}, Missing: ${missing}`);
