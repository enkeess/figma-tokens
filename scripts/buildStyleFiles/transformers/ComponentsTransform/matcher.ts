import { TransformedToken } from 'style-dictionary';

import { COMPOSITE_TOKENS, CompositeToken } from '../../constants';

export function matcher(token: TransformedToken) {
  const { type } = token;
  return type !== CompositeToken.Composition && COMPOSITE_TOKENS.includes(type);
}
