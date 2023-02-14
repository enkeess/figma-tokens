import { Format, Named } from 'style-dictionary';

import { FormatName } from '../../constants';
import { formatter } from './formatter';

export const SCSSBaseVariablesFormat: Named<Format> = {
  name: FormatName.SCSSBaseVariables,
  formatter,
};
