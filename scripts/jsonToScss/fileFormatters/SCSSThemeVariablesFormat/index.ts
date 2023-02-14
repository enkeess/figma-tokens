import { Format, Named } from 'style-dictionary';

import { FormatName } from '../../../constants';
import { formatter } from './formatter';

export const SCSSThemeVariablesFormat: Named<Format> = {
  name: FormatName.SCSSThemeVariables,
  formatter,
};
