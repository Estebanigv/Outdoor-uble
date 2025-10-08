const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');
const lines = content.split('\n');

let depth = 0;
let stack = [];

for (let idx = 0; idx < lines.length; idx++) {
  const line = lines[idx];
  const lineNum = idx + 1;

  // Count opening divs (not self-closing)
  const openMatches = line.match(/<div\s[^>]*[^/]>/g) || [];
  const selfClosingMatches = line.match(/<div\s[^>]*\/>/g) || [];
  const opens = openMatches.length;

  // Count closing divs
  const closes = (line.match(/<\/div>/g) || []).length;

  // Push opens to stack
  for (let i = 0; i < opens; i++) {
    stack.push(lineNum);
    depth++;
  }

  // Pop closes from stack
  for (let i = 0; i < closes; i++) {
    if (stack.length === 0) {
      console.log(`Line ${lineNum}: CLOSING DIV WITHOUT OPENING - depth would be ${depth - i - 1}`);
      console.log(`  ${line.trim()}`);
      if (lineNum < 25) {
        console.log('This is near the start of the file, showing first 20 lines of context');
        process.exit(0);
      }
      process.exit(0);
    }
    stack.pop();
    depth--;
  }
}

console.log(`Final depth: ${depth}`);
console.log(`Unclosed divs from lines: ${stack.join(', ')}`);
