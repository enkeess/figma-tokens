import { Format, Named } from 'style-dictionary';

import { FormatName } from '../../../constants';
import { formatter } from './formatter';

// Формат для scss-файла с токенами для компонента
export const SCSSComponentFormat: Named<Format> = {
  name: FormatName.SCSSComponent,
  formatter,
};
