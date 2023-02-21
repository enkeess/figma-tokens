import * as shell from 'shelljs';

import { ensureArray } from '../../utils';
import { logMessage } from './logMessage';

export const deleteFiles = (pathParam: string | string[], options = '-rf') => {
  const paths = ensureArray(pathParam);

  if (shell.rm(options, paths).code !== 0) {
    shell.exit(1);
    return;
  }

  paths.forEach(path => logMessage(`- ${path} deleted`));
};
