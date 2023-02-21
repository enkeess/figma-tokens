import { TransformedToken } from 'style-dictionary';

import { toKebabCase } from '../../../utils';

export function transformBorderToken(token: Partial<TransformedToken>) {
  const { name, value } = token;

  const newEntries = Object.entries(value).map(([key]) => [`border-${key}`, `$${name}-border-${toKebabCase(key)}`]);

  return Object.fromEntries(newEntries);
}
