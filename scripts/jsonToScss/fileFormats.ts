import { Format, Named } from 'style-dictionary';

import { FormatName, TYPOGRAPHY, ValueFormat } from './constants';
import { buildScssMapValue, toKebabCase } from './utils';

export const SCSSBaseFormat: Named<Format> = {
  name: FormatName.SCSSBase,
  formatter: ({ dictionary }) => {
    const tokenValues = dictionary.allTokens.map(token => `$${token.name}: ${token.value},`).join('\n  ');

    return `@import './styles-base-variables';

$tokens-base: (
  ${tokenValues}
);

body {
  @include spread-map($tokens-base);
}
`;
  },
};

export const SCSSBaseVariablesFormat: Named<Format> = {
  name: FormatName.SCSSBaseVariables,
  formatter: ({ dictionary }) => {
    const tokenVars = dictionary.allTokens.map(token => `$${token.name}: --${token.name};`).join('\n');

    return `${tokenVars}

@mixin spread-map($map: ()) {
  @each $key, $value in $map {
    #{$key}: $value;
  }
}
`;
  },
};

export const SCSSThemeFormat: Named<Format> = {
  name: FormatName.SCSSTheme,
  formatter: ({ dictionary, options }) => {
    const { theme } = options;
    const tokenValues = dictionary.allTokens
      .map(token => (token.type === TYPOGRAPHY ? token.value : `$${token.name}: ${token.value},`))
      .join('\n  ');

    return `@import './styles-base-variables';
@import './styles-theme-variables';

$theme-map-${theme}: (
  ${tokenValues}
);

body[data-theme='${theme}'] {
  @include spread-map($theme-map-${theme});
}
`;
  },
};

export const SCSSThemeVariablesFormat: Named<Format> = {
  name: FormatName.SCSSThemeVariables,
  formatter: ({ dictionary }) => {
    const getVariableEntry = (name: string) => `$${name}: --${name};`;

    const printVariableMap = () => `$theme-variables: (
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

    const printVariableList = () =>
      dictionary.allTokens
        .map(token =>
          token.type === TYPOGRAPHY
            ? Object.entries(token.value)
                .map(([key]) => getVariableEntry(`${token.name}-${toKebabCase(key)}`))
                .join('\n')
            : getVariableEntry(token.name),
        )
        .join('\n');

    return [printVariableMap(), printVariableList()].join('\n\n');
  },
};

export const SCSSComponentFormat: Named<Format> = {
  name: FormatName.SCSSComponent,
  formatter: function ({ dictionary }) {
    return `@use 'sass:map';
@use 'sass:list';

@import '../themes/styles-base-variables';
@import '../themes/styles-theme-variables';

@function joinStr($list, $separator) {
  $result: list.nth($list, 1);

  @for $i from 2 through (list.length($list)) {
    $result: $result + $separator + list.nth($list, $i);
  }

  @return $result;
}

@function simple-var($map: (), $keys...) {
  $single-key: joinStr($keys, "-");
  $map-value: map.get($map, $single-key);

  @if $map-value {
    @return var($map-value);
  }

  @return var(map.get($map, $keys...));
}

@mixin composite-var($map: (), $keys...) {
  $single-key: joinStr($keys, '-');
  $map-value: map.get($map, $single-key);
  $map: if($map-value, $map-value, map.get($map, $keys...));

  @each $key, $value in $map {
    #{$key}: var($value);
  }
}

${Object.entries(dictionary.tokens)
  .map(([key, value]) => `$${toKebabCase(key)}: ${buildScssMapValue({ dictionary, token: value })}`)
  .join(';\n\n')}    
`;
  },
};
