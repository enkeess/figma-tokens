import { TransformedToken } from 'style-dictionary';

import { transformTokenByType } from './helpers';

export function transformer(token: TransformedToken) {
  const { value } = token;

  if (!value) return;

  return transformTokenByType(token);
}
