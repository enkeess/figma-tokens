export const PLATFORM = 'web';
export const THEME_VARIABLES = 'theme-variables';
export const BASE_INDENT = '  ';

export enum CompositeToken {
  Border = 'border',
  Typography = 'typography',
  Composition = 'composition',
}

export const COMPOSITE_TOKENS = Object.values(CompositeToken);

export enum FormatName {
  SCSSTheme = 'scss/theme',
  SCSSThemeVariables = 'scss/theme-variables',
  SCSSComponent = 'scss/component',
  TSThemeVariables = 'ts/theme-variables',
}

export enum TransformName {
  Theme = 'theme',
  Components = 'components',
}

export enum FilterName {
  SourceTokens = 'source-tokens',
}

export enum ValueFormat {
  Original = 'Original',
  CSSVar = 'CSSVar',
}
