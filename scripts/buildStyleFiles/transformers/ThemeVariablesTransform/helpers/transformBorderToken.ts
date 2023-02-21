import { TransformedToken } from 'style-dictionary';

export function transformBorderToken(token: Partial<TransformedToken>) {
  const { value } = token;

  const newEntries = Object.entries(value).map(([key, value]) => [`border-${key}`, value]);

  return Object.fromEntries(newEntries);
}
