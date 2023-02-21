import { TransformedToken } from 'style-dictionary';

import { formatBoxShadowValue } from '../../../utils';

export function transformBoxShadowToken(token: Partial<TransformedToken>) {
  const { value, name } = token;

  return `--${name}: ${formatBoxShadowValue(value)};`;
}
