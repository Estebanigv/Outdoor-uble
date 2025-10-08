const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');
const lines = content.split('\n');

let depth = 0;
let stack = [];

console.log('Tracing div tags...\n');

for (let idx = 0; idx < lines.length; idx++) {
  const line = lines[idx];
  const lineNum = idx + 1;

  // Skip self-closing divs
  const selfClosing = (line.match(/<div\s[^>]*\/>/g) || []).length;

  // Count opening divs (look for <div followed by space or >, but not self-closing)
  let opens = 0;
  const divMatches = line.match(/<div[\s>]/g) || [];
  for (const match of divMatches) {
    // Check if this div is self-closing by looking ahead in the line
    const divIndex = line.indexOf(match);
    const remainingLine = line.substring(divIndex);
    const closingBracket = remainingLine.indexOf('>');
    if (closingBracket > 0 && remainingLine[closingBracket - 1] !== '/') {
      opens++;
    }
  }

  // Count closing divs
  const closes = (line.match(/<\/div>/g) || []).length;

  const prevDepth = depth;

  // Push opens to stack
  for (let i = 0; i < opens; i++) {
    stack.push(lineNum);
    depth++;
  }

  // Pop closes from stack
  for (let i = 0; i < closes; i++) {
    if (stack.length === 0) {
      console.log(`\n❌ ERROR at Line ${lineNum}: CLOSING DIV WITHOUT OPENING`);
      console.log(`   Current depth: ${depth}`);
      console.log(`   Line content: ${line.trim()}`);
      console.log(`\nShowing context (lines ${Math.max(1, lineNum - 10)} to ${lineNum}):`);
      for (let j = Math.max(0, idx - 10); j <= idx; j++) {
        console.log(`   ${j + 1}: ${lines[j]}`);
      }
      process.exit(1);
    }
    stack.pop();
    depth--;
  }

  if (opens > 0 || closes > 0 || selfClosing > 0) {
    const indicator = opens > closes ? '📂' : closes > opens ? '📁' : '⚖️';
    console.log(`Line ${lineNum.toString().padStart(4)}: ${indicator} depth ${prevDepth} → ${depth} (${opens ? `+${opens}` : ''}${closes ? `-${closes}` : ''}${selfClosing ? ` [${selfClosing} self-closing]` : ''})`);
    if (lineNum === 398 || lineNum === 399 || lineNum === 400) {
      console.log(`         ${line.trim()}`);
    }
  }

  if (lineNum === 360) {
    console.log(`\n... (showing relevant lines around the error) ...\n`);
  }
}

console.log(`\n✅ Final depth: ${depth}`);
if (stack.length > 0) {
  console.log(`❌ Unclosed divs from lines: ${stack.slice(0, 20).join(', ')}${stack.length > 20 ? ` ... and ${stack.length - 20} more` : ''}`);
}
