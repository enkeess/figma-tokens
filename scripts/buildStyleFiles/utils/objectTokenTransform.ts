import { TransformedToken } from 'style-dictionary';

export const objectTokenTransform = (token: TransformedToken) =>
  token.value.map((item: Record<string, string>) => Object.values(item).slice(0, -1).join(' ')).join(', ');
