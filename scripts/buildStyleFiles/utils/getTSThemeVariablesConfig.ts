import { TOKENS_BUILD_DIRECTORY, TS_BUILD_DIRECTORY } from '../../constants';
import { FormatName, PLATFORM, THEME_VARIABLES } from '../constants';

export function getTSThemeVariablesConfig() {
  return {
    source: [`${TOKENS_BUILD_DIRECTORY}/themes/tokens-brand.json`],
    platforms: {
      [PLATFORM]: {
        buildPath: `${TS_BUILD_DIRECTORY}/`,
        transformGroup: 'scss',
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
