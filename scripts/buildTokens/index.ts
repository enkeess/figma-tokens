import { promises as fs } from 'fs';

import themeConfig from '../../tokens/$themes.json';
import { Themes, TOKENS_BUILD_DIRECTORY, TOKENS_DIRECTORY } from '../constants';
import { generateTokenFile } from './generateTokenFile';

export const THEME_MAP = {
  BrandLightMode: Themes.Brand,
  BrandDarkMode: Themes.BrandDark,
};

(async () => {
  await fs.mkdir(TOKENS_BUILD_DIRECTORY, { recursive: true });

  // для каждой темы получаем имя и набора файлов с токенами для этой темы
  for (const { name, selectedTokenSets } of themeConfig) {
    const theme = THEME_MAP[name];
    const paths = Object.keys(selectedTokenSets).filter(
      x => x.startsWith('Components/Button') || !x.startsWith('Components'),
    ); // TODO: фильтрую, тк Игорь не порефачил, без фильтра не резолвятся токены у всех компонентов, кроме кнопки
    const basePaths = paths.filter(tokens => tokens.startsWith('Base'));
    const themePaths = paths.filter(tokens => tokens.startsWith('Themes'));
    const componentsPaths = paths.filter(tokens => tokens.startsWith('Components'));

    const result = await Promise.all(
      paths.map(currentPath => fs.readFile(`${TOKENS_DIRECTORY}/${currentPath}.json`, { encoding: 'utf8' })),
    );

    const rawTokens: Record<string, any> = result.reduce((result, currentFile, index) => {
      result[paths[index]] = JSON.parse(currentFile);
      return result;
    }, {});

    // генерим json-файл с токенами для темы
    await generateTokenFile({
      name: theme,
      subDir: 'themes',
      allTokens: rawTokens,
      allSets: paths,
      setsToInclude: themePaths,
    });

    // TODO: make correct condition for generation
    // здесь нам нужно по 1 файлу для базовых стилей и компонентов, а не для каждой темы, поэтому такое условие добавлено
    if (theme === Themes.Brand) {
      // генерим файл для базовых стилей
      await generateTokenFile({
        name: 'base',
        subDir: 'themes',
        allTokens: rawTokens,
        allSets: paths,
        setsToInclude: basePaths,
      });

      for (const componentPath of componentsPaths) {
        const name = componentPath
          .split('/')
          .slice(1)
          .filter((item, index, arr) => arr.indexOf(item) === index)
          .map(item => `${item[0].toLowerCase()}${item.substring(1)}`)
          .join('-');

        // генерим файл для каждого компонента
        await generateTokenFile({
          name,
          subDir: 'components',
          allTokens: rawTokens,
          allSets: paths,
          setsToInclude: [componentPath],
          options: { resolveReferences: false, preserveRawValue: true },
        });
      }
    }
  }
})();
