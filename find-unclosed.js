const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');
const lines = content.split('\n');

let stack = []; // Stack of {lineNum, preview} for unclosed divs

for (let idx = 0; idx < lines.length; idx++) {
  const line = lines[idx];
  const lineNum = idx + 1;

  // Count divs on this line
  // Opening divs: <div ...> but not <div .../> and not <div...></div>
  const hasOpeningDiv = line.includes('<div') && !line.match(/<div[^>]*\/>/);
  const hasSameLineClosing = line.match(/<div[^>]*>.*<\/div>/);

  let opens = 0;
  if (hasOpeningDiv) {
    // Count how many opening divs (excluding self-closing and same-line)
    const allDivs = line.match(/<div/g) || [];
    const selfClosing = line.match(/<div[^>]*\/>/g) || [];
    const sameLine = (line.match(/<div[^>]*>.*?<\/div>/g) || []).length;
    opens = allDivs.length - selfClosing.length - sameLine;
  }

  const closes = (line.match(/<\/div>/g) || []).length;

  // Add opens to stack
  for (let i = 0; i < opens; i++) {
    const preview = line.trim().substring(0, 80);
    stack.push({ lineNum, preview });
  }

  // Remove closes from stack
  for (let i = 0; i < closes; i++) {
    if (stack.length > 0) {
      stack.pop();
    }
  }
}

console.log(`Found ${stack.length} unclosed div tags:\n`);
stack.forEach(({lineNum, preview}) => {
  console.log(`Line ${lineNum}: ${preview}${preview.length >= 80 ? '...' : ''}`);
});
