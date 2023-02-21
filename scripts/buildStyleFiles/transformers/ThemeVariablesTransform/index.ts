import { Named, Transform } from 'style-dictionary';

import { TransformName } from '../../constants';
import { matcher } from './matcher';
import { transformer } from './transformer';

// Transform - функция, которая принимает сырой токен и может его преобразовать в какой-либо формат
// https://amzn.github.io/style-dictionary/#/transforms

export const ThemeVariablesTransform: Named<Transform> = {
  type: 'value',
  transitive: true,
  name: TransformName.ThemeVariables,
  matcher,
  transformer,
};
