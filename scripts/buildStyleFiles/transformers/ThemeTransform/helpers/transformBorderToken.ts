import { TransformedToken } from 'style-dictionary';

import { toKebabCase } from '../../../utils';

export function transformBorderToken(token: Partial<TransformedToken>) {
  const { value, name } = token;

  return `/* ${name} */
  ${Object.entries(value)
    .map(([key, v]) => `--${name}-border-${toKebabCase(key)}: ${v};`)
    .join('\n  ')}`;
}
