import { FormatterArguments } from 'style-dictionary/types/Format';

import { STYLES_THEME_VARIABLES_NAMESPACE } from '../../constants';
import { buildScssMapValue, toKebabCase } from '../../utils';

export function formatter({ dictionary }: FormatterArguments) {
  return `@forward '../${STYLES_THEME_VARIABLES_NAMESPACE}';
@use '../${STYLES_THEME_VARIABLES_NAMESPACE}';

${Object.entries(dictionary.tokens)
  .map(([key, value]) => `$${toKebabCase(key)}: ${buildScssMapValue({ dictionary, token: value })}`)
  .join(';\n\n')};

${dictionary.allTokens
  .map(token => `$${toKebabCase(token.name)}: ${buildScssMapValue({ dictionary, token })}`)
  .join(';\n\n')};
`;
}
