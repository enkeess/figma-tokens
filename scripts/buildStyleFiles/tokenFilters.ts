import { Filter, Named } from 'style-dictionary';

import { FilterName } from './constants';

// Файл с фильтрами для токенов
// Filter - функция, которая принимает токен и возвращает true/false - брать или не брать токен в итоговый список токенов
// https://amzn.github.io/style-dictionary/#/formats?id=filtering-tokens

export const SourceTokensFilter: Named<Filter> = {
  name: FilterName.SourceTokens,
  matcher: token => token.isSource,
};
