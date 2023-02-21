import { ensureArray } from '../../utils';

export type ShadowItem = {
  x: string;
  y: string;
  blur: string;
  spread: string;
  color: string;
  type: 'innerShadow' | 'dropShadow';
};

export const formatBoxShadowValue = (value: ShadowItem | ShadowItem[]): string =>
  ensureArray(value)
    .map(
      ({ x, y, blur, spread, color, type }) =>
        `${type === 'innerShadow' ? 'inset ' : ''}${x} ${y} ${blur} ${spread} ${color}`,
    )
    .join(', ');
