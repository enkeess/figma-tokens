import StyleDictionaryPackage from 'style-dictionary';

import { CSS_BUILD_DIRECTORY, Themes, TOKENS_BUILD_DIRECTORY } from '../../constants';
import { FormatName, PLATFORM, TransformName } from '../constants';

export function getBrandCssModuleConfig(theme: Themes) {
  return {
    source: [`${TOKENS_BUILD_DIRECTORY}/themes/tokens-${theme}.json`],
    platforms: {
      [PLATFORM]: {
        transforms: [...StyleDictionaryPackage.transformGroup.scss, TransformName.Theme],
        buildPath: `${CSS_BUILD_DIRECTORY}/`,
        files: [
          {
            destination: `${theme}.module.css`,
            format: FormatName.SCSSTheme,
            options: {
              theme,
            },
          },
        ],
      },
    },
  };
}
