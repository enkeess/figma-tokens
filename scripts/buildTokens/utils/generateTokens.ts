import { TransformerOptions, transformTokens } from 'token-transformer';

import { AnyRecord } from '../../../types/any-record';
import { enhanceTree } from './enhanceTree';

const DEFAULT_TRANSFORMER_OPTIONS: TransformerOptions = {
  throwErrorWhenNotResolved: true,
  resolveReferences: true,
};

export const generateTokens = ({
  allTokens,
  allSets,
  setsToInclude,
  options,
}: {
  allTokens: AnyRecord;
  allSets: string[];
  setsToInclude: string[];
  options?: TransformerOptions;
}) => {
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
    enhanceTree<AnyRecord>({
      root: resolvedTokens,
      getChildren: node => (node.value ? [] : Object.values(node)),
      enhance: node => {
        node.value = node.rawValue;
        delete node.rawValue;
      },
    });
  }

  return resolvedTokens;
};
