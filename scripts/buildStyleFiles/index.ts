import { promises as fs } from 'fs';

import StyleDictionaryPackage from 'style-dictionary';

import { Themes, TOKENS_BUILD_DIRECTORY } from '../constants';
import { PLATFORM, THEME_VARIABLES } from './constants';
import {
  SCSSComponentFormat,
  SCSSThemeFormat,
  SCSSThemeVariablesFormat,
  TSThemeVariablesFormat,
} from './fileFormatters';
import { SourceTokensFilter } from './tokenFilters';
import { ComponentsTransform, ThemeTransform } from './transformers';
import { getComponentStylesConfig, getThemeStylesConfig, getTSThemeVariablesConfig } from './utils';
import { getBrandCssModuleConfig } from './utils/getBrandCssModuleConfig';

// подключаем трансофрмеры для токенов
StyleDictionaryPackage.registerTransform(ThemeTransform);
StyleDictionaryPackage.registerTransform(ComponentsTransform);

// подключаем форматы для файлов
StyleDictionaryPackage.registerFormat(SCSSThemeFormat);
StyleDictionaryPackage.registerFormat(SCSSThemeVariablesFormat);
StyleDictionaryPackage.registerFormat(SCSSComponentFormat);
StyleDictionaryPackage.registerFormat(TSThemeVariablesFormat);

// подключаем фильтры для токенов
StyleDictionaryPackage.registerFilter(SourceTokensFilter);

// генерим scss-файлы с помощью конфигов для темы:
// - файл с токенами для тем

([THEME_VARIABLES] as const).map(theme => {
  const StyleDictionary = StyleDictionaryPackage.extend(getThemeStylesConfig(theme));
  StyleDictionary.buildPlatform(PLATFORM);
});

// - файл со тематическими стилями
Object.values(Themes).map(theme => {
  const StyleDictionary = StyleDictionaryPackage.extend(getBrandCssModuleConfig(theme));
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

// генерим ts-файл с токенами для тем
const StyleDictionary = StyleDictionaryPackage.extend(getTSThemeVariablesConfig());
StyleDictionary.buildPlatform(PLATFORM);
