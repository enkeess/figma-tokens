import { Dictionary } from 'style-dictionary';
import { FormatterArguments } from 'style-dictionary/types/Format';

function getTokenValues(dictionary: Dictionary) {
  return dictionary.allTokens.map(token => `$${token.name}: ${token.value},`).join('\n  ');
}

export function formatter({ dictionary }: FormatterArguments) {
  const tokenValues = getTokenValues(dictionary);

  return `@import './styles-base-variables';
  
$tokens-base: (
  ${tokenValues}
);

body {
  @include spread-map($tokens-base);
}
`;
}
