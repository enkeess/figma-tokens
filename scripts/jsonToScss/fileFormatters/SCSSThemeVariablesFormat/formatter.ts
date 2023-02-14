import { Dictionary } from 'style-dictionary';
import { FormatterArguments } from 'style-dictionary/types/Format';

import { COMPOSITE_TOKENS } from '../../../constants';
import { toKebabCase } from '../../../utils';
import { ValueFormat } from '../../constants';
import { buildScssMapValue } from '../../utils';

function getVariableEntry(name: string) {
  return `$${name}: --${name};`;
}

function printVariableMap(dictionary: Dictionary) {
  return `$theme-variables: (
  ${Object.entries(dictionary.tokens)
    .map(
      ([key, value]) =>
        `${toKebabCase(key)}: ${buildScssMapValue({
          dictionary,
          token: value,
          depth: 1,
          valueFormat: ValueFormat.CSSVar,
        })}`,
    )
    .join(',\n  ')}
);`;
}

function printVariableList(dictionary: Dictionary) {
  return dictionary.allTokens
    .map(token => {
      if (COMPOSITE_TOKENS.includes(token.type)) {
        return Object.entries(token.value)
          .map(([key]) => getVariableEntry(`${token.name}-${toKebabCase(key)}`))
          .join('\n');
      }

      return getVariableEntry(token.name);
    })
    .join('\n');
}

export function formatter({ dictionary }: FormatterArguments) {
  return [printVariableMap(dictionary), printVariableList(dictionary)].join('\n\n');
}
