import { promises as fs } from 'fs';

import StyleDictionaryPackage from 'style-dictionary';

import { Themes, TOKENS_BUILD_DIRECTORY } from '../constants';
import { BASE, BASE_VARIABLES, PLATFORM, THEME_VARIABLES } from './constants';
import {
  SCSSBaseFormat,
  SCSSBaseVariablesFormat,
  SCSSComponentFormat,
  SCSSThemeFormat,
  SCSSThemeVariablesFormat,
} from './fileFormats';
import { SourceTokensFilter } from './tokenFilters';
import {
  TypographyComponentsTransform,
  TypographyThemeTransform,
  TypographyThemeVariablesTransform,
} from './tokenTransforms';
import { getComponentStylesConfig, getThemeStylesConfig } from './utils';

StyleDictionaryPackage.registerTransform(TypographyThemeTransform);
StyleDictionaryPackage.registerTransform(TypographyThemeVariablesTransform);
StyleDictionaryPackage.registerTransform(TypographyComponentsTransform);

StyleDictionaryPackage.registerFormat(SCSSBaseFormat);
StyleDictionaryPackage.registerFormat(SCSSBaseVariablesFormat);
StyleDictionaryPackage.registerFormat(SCSSThemeFormat);
StyleDictionaryPackage.registerFormat(SCSSThemeVariablesFormat);
StyleDictionaryPackage.registerFormat(SCSSComponentFormat);

StyleDictionaryPackage.registerFilter(SourceTokensFilter);

[BASE, BASE_VARIABLES, THEME_VARIABLES, ...Object.values(Themes)].map(theme => {
  const StyleDictionary = StyleDictionaryPackage.extend(getThemeStylesConfig(theme));
  StyleDictionary.buildPlatform(PLATFORM);
});

(async () => {
  const componentFiles = await fs.readdir(`${TOKENS_BUILD_DIRECTORY}/components`);

  for (const componentFile of componentFiles) {
    const StyleDictionary = StyleDictionaryPackage.extend(getComponentStylesConfig(componentFile));
    StyleDictionary.buildPlatform(PLATFORM);
  }
})();
