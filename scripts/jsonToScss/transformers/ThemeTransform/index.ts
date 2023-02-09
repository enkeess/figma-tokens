import { Named, Transform } from 'style-dictionary';

import { TransformName } from '../../constants';
import { matcher } from './matcher';
import { transformer } from './transformer';

// Файл с трансформерами для токенов
// Transform - функция, которая принимает сырой токен и может его преобразовать в какой-либо формат
// https://amzn.github.io/style-dictionary/#/transforms

export const ThemeTransform: Named<Transform> = {
  type: 'value',
  transitive: true,
  name: TransformName.Theme,
  matcher,
  transformer,
};
