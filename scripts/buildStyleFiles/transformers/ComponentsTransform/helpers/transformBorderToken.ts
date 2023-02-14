import { TransformedToken } from 'style-dictionary';

import { toKebabCase } from '../../../utils';

export function transformBorderToken(token: Partial<TransformedToken>) {
  const { name, type, value } = token;

  const newEntries = Object.entries(value).map(([key]) => [`${type}-${key}`, `$${name}-${toKebabCase(key)}`]);

  return Object.fromEntries(newEntries);
}
