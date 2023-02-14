import { TransformedToken } from 'style-dictionary';

import { toKebabCase } from '../../../utils';

export function transformer(token: TransformedToken) {
  const { value, name } = token;
  if (!value) return;

  const flattenedValue = Object.entries(value).map(([key, v]) => `$${name}-${toKebabCase(key)}: ${v},`, '\n');

  return `// ${name}
  ${flattenedValue.join('\n  ')}`;
}
