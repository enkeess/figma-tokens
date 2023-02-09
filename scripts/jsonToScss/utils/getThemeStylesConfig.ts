import StyleDictionaryPackage from 'style-dictionary';

import { SCSS_BUILD_DIRECTORY, Themes, TOKENS_BUILD_DIRECTORY } from '../../constants';
import { BASE, BASE_VARIABLES, FormatName, PLATFORM, THEME_VARIABLES, TransformName } from '../constants';

export function getThemeStylesConfig(theme: string) {
  return {
    source: [
      `${TOKENS_BUILD_DIRECTORY}/themes/tokens-${
        {
          [THEME_VARIABLES]: 'brand',
          [BASE_VARIABLES]: 'base',
        }[theme] ?? theme
      }.json`,
    ],
    platforms: {
      [PLATFORM]: {
        transforms: [
          ...StyleDictionaryPackage.transformGroup.scss,
          Object.values(Themes).includes(theme as Themes) ? TransformName.TypographyTheme : '',
        ].filter(item => item),
        buildPath: `${SCSS_BUILD_DIRECTORY}/themes/`,
        files: [
          {
            destination: `styles-${theme}${theme === 'brand' || theme === 'brandDark' ? '.module' : ''}.scss`,
            format:
              {
                [THEME_VARIABLES]: FormatName.SCSSThemeVariables,
                [BASE]: FormatName.SCSSBase,
                [BASE_VARIABLES]: FormatName.SCSSBaseVariables,
              }[theme] ?? FormatName.SCSSTheme,
            options: {
              theme,
            },
          },
        ],
      },
    },
  };
}
