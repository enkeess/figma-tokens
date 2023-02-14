export const PLATFORM = 'web';
export const BASE = 'base';
export const BASE_VARIABLES = 'base-variables';
export const THEME_VARIABLES = 'theme-variables';
export const COMPOSITION = 'composition';
export const BASE_INDENT = '  ';

export const TOKENS_DIRECTORY = './tokens';
const BUILD_DIRECTORY = './build';
export const TOKENS_BUILD_DIRECTORY = `${BUILD_DIRECTORY}/tokens/`;
export const SCSS_BUILD_DIRECTORY = `${BUILD_DIRECTORY}/scss/`;
export const TS_BUILD_DIRECTORY = `${BUILD_DIRECTORY}/ts/`;

export enum Themes {
  Brand = 'brand',
  BrandDark = 'brandDark',
}

export enum FormatName {
  SCSSBase = 'scss/base',
  SCSSBaseVariables = 'scss/base-variables',
  SCSSTheme = 'scss/theme',
  SCSSThemeVariables = 'scss/theme-variables',
  SCSSComponent = 'scss/component',
  TSBaseVariables = 'ts/base-variables',
  TSThemeVariables = 'ts/theme-variables',
}

export enum CompositeToken {
  Border = 'border',
  Typography = 'typography',
}

export const COMPOSITE_TOKENS = Object.values(CompositeToken);
