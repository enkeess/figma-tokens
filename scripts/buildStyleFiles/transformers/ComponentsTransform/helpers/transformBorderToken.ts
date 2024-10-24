import { TransformedToken } from 'style-dictionary';

import { STYLES_THEME_VARIABLES_NAMESPACE } from '../../../constants';
import { toKebabCase } from '../../../utils';

export function transformBorderToken(token: Partial<TransformedToken>) {
  const { name, value } = token;

  const newEntries = Object.entries(value).map(([key]) => [
    `border-${key}`,
    `${STYLES_THEME_VARIABLES_NAMESPACE}.$${name}-border-${toKebabCase(key)}`,
  ]);

  return Object.fromEntries(newEntries);
}
