import { Dictionary } from 'style-dictionary';
import { FormatterArguments } from 'style-dictionary/types/Format';

import { COMPOSITE_TOKENS, CompositeToken, ValueFormat } from '../../constants';
import { buildScssMapValue, toKebabCase } from '../../utils';

function getVariableEntry(name: string) {
  return `$${name}: --${name};`;
}

function printVariableMap(dictionary: Dictionary) {
  return `@use 'sass:map';

@function simple-var($map: (), $keys...) {
  @return var(map.get($map, $keys...));
}

@mixin composite-var($map: (), $keys...) {
  @each $key, $value in map.get($map, $keys...) {
    #{$key}: var($value);
  }
}

$theme-variables: (
  ${Object.entries(dictionary.tokens)
    .map(
      ([key, value]) =>
        `${toKebabCase(key)}: ${buildScssMapValue({
          dictionary,
          token: value,
          depth: 1,
          valueFormat: ValueFormat.CSSVar,
        })}`,
    )
    .join(',\n  ')}
);`;
}

function printVariableList(dictionary: Dictionary) {
  return dictionary.allTokens
    .map(token => {
      if (COMPOSITE_TOKENS.includes(token.type)) {
        if (token.type === CompositeToken.BoxShadow) {
          return getVariableEntry(token.name);
        }

        return Object.entries(token.value)
          .map(([key]) => getVariableEntry(`${token.name}-${toKebabCase(key)}`))
          .join('\n');
      }

      return getVariableEntry(token.name);
    })
    .join('\n');
}

export function formatter({ dictionary }: FormatterArguments) {
  return [printVariableMap(dictionary), printVariableList(dictionary)].join('\n\n');
}
