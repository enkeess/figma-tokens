import { TransformedToken } from 'style-dictionary';

import { CompositeToken } from '../../../constants';
import { defaultTransformer } from './defaultTransformer';
import { transformBorderToken } from './transformBorderToken';
import { transformBoxShadowToken } from './transformBoxShadowToken';
import { transformTypographyToken } from './transformTypographyToken';

export function transformTokenByType(token: Partial<TransformedToken>) {
  const { type, name, value } = token;

  switch (type) {
    case CompositeToken.BoxShadow:
      return transformBoxShadowToken({ value, name });
    case CompositeToken.Border:
      return transformBorderToken({ value, name });
    case CompositeToken.Typography:
      return transformTypographyToken({ value, name });
    case CompositeToken.Composition:
      return defaultTransformer({ value, name });
    default: {
      throw new Error(`Uncaught type: <${type}> in ~ThemeTransform~`);
    }
  }
}
