import { ensureArray } from '../../utils';

// утилита для преобразования св-ва из фигмы в св-во css
// - это нужно для композитных токенов, внутри которых лежит несколько св-в
// они называются по-разному в фигме и css

export function figmaTokenToCssProps(key: string): string[] {
  return ensureArray(
    {
      sizing: ['width', 'height'],
      'vertical-padding': ['padding-top', 'padding-bottom'],
      'horizontal-padding': ['padding-left', 'padding-right'],
      spacing: 'padding',
      'item-spacing': 'gap',
      dimension: 'gap',

      'border-radius-top-left': 'border-top-left-radius',
      'border-radius-top-right': 'border-top-right-radius',
      'border-radius-bottom-right': 'border-bottom-right-radius',
      'border-radius-bottom-left': 'border-bottom-left-radius',
      'border-width-top': 'border-top-width',
      'border-width-right': 'border-right-width',
      'border-width-bottom': 'border-bottom-width',
      'border-width-left': 'border-left-width',

      'text-case': 'text-transform',
      'font-families': 'font-family',
      'font-weights': 'font-weight',
      'font-sizes': 'font-size',
      'line-height': 'line-height',

      // fill - not used in composite tokens as cannot be distinguished as a specific property
      // paragraph-spacing - not available in css
      // typography - composite token, processed separately and split into separate tokens, so don't need to be here

      // TODO: think what to do with this props when needed
      // backgroundBlur
      // asset
    }[key] ?? key,
  );
}
