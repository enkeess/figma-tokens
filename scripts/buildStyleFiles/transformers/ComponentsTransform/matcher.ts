import { TransformedToken } from 'style-dictionary';

import { COMPOSITE_TOKENS } from '../../constants';

export function matcher(token: TransformedToken) {
  const { type } = token;
  return COMPOSITE_TOKENS.includes(type);
}
