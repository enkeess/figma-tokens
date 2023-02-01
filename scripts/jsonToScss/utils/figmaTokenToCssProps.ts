import { ensureArray } from './ensureArray';

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
