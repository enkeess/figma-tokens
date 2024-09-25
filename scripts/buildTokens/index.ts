import { promises as fs } from 'fs';

import themeConfig from '../../tokens/$themes.json';
import { AnyRecord } from '../../types/any-record';
import { Themes, TOKENS_BUILD_DIRECTORY, TOKENS_DIRECTORY } from '../constants';
import { createTokenFile, generateTokens } from './utils';

export const THEME_MAP: Record<string, Themes> = {
  LightMode: Themes.BrandLight,
  DarkMode: Themes.BrandDark,
};

export const buildTokens = async () => {
  await fs.mkdir(TOKENS_BUILD_DIRECTORY, { recursive: true });

  // для каждой темы получаем имя и набора файлов с токенами для этой темы
  for (const { name, selectedTokenSets } of themeConfig) {
    const theme = THEME_MAP[name];
    const paths = Object.keys(selectedTokenSets);
    const basePaths = paths.filter(tokens => tokens.startsWith('Base'));
    const themePaths = paths.filter(tokens => tokens.startsWith('Themes'));
    const componentsPaths = paths.filter(tokens => tokens.startsWith('Components'));

    const result = await Promise.all(
      paths.map(currentPath => fs.readFile(`${TOKENS_DIRECTORY}/${currentPath}.json`, { encoding: 'utf8' })),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawTokens: AnyRecord = result.reduce(
      (result, currentFile, index) => {
        result[paths[index]] = JSON.parse(currentFile);
        return result;
      },
      {} as Record<string, string>,
    );

    // генерим json-файл с токенами для темы
    await createTokenFile({
      name: theme,
      subDir: 'themes',
      resolvedTokens: generateTokens({
        allTokens: rawTokens,
        allSets: paths,
        setsToInclude: [...basePaths, ...themePaths],
      }),
    });

    // TODO: make correct condition for generation
    // здесь нам нужно по 1 файлу для компонентов, а не для каждой темы, поэтому такое условие добавлено
    if (theme === Themes.BrandLight) {
      for (const componentPath of componentsPaths) {
        const name = componentPath
          .split('/')
          .slice(1)
          .filter((item, index, arr) => arr.indexOf(item) === index)
          .map(item => `${item[0].toLowerCase()}${item.substring(1)}`)
          .join('-');

        // генерим файл для каждого компонента
        await createTokenFile({
          name,
          subDir: 'components',
          resolvedTokens: generateTokens({
            allTokens: rawTokens,
            allSets: paths,
            setsToInclude: [componentPath],
            options: { resolveReferences: false, preserveRawValue: true },
          }),
        });
      }
    }
  }
};
