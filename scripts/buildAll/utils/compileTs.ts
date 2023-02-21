import { executeWithExitOnError } from './executeWithExitOnError';
import { logMessage } from './logMessage';

export const compileTs = (path: string) => {
  executeWithExitOnError(`tsc ${path} --declaration`);
  logMessage(`
✔ ${path.replace(/\.ts$/, '.d.ts')}
✔ ${path.replace(/\.ts$/, '.js')}`);
};
