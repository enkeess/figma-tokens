import { TransformedToken } from 'style-dictionary';

import { transformTokenByType } from './helpers';

export function transformer(token: TransformedToken) {
  const { value, isSource } = token;

  if (!value) return;

  if (isSource) {
    return value;
  }

  return transformTokenByType(token);
}
