import { promises as fs } from 'fs';

import { TransformerOptions, transformTokens } from 'token-transformer';

import { TOKENS_BUILD_DIRECTORY } from '../constants';
import { enhanceTree } from './utils';

const DEFAULT_TRANSFORMER_OPTIONS: TransformerOptions = {
  expandShadow: true,
  throwErrorWhenNotResolved: true,
  resolveReferences: true,
};

export const generateTokenFile = async ({
  name,
  subDir,
  allTokens,
  allSets,
  setsToInclude,
  options,
}: {
  name: string;
  subDir: string;
  allTokens: Record<string, any>;
  allSets: string[];
  setsToInclude: string[];
  options?: TransformerOptions;
}) => {
  const tokenSetDirectory = `${TOKENS_BUILD_DIRECTORY}/${subDir}`;

  await fs.mkdir(tokenSetDirectory, { recursive: true });

  const resolvedTokens = transformTokens(
    allTokens,
    allSets,
    allSets.filter(item => !setsToInclude.includes(item)),
    {
      ...DEFAULT_TRANSFORMER_OPTIONS,
      ...options,
    },
  );

  // token-transformer doesn't keep reference to typography token, so need this hack
  if (options?.preserveRawValue) {
    enhanceTree<Record<string, any>>({
      root: resolvedTokens,
      getChildren: node => (node.value ? [] : Object.values(node)),
      enhance: node => {
        node.value = node.rawValue;
        delete node.rawValue;
      },
    });
  }

  const fileName = `${tokenSetDirectory}/tokens-${name}.json`;

  await fs.writeFile(fileName, JSON.stringify(resolvedTokens), 'utf8');

  // eslint-disable-next-line no-console
  console.log(`${fileName} - done`);
};
