import { FormatterArguments } from 'style-dictionary/types/Format';

import { buildScssMapValue, toKebabCase } from '../../utils';

export function formatter({ dictionary }: FormatterArguments) {
  return `@import '../styles-theme-variables';

${Object.entries(dictionary.tokens)
  .map(([key, value]) => `$${toKebabCase(key)}: ${buildScssMapValue({ dictionary, token: value })}`)
  .join(';\n\n')}    
`;
}
