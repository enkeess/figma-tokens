import fs from 'fs/promises';

import { logMessage } from './logMessage';

export const combineFiles = async (filePaths: string[], resultPath: string) => {
  const files = await Promise.all(filePaths.map(path => fs.readFile(path)));

  await fs.writeFile(resultPath, files.join('\n'));

  logMessage('\n' + `✔ ${resultPath}`);
};
