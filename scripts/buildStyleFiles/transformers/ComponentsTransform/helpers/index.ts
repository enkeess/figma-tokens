import { TransformedToken } from 'style-dictionary';

import { CompositeToken } from '../../../constants';
import { transformBorderToken } from './transformBorderToken';
import { transformTypographyToken } from './transformTypographyToken';

export function transformTokenByType(token: Partial<TransformedToken>) {
  const { type, name, value } = token;
  switch (type) {
    case CompositeToken.Border: {
      return transformBorderToken({ type, value, name });
    }
    case CompositeToken.Typography:
      return transformTypographyToken({ name, value });
    case CompositeToken.Composition:
    case CompositeToken.BoxShadow:
      return value;
    default: {
      throw new Error(`Uncaught type: <${type}> in ~ComponentsTransform~`);
    }
  }
}
