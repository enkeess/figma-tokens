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
  TSBaseVariablesFormat,
  TSThemeVariablesFormat,
} from './fileFormatters';
import { SourceTokensFilter } from './tokenFilters';
import { ComponentsTransform, ThemeTransform } from './transformers';
import { getComponentStylesConfig, getThemeStylesConfig, getTSVariablesConfig } from './utils';

// подключаем трансофрмеры для токенов
StyleDictionaryPackage.registerTransform(ThemeTransform);
StyleDictionaryPackage.registerTransform(ComponentsTransform);

// подключаем форматы для файлов
StyleDictionaryPackage.registerFormat(SCSSBaseFormat);
StyleDictionaryPackage.registerFormat(SCSSBaseVariablesFormat);
StyleDictionaryPackage.registerFormat(SCSSThemeFormat);
StyleDictionaryPackage.registerFormat(SCSSThemeVariablesFormat);
StyleDictionaryPackage.registerFormat(SCSSComponentFormat);
StyleDictionaryPackage.registerFormat(TSBaseVariablesFormat);
StyleDictionaryPackage.registerFormat(TSThemeVariablesFormat);

// подключаем фильтры для токенов
StyleDictionaryPackage.registerFilter(SourceTokensFilter);

// генерим scss-файлы c помощью конфигов для темы:
// - файл с базовыми стилями
// - файл с токенами для базовых стилей
// - файл с токенами для тем
// - файл со тематическими стилями
[BASE, BASE_VARIABLES, THEME_VARIABLES, ...Object.values(Themes)].map(theme => {
  const StyleDictionary = StyleDictionaryPackage.extend(getThemeStylesConfig(theme));
  StyleDictionary.buildPlatform(PLATFORM);
});

// генерим scss-файлы с токенами для компонентов
(async () => {
  const componentFiles = await fs.readdir(`${TOKENS_BUILD_DIRECTORY}/components`);

  for (const componentFile of componentFiles) {
    const StyleDictionary = StyleDictionaryPackage.extend(getComponentStylesConfig(componentFile));
    StyleDictionary.buildPlatform(PLATFORM);
  }
})();

// генерим ts-файлы c помощью конфигов для темы:
// - файл с токенами для базовых стилей
// - файл с токенами для тем
[BASE_VARIABLES, THEME_VARIABLES].map(theme => {
  const StyleDictionary = StyleDictionaryPackage.extend(getTSVariablesConfig(theme));
  StyleDictionary.buildPlatform(PLATFORM);
});
