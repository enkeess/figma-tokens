import { TOKENS_BUILD_DIRECTORY, TS_BUILD_DIRECTORY } from '../../constants';
import { BASE_VARIABLES, FormatName, PLATFORM, THEME_VARIABLES } from '../constants';

export function getTSVariablesConfig(theme: string) {
  return {
    source: [
      `${TOKENS_BUILD_DIRECTORY}/themes/tokens-${
        {
          [THEME_VARIABLES]: 'brand',
          [BASE_VARIABLES]: 'base',
        }[theme]
      }.json`,
    ],
    platforms: {
      [PLATFORM]: {
        buildPath: `${TS_BUILD_DIRECTORY}/`,
        transformGroup: 'scss',
        files: [
          {
            format: {
              [THEME_VARIABLES]: FormatName.TSThemeVariables,
              [BASE_VARIABLES]: FormatName.TSBaseVariables,
            }[theme],
            destination: `styles-${theme}.ts`,
            options: {
              theme,
            },
          },
        ],
      },
    },
  };
}
