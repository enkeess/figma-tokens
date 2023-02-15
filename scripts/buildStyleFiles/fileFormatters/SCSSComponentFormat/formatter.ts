import { FormatterArguments } from 'style-dictionary/types/Format';

import { buildScssMapValue, toKebabCase } from '../../utils';

export function formatter({ dictionary }: FormatterArguments) {
  return `@use 'sass:map';

@import '../themes/styles-theme-variables';

@function simple-var($map: (), $keys...) {
  @return var(map.get($map, $keys...));
}

@mixin composite-var($map: (), $keys...) {
  @each $key, $value in map.get($map, $keys...) {
    #{$key}: var($value);
  }
}

${Object.entries(dictionary.tokens)
  .map(([key, value]) => `$${toKebabCase(key)}: ${buildScssMapValue({ dictionary, token: value })}`)
  .join(';\n\n')}    
`;
}
