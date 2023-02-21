export const PLATFORM = 'web';
export const THEME_VARIABLES = 'theme-variables';
export const BASE_INDENT = '  ';

export enum CompositeToken {
  Border = 'border',
  BoxShadow = 'boxShadow',
  Typography = 'typography',
  Composition = 'composition',
}

export const COMPOSITE_TOKENS = Object.values(CompositeToken);

export const BOX_SHADOW_CSS_PROP = CompositeToken.BoxShadow;

export enum FormatName {
  CSSModuleTheme = 'css-module/theme',
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
