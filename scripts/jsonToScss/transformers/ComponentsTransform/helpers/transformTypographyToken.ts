import { TransformedToken } from 'style-dictionary';

import { toKebabCase } from '../../../utils';

export function transformTypographyToken(token: Partial<TransformedToken>) {
  const { name, value } = token;

  const newEntries = Object.entries(value).map(([key]) => [key, `$${name}-${toKebabCase(key)}`]);

  return Object.fromEntries(newEntries);
}
