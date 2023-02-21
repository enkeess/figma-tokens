import StyleDictionaryPackage from 'style-dictionary';

import { Themes, TOKENS_BUILD_DIRECTORY, TS_BUILD_DIRECTORY } from '../../constants';
import { FormatName, PLATFORM, THEME_VARIABLES, TransformName } from '../constants';

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
            destination: `styles-${THEME_VARIABLES}.ts`,
            options: {
              theme: THEME_VARIABLES,
            },
          },
        ],
      },
    },
  };
}
