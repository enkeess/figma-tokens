import { Format, Named } from 'style-dictionary';

import { FormatName } from '../../constants';
import { formatter } from './formatter';

export const CSSModuleThemeFormat: Named<Format> = {
  name: FormatName.CSSModuleTheme,
  formatter: formatter,
};
