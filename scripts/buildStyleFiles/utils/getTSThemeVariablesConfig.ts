import StyleDictionaryPackage from 'style-dictionary';

import { Themes, TOKENS_BUILD_DIRECTORY, TS_BUILD_DIRECTORY } from '../../constants';
import { FormatName, PLATFORM, STYLES_THEME_VARIABLES_NAMESPACE, THEME_VARIABLES, TransformName } from '../constants';

export function getTSThemeVariablesConfig() {
  return {
    source: [`${TOKENS_BUILD_DIRECTORY}/themes/tokens-${Themes.BrandLight}.json`],
    platforms: {
      [PLATFORM]: {
        buildPath: `${TS_BUILD_DIRECTORY}/`,
        transforms: [...StyleDictionaryPackage.transformGroup.scss, TransformName.ThemeVariables],
        files: [
          {
            format: FormatName.TSThemeVariables,
            destination: `${STYLES_THEME_VARIABLES_NAMESPACE}.ts`,
            options: {
              theme: THEME_VARIABLES,
            },
          },
        ],
      },
    },
  };
}
