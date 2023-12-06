import fs from 'fs';
import path from 'path';

import pkg from '../package.json';

const publicPackageData = JSON.stringify(
  {
    ...pkg,
    homepage: undefined,
    repository: undefined,
    publishConfig: {
      access: 'public',
    },
  },
  undefined,
  2,
);

fs.writeFileSync(path.resolve(__dirname, '../package.json'), publicPackageData, 'utf-8');
