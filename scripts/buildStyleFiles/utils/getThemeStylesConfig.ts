import StyleDictionaryPackage from 'style-dictionary';

import { SCSS_BUILD_DIRECTORY, Themes, TOKENS_BUILD_DIRECTORY } from '../../constants';
import { FormatName, PLATFORM, THEME_VARIABLES } from '../constants';

export function getThemeStylesConfig(theme: typeof THEME_VARIABLES) {
  return {
    source: [`${TOKENS_BUILD_DIRECTORY}/themes/tokens-${Themes.BrandLight}.json`],
    platforms: {
      [PLATFORM]: {
        transforms: StyleDictionaryPackage.transformGroup.scss,
        buildPath: `${SCSS_BUILD_DIRECTORY}/`,
        files: [
          {
            destination: `styles-${theme}.scss`,
            format: FormatName.SCSSThemeVariables,
            options: {
              theme,
            },
          },
        ],
      },
    },
  };
}
