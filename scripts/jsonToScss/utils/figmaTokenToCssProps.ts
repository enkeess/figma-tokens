import { ensureArray } from './ensureArray';

// утилита для преобразования св-ва из фигмы в св-во css
// - это нужно для композитных токенов, внутри которых лежит несколько св-в
// они называются по-разному в фигме и css
// TODO: убрать отсюда border после поддержки композитного токена border
export function figmaTokenToCssProps(key: string): string[] {
  return ensureArray(
    {
      border: 'border-color',
      sizing: ['width', 'height'],
      'item-spacing': 'gap',
      'text-case': 'text-transform',
    }[key] ?? key,
  );
}
