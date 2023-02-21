import { promises as fs } from 'fs';

import { TOKENS_BUILD_DIRECTORY } from '../../constants';

export const createTokenFile = async ({
  name,
  subDir,
  resolvedTokens,
}: {
  name: string;
  subDir: string;
  resolvedTokens: Record<string, any>;
}) => {
  const tokenSetDirectory = `${TOKENS_BUILD_DIRECTORY}/${subDir}`;
  await fs.mkdir(tokenSetDirectory, { recursive: true });

  const fileName = `${tokenSetDirectory}/tokens-${name}.json`;
  await fs.writeFile(fileName, JSON.stringify(resolvedTokens), 'utf8');

  // eslint-disable-next-line no-console
  console.log(`✔ ${fileName}`);
};
