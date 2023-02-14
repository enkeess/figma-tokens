import { Format, Named } from 'style-dictionary';

import { FormatName } from '../../constants';
import { formatter } from './formatter';

export const TSBaseVariablesFormat: Named<Format> = {
  name: FormatName.TSBaseVariables,
  formatter,
};
