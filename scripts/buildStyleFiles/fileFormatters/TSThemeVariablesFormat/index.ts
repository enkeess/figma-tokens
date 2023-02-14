import { Format, Named } from 'style-dictionary';

import { FormatName } from '../../constants';
import { formatter } from './formatter';

export const TSThemeVariablesFormat: Named<Format> = {
  name: FormatName.TSThemeVariables,
  formatter,
};
