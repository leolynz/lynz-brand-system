import fs from 'fs';
import path from 'path';

export async function getBrandContext(): Promise<string> {
  const contentDir = path.join(process.cwd(), 'content');
  let context = '';

  function readDirectory(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        readDirectory(filePath);
      } else if (file.endsWith('.mdx')) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        // Extract relative path to use as a header for the content
        const relativePath = path.relative(contentDir, filePath);
        context += `\n--- SOURCE: ${relativePath} ---\n${fileContent}\n`;
      }
    }
  }

  try {
    readDirectory(contentDir);
  } catch (error) {
    console.error('Error reading brand context:', error);
  }

  return context;
}
