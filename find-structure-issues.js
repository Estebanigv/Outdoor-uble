const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');

// Find all div positions
const allTags = [];
const regex = /(<div[\s>]|<\/div>)/g;
let match;

while ((match = regex.exec(content)) !== null) {
  const lineNum = content.substring(0, match.index).split('\n').length;
  const isClosing = match[0].includes('/');
  allTags.push({ lineNum, isClosing, index: match.index });
}

console.log(`Total tags found: ${allTags.length}`);
console.log(`Opening tags: ${allTags.filter(t => !t.isClosing).length}`);
console.log(`Closing tags: ${allTags.filter(t => t.isClosing).length}`);

// Check self-closing divs
const selfClosing = (content.match(/<div[^>]*\/>/g) || []).length;
console.log(`Self-closing divs: ${selfClosing}`);

const netOpening = allTags.filter(t => !t.isClosing).length - selfClosing;
const netClosing = allTags.filter(t => t.isClosing).length;

console.log(`\nNet opening divs (excluding self-closing): ${netOpening}`);
console.log(`Net closing divs: ${netClosing}`);
console.log(`Difference: ${netOpening - netClosing} divs need closing`);

// Track depth and find where things go wrong
let depth = 0;
let stack = [];

for (const tag of allTags) {
  if (tag.isClosing) {
    depth--;
    if (stack.length > 0) {
      stack.pop();
    }
  } else {
    // Check if this is self-closing
    const lineContent = content.split('\n')[tag.lineNum - 1];
    const isSelfClosing = lineContent.includes('/>') && lineContent.indexOf('/>') > lineContent.indexOf('<div');

    if (!isSelfClosing) {
      depth++;
      stack.push(tag.lineNum);
    }
  }
}

console.log(`\nFinal depth: ${depth}`);
console.log(`Unclosed divs from lines: ${stack.join(', ')}`);
