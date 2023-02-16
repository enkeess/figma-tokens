import StyleDictionaryPackage from 'style-dictionary';

import { SCSS_BUILD_DIRECTORY, Themes, TOKENS_BUILD_DIRECTORY } from '../../constants';
import { FilterName, FormatName, PLATFORM, TransformName } from '../constants';

export function getComponentStylesConfig(componentFile: string) {
  const componentName = componentFile.split('.')[0];
  const componentPath = `${TOKENS_BUILD_DIRECTORY}/components/${componentFile}`;

  return {
    source: [componentPath],
    include: [
      `${TOKENS_BUILD_DIRECTORY}/themes/tokens-base.json`,
      `${TOKENS_BUILD_DIRECTORY}/themes/tokens-${Themes.BrandLight}.json`,
    ],
    platforms: {
      [PLATFORM]: {
        transforms: [...StyleDictionaryPackage.transformGroup.scss, TransformName.Components],
        buildPath: `${SCSS_BUILD_DIRECTORY}/components/`,
        files: [
          {
            destination: `styles-${componentName}.scss`,
            format: FormatName.SCSSComponent,
            filter: FilterName.SourceTokens,
          },
        ],
      },
    },
  };
}
