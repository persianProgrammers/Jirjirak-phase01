const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'frontend/src/features/landing/sections');
const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(sectionsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace px-8 on the section tag
  content = content.replace(/className="([^"]*)px-8([^"]*)"/g, 'className="$1px-8 lg:px-12 xl:px-16$2"');
  
  // Replace max-w-7xl with max-w-[1600px]
  content = content.replace(/className="max-w-7xl mx-auto/g, 'className="max-w-[1600px] mx-auto');
  
  fs.writeFileSync(filePath, content);
}
console.log('Sections updated.');
