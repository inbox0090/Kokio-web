import { rmSync, existsSync } from 'fs';
import { join } from 'path';

// Clear .next cache in both the project and the symlinked build directory
const paths = [
  join(process.cwd(), '.next'),
  '/vercel/share/v0-next-shadcn/.next',
];

for (const dir of paths) {
  if (existsSync(dir)) {
    console.log(`Removing ${dir}...`);
    try {
      rmSync(dir, { recursive: true, force: true });
      console.log(`Successfully removed ${dir}`);
    } catch (err) {
      console.log(`Could not remove ${dir}: ${err.message}`);
    }
  } else {
    console.log(`${dir} does not exist, skipping.`);
  }
}

console.log('Cache cleared. Next build will start fresh.');
