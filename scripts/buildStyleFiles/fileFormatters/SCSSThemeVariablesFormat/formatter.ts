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

@function could-not-find-token-message($keys) {
  @return 'Couldn\\'t find token by given keys: #{$keys}';
}

@function getValidKeys($map: (), $keys...) {
  $no-keys-passed: list.length($keys) == 0;

  @if ($no-keys-passed != true and map.has-key($map, $keys...) != true) {
    @return false;
  }

  @return if($no-keys-passed, $map, map.get($map, $keys...));
}

@function simple-var($map: (), $keys...) {
  $value: getValidKeys($map, $keys...);

  @if ($value == false) {
    @error could-not-find-token-message($keys);
  }

  @return var($value);
}

@mixin composite-var($map: (), $keys...) {
  $inner-map: getValidKeys($map, $keys...);

  @if ($inner-map == false) {
    @error could-not-find-token-message($keys);
  }

  @each $key, $value in $inner-map {
    #{$key}: simple-var($inner-map, $key);
  }
}

@mixin outline-var($map: (), $keys...) {
  $inner-map: getValidKeys($map, $keys...);

  @if ($inner-map == false) {
    @error could-not-find-token-message($keys);
  }

  outline-width: simple-var($inner-map, 'border-width');
  outline-style: simple-var($inner-map, 'border-style');
  outline-color: simple-var($inner-map, 'border-color');
}

@mixin outline-inside-var($map: (), $keys...) {
  $inner-map: getValidKeys($map, $keys...);

  @if ($inner-map == false) {
    @error could-not-find-token-message($keys);
  }

  @include outline-var($inner-map, $keys...);

  outline-offset: calc(simple-var($inner-map, 'border-width') * -1);
}

$theme-variables: (
  ${Object.entries(dictionary.tokens)
    .map(
      ([key, value]) =>
        `"${toKebabCase(key)}": ${buildScssMapValue({
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
