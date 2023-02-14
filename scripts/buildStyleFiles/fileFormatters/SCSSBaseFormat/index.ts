import { Format, Named } from 'style-dictionary';

import { FormatName } from '../../constants';
import { formatter } from './formatter';

// Формат для scss-файла базовых стилей
export const SCSSBaseFormat: Named<Format> = {
  name: FormatName.SCSSBase,
  formatter,
};
