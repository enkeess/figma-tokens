import { Format, Named } from 'style-dictionary';

import { FormatName } from '../../../constants';
import { formatter } from './formatter';

export const SCSSThemeFormat: Named<Format> = {
  name: FormatName.SCSSTheme,
  formatter: formatter,
};
