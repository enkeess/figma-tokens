import { Dictionary } from 'style-dictionary';
import { FormatterArguments } from 'style-dictionary/types/Format';

import { COMPOSITE_TOKENS, CompositeToken, ValueFormat } from '../../constants';
import { buildScssMapValue, toKebabCase } from '../../utils';

function getVariableEntry(name: string) {
  return `$${name}: --${name};`;
}

function printVariableMap(dictionary: Dictionary) {
  return `@use 'sass:map';
@use 'sass:list';

@function simple-var($map: (), $keys...) {
  $value: if(list.length($keys) == 0, $map, map.get($map, $keys...));
  @return var($value);
}

@mixin composite-var($map: (), $keys...) {
  $inner-map: if(list.length($keys) == 0, $map, map.get($map, $keys...));

  @each $key, $value in $inner-map {
    #{$key}: var($value);
  }
}

@mixin outline-var($map: (), $keys...) {
  outline-width: simple-var(map.get($map, $keys...), 'border-width');
  outline-style: simple-var(map.get($map, $keys...), 'border-style');
  outline-color: simple-var(map.get($map, $keys...), 'border-color');
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

        const flatVars = Object.entries(token.value)
          .map(([key]) => getVariableEntry(`${token.name}-${toKebabCase(key)}`))
          .join('\n');

        const mapVars = `$${toKebabCase(token.name)}: ${buildScssMapValue({
          dictionary,
          token,
          valueFormat: ValueFormat.CSSVar,
        })};`;

        return `${mapVars}
${flatVars}`;
      }

      return getVariableEntry(token.name);
    })
    .join('\n');
}

export function formatter({ dictionary }: FormatterArguments) {
  return [printVariableMap(dictionary), printVariableList(dictionary)].join('\n\n');
}
