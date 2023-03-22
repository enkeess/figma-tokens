import { TransformedToken } from 'style-dictionary';

import { FONT_WEIGHT_CSS_PROP } from '../../../constants';
import { formatFontWeightValue, toKebabCase } from '../../../utils';

export function transformTypographyToken(token: Partial<TransformedToken>) {
  const { value, name } = token;

  const flattenedValue = Object.entries(value).map(([key, v]) => {
    if (key === FONT_WEIGHT_CSS_PROP) {
      return `--${name}-${toKebabCase(key)}: ${formatFontWeightValue(v)};`;
    }

    return `--${name}-${toKebabCase(key)}: ${v};`;
  });

  return `/* ${name} */
  ${flattenedValue.join('\n  ')}`;
}
