import { TransformedToken } from 'style-dictionary';

import { CompositeToken } from '../../../constants';
import { defaultTransformer } from './defaultTransformer';
import { transformBoxShadowToken } from './transformBoxShadowToken';

export function transformTokenByType(token: Partial<TransformedToken>) {
  const { type, name, value } = token;

  switch (type) {
    case CompositeToken.BoxShadow:
      return transformBoxShadowToken({ value, name });
    case CompositeToken.Typography:
    case CompositeToken.Composition:
    case CompositeToken.Border:
      return defaultTransformer({ value, name });
    default: {
      throw new Error(`Uncaught type: <${type}> in ~ThemeTransform~`);
    }
  }
}
