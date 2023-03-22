const COMMON_FONT_WEIGHTS = {
  thin: 100,
  hairline: 100,
  extralight: 200,
  ultralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  extrabold: 800,
  ultrabold: 800,
  black: 900,
  heavy: 900,
  extrablack: 950,
  ultrablack: 950,

  // italic
  thinitalic: 100,
  hairlineitalic: 100,
  extralightitalic: 200,
  ultralightitalic: 200,
  lightitalic: 300,
  italic: 400,
  mediumitalic: 500,
  semibolditalic: 600,
  demibolditalic: 600,
  bolditalic: 700,
  extrabolditalic: 800,
  ultrabolditalic: 800,
  blackitalic: 900,
  heavyitalic: 900,
  extrablackitalic: 950,
  ultrablackitalic: 950,
};

export const formatFontWeightValue = (value: unknown): string =>
  COMMON_FONT_WEIGHTS[String(value).replace(/\s/g, '').toLowerCase()] ?? value;
