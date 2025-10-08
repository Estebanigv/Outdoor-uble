const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');

// Remove all line breaks to make it one continuous string
const singleLine = content.replace(/\n/g, ' ');

// Count opening divs (not self-closing)
const openDivs = (singleLine.match(/<div\s[^>]*[^/]>/g) || []).length;

// Count self-closing divs
const selfClosingDivs = (singleLine.match(/<div\s[^>]*\/>/g) || []).length;

// Count closing divs
const closeDivs = (singleLine.match(/<\/div>/g) || []).length;

console.log(`Opening <div> tags: ${openDivs}`);
console.log(`Self-closing <div/> tags: ${selfClosingDivs}`);
console.log(`Closing </div> tags: ${closeDivs}`);
console.log(`\nBalance: ${openDivs - closeDivs}`);

if (openDivs === closeDivs) {
  console.log('✅ All divs are balanced!');
} else {
  console.log(`❌ Missing ${openDivs - closeDivs} closing </div> tags`);
}
