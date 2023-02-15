import StyleDictionaryPackage from 'style-dictionary';

import { SCSS_BUILD_DIRECTORY, Themes, TOKENS_BUILD_DIRECTORY } from '../../constants';
import { FormatName, PLATFORM, THEME_VARIABLES, TransformName } from '../constants';

export function getThemeStylesConfig(theme: string) {
  const isThemeFile = Object.values(Themes).includes(theme as Themes);

  return {
    source: [`${TOKENS_BUILD_DIRECTORY}/themes/tokens-${theme === THEME_VARIABLES ? 'brand' : theme}.json`],
    platforms: {
      [PLATFORM]: {
        transforms: isThemeFile
          ? [...StyleDictionaryPackage.transformGroup.scss, TransformName.Theme]
          : StyleDictionaryPackage.transformGroup.scss,
        buildPath: `${SCSS_BUILD_DIRECTORY}/themes/`,
        files: [
          {
            destination: `styles-${theme}${isThemeFile ? '.module' : ''}.scss`,
            format: theme === THEME_VARIABLES ? FormatName.SCSSThemeVariables : FormatName.SCSSTheme,
            options: {
              theme,
            },
          },
        ],
      },
    },
  };
}
