const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');
const lines = content.split('\n');

let depth = 0;
let maxDepth = 0;
let issues = [];

lines.forEach((line, idx) => {
  const opens = (line.match(/<div\s/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;

  depth += opens - closes;

  if (depth > maxDepth) maxDepth = depth;
  if (depth < 0) {
    issues.push(`Line ${idx + 1}: depth became negative (${depth})`);
  }
});

console.log(`Final depth: ${depth}`);
console.log(`Max depth reached: ${maxDepth}`);
if (issues.length) {
  console.log('Issues found:');
  issues.forEach(i => console.log('  ' + i));
}

// Find sections with unclosed divs
console.log('\nLooking for unclosed sections...');
let sectionDepth = 0;
let currentSection = '';
lines.forEach((line, idx) => {
  if (line.includes('<section')) {
    currentSection = line.match(/id="([^"]+)"/)?.[1] || `line ${idx + 1}`;
    sectionDepth = 0;
  }

  const opens = (line.match(/<div\s/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;
  sectionDepth += opens - closes;

  if (line.includes('</section>') && sectionDepth !== 0) {
    console.log(`  Section "${currentSection}" has ${sectionDepth} unclosed divs`);
  }
});
