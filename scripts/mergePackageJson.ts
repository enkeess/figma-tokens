import { writeFileSync } from 'fs';
import { resolve } from 'path';

(async function main() {
  const originalPackageJson = await import(resolve(__dirname, '../package.json'));
  let patchedPackageJson;

  try {
    patchedPackageJson = await import(resolve(__dirname, '../patch.package.json'));
  } catch (_err) {
    console.warn('patch file was not found');

    process.exit(0);
  }

  const merged = Object.assign({}, originalPackageJson.default, patchedPackageJson.default);

  writeFileSync(resolve(__dirname, '../package.json'), JSON.stringify(merged, null, 2));
})();
