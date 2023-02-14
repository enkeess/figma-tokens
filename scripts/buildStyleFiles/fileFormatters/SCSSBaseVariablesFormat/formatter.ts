import { Dictionary } from 'style-dictionary';
import { FormatterArguments } from 'style-dictionary/types/Format';

function getTokenVars(dictionary: Dictionary) {
  return dictionary.allTokens.map(token => `$${token.name}: --${token.name};`).join('\n');
}

export function formatter({ dictionary }: FormatterArguments) {
  const tokenVars = getTokenVars(dictionary);

  return `${tokenVars}
  
@mixin spread-map($map: ()) {
  @each $key, $value in $map {
    #{$key}: $value;
  }
}
`;
}
