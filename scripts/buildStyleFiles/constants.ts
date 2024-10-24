export const PLATFORM = 'web';
export const THEME_VARIABLES = 'theme-variables';
export const STYLES_THEME_VARIABLES_NAMESPACE = `styles-${THEME_VARIABLES}`;
export const BASE_INDENT = '  ';

export enum CompositeToken {
  Border = 'border',
  BoxShadow = 'boxShadow',
  Typography = 'typography',
  Composition = 'composition',
}

export const COMPOSITE_TOKENS = Object.values(CompositeToken);

export const BOX_SHADOW_CSS_PROP = CompositeToken.BoxShadow;
export const FONT_WEIGHT_CSS_PROP = 'fontWeight';

export enum FormatName {
  CSSModuleTheme = 'css-module/theme',
  SCSSThemeVariables = 'scss/theme-variables',
  SCSSComponent = 'scss/component',
  TSThemeVariables = 'ts/theme-variables',
}

export enum TransformName {
  Theme = 'theme',
  ThemeVariables = 'theme-variables',
  Components = 'components',
}

export enum FilterName {
  SourceTokens = 'source-tokens',
}

export enum ValueFormat {
  Original = 'Original',
  CSSVar = 'CSSVar',
}
