import { promises as fs } from 'fs';

import StyleDictionaryPackage from 'style-dictionary';

import { Themes, TOKENS_BUILD_DIRECTORY } from '../constants';
import {
  CSSModuleThemeFormat,
  SCSSComponentFormat,
  SCSSThemeVariablesFormat,
  TSThemeVariablesFormat,
} from './fileFormatters';
import { SourceTokensFilter } from './tokenFilters';
import { ComponentsTransform, ThemeTransform, ThemeVariablesTransform } from './transformers';
import {
  getComponentStylesConfig,
  getCSSModuleThemeConfig,
  getSCSSThemeVariablesConfig,
  getTSThemeVariablesConfig,
} from './utils';

export const buildStyleFiles = async () => {
  // подключаем трансофрмеры для токенов
  StyleDictionaryPackage.registerTransform(ThemeTransform);
  StyleDictionaryPackage.registerTransform(ThemeVariablesTransform);
  StyleDictionaryPackage.registerTransform(ComponentsTransform);

  // подключаем форматы для файлов
  StyleDictionaryPackage.registerFormat(CSSModuleThemeFormat);
  StyleDictionaryPackage.registerFormat(SCSSThemeVariablesFormat);
  StyleDictionaryPackage.registerFormat(SCSSComponentFormat);
  StyleDictionaryPackage.registerFormat(TSThemeVariablesFormat);

  // подключаем фильтры для токенов
  StyleDictionaryPackage.registerFilter(SourceTokensFilter);

  // генерим scss-файл с токенами для тем
  StyleDictionaryPackage.extend(getSCSSThemeVariablesConfig()).buildAllPlatforms();

  // генерим scss-файл с тематическими стилями
  Object.values(Themes).map(theme => {
    StyleDictionaryPackage.extend(getCSSModuleThemeConfig(theme)).buildAllPlatforms();
  });

  // генерим scss-файлы с токенами для компонентов
  const componentFiles = await fs.readdir(`${TOKENS_BUILD_DIRECTORY}/components`);

  for (const componentFile of componentFiles) {
    StyleDictionaryPackage.extend(getComponentStylesConfig(componentFile)).buildAllPlatforms();
  }

  // генерим ts-файл с токенами для тем
  StyleDictionaryPackage.extend(getTSThemeVariablesConfig()).buildAllPlatforms();
};
