import { Format, Named } from 'style-dictionary';

import { FormatName, TYPOGRAPHY, ValueFormat } from './constants';
import { buildScssMapValue, toKebabCase } from './utils';

// Файл с форматами для файлов
// Format - функция, которая принимает в себя итоговый список токенов и возвращает контент файла
// (т.е. на текущий момент - это контент scss файла)
// https://amzn.github.io/style-dictionary/#/formats

// Формат для scss-файла базовых стилей
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

// Формат для scss-файла с токенами для базовых стилей
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

// Формат для scss-файла тематических стилей
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

// Формат для scss-файла с токенами для тематических стилей
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

// Формат для scss-файла с токенами для компонента
export const SCSSComponentFormat: Named<Format> = {
  name: FormatName.SCSSComponent,
  formatter: function ({ dictionary }) {
    return `@use 'sass:map';

@import '../themes/styles-base-variables';
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
  },
};
