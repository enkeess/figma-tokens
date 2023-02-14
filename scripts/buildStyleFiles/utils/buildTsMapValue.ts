import { Dictionary, TransformedToken, TransformedTokens } from 'style-dictionary';

import { BASE_INDENT, COMPOSITE_TOKENS, COMPOSITION } from '../constants';
import { figmaTokenToCssProps, toCamelCase, toKebabCase } from '../utils';

const isToken = (token: TransformedTokens): token is TransformedToken => Boolean(token.name);

const startsWithNumber = (str: string) => /^\d/.test(str);

export function buildTsMapValue({
  dictionary,
  token,
  depth = 0,
}: {
  dictionary: Dictionary;
  token: TransformedTokens;
  depth?: number;
}): string {
  const indent = new Array(depth).fill(BASE_INDENT).join('');
  const indentPlus1 = indent + BASE_INDENT;

  const tokenToString = (token: Record<string, any>, formatter: (key: string, value: any) => string) =>
    Object.entries(token)
      .map(([key, value]) => formatter(key, value))
      .join(`,\n${indentPlus1}`);

  const wrapInBrackets = (str: string) => `{
${indentPlus1}${str}
${indent}}`;

  const tokenDictionaryTemplate = (token: TransformedTokens) =>
    wrapInBrackets(
      tokenToString(token, (key, tokenInner) => {
        const propName = toCamelCase(key);

        return `${startsWithNumber(propName) ? `'${propName}'` : propName}: ${buildTsMapValue({
          dictionary,
          token: tokenInner,
          depth: depth + 1,
        })}`;
      }),
    );

  const simpleTokenTemplate = (token: TransformedToken) => `'--${token.name}'`;

  const compositeTokenTemplate = (token: TransformedToken) => {
    const cssEntryToString = (key: string) =>
      figmaTokenToCssProps(toKebabCase(key))
        .map(prop => `'${prop}': '--${token.name}-${toKebabCase(key)}'`)
        .join(`,\n${indentPlus1}`);

    return wrapInBrackets(
      tokenToString(token.value, (key, value) =>
        value && typeof value === 'object' ? `${tokenToString(value, cssEntryToString)}` : cssEntryToString(key),
      ),
    );
  };

  if (!isToken(token)) {
    return tokenDictionaryTemplate(token);
  }

  if ([...COMPOSITE_TOKENS, COMPOSITION].includes(token.type)) {
    return compositeTokenTemplate(token);
  }

  return simpleTokenTemplate(token);
}
