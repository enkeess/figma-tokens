import { promises as fs } from 'fs';

import themeConfig from '../../tokens/$themes.json';
import { Themes, TOKENS_BUILD_DIRECTORY, TOKENS_DIRECTORY } from '../constants';
import { generateTokenFile } from './generateTokenFile';
import { addUnits } from './utils';

export const THEME_MAP = {
  CloudLightMode: Themes.Green,
  CloudDarkMode: Themes.GreenDark,
  MlSpaceLightMode: Themes.Purple,
  MlSpaceDarkMode: Themes.PurpleDark,
};

(async () => {
  await fs.mkdir(TOKENS_BUILD_DIRECTORY, { recursive: true });

  for (const { name, selectedTokenSets } of themeConfig) {
    const theme = THEME_MAP[name];
    const paths = Object.keys(selectedTokenSets);
    const basePaths = paths.filter(tokens => tokens.startsWith('Base'));
    const themePaths = paths.filter(tokens => tokens.startsWith('Themes'));
    const componentsPaths = paths.filter(tokens => tokens.startsWith('Components'));

    const result = await Promise.all(
      paths.map(currentPath => fs.readFile(`${TOKENS_DIRECTORY}/${currentPath}.json`, { encoding: 'utf8' })),
    );

    const rawTokens = addUnits(
      result.reduce((result, currentFile, index) => {
        result[paths[index]] = JSON.parse(currentFile);

        return result;
      }, {}),
    );

    await generateTokenFile({
      name: theme,
      subDir: 'themes',
      allTokens: rawTokens,
      allSets: paths,
      setsToInclude: themePaths,
    });

    // TODO: make correct condition for generation
    if (theme === Themes.Green) {
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
