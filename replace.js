import fs from 'fs';
import path from 'path';

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('orange-')) {
        content = content.replace(/orange-/g, 'primary-');
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

replaceInDir('./src');
console.log('Done replacing orange- with primary-');
