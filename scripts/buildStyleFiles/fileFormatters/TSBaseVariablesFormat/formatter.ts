import { FormatterArguments } from 'style-dictionary/types/Format';

import { buildTsMapValue } from '../../utils';

export function formatter({ dictionary }: FormatterArguments) {
  return `export const baseVars = ${buildTsMapValue({ dictionary, token: dictionary.tokens })};`;
}
