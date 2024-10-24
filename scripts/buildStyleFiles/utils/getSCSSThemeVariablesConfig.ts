import StyleDictionaryPackage from 'style-dictionary';

import { SCSS_BUILD_DIRECTORY, Themes, TOKENS_BUILD_DIRECTORY } from '../../constants';
import { FormatName, PLATFORM, STYLES_THEME_VARIABLES_NAMESPACE, TransformName } from '../constants';

export function getSCSSThemeVariablesConfig() {
  return {
    source: [`${TOKENS_BUILD_DIRECTORY}/themes/tokens-${Themes.BrandLight}.json`],
    platforms: {
      [PLATFORM]: {
        buildPath: `${SCSS_BUILD_DIRECTORY}/`,
        transforms: [...StyleDictionaryPackage.transformGroup.scss, TransformName.ThemeVariables],
        files: [
          {
            destination: `${STYLES_THEME_VARIABLES_NAMESPACE}.scss`,
            format: FormatName.SCSSThemeVariables,
          },
        ],
      },
    },
  };
}
