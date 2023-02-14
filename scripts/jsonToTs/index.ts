import StyleDictionaryPackage from 'style-dictionary';

import { BASE_VARIABLES, PLATFORM, THEME_VARIABLES } from '../constants';
import { ComponentsTransform, ThemeTransform } from '../jsonToScss/transformers';
import { TSBaseVariablesFormat, TSThemeVariablesFormat } from './fileFormatters';
import { getTSVariablesConfig } from './utils';

// подключаем трансофрмеры для токенов
StyleDictionaryPackage.registerTransform(ThemeTransform);
StyleDictionaryPackage.registerTransform(ComponentsTransform);

// подключаем форматы для файлов
StyleDictionaryPackage.registerFormat(TSBaseVariablesFormat);
StyleDictionaryPackage.registerFormat(TSThemeVariablesFormat);

// генерим ts-файлы c помощью конфигов для темы:
// - файл с токенами для базовых стилей
// - файл с токенами для тем
[BASE_VARIABLES, THEME_VARIABLES].map(theme => {
  const StyleDictionary = StyleDictionaryPackage.extend(getTSVariablesConfig(theme));
  StyleDictionary.buildPlatform(PLATFORM);
});
