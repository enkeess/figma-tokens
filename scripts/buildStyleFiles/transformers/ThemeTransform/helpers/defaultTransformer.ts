import { TransformedToken } from 'style-dictionary';

import { BOX_SHADOW_CSS_PROP } from '../../../constants';
import { formatBoxShadowValue, ShadowItem, toKebabCase } from '../../../utils';

export function defaultTransformer(token: Partial<TransformedToken>) {
  const { value, name } = token;

  const flattenedValue = Object.entries(value).map(([key, v]) => {
    if (key === BOX_SHADOW_CSS_PROP) {
      return `--${name}-${toKebabCase(key)}: ${formatBoxShadowValue(v as ShadowItem | ShadowItem[])};`;
    }

    return `--${name}-${toKebabCase(key)}: ${v};`;
  });

  return `/* ${name} */
  ${flattenedValue.join('\n  ')}`;
}
