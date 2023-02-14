import { Dictionary, TransformedToken, TransformedTokens } from 'style-dictionary';

import { BASE_INDENT, COMPOSITE_TOKENS, COMPOSITION, ValueFormat } from '../constants';
import { figmaTokenToCssProps, toKebabCase } from '../utils';

const isToken = (token: TransformedTokens): token is TransformedToken => Boolean(token.name);

function replaceRefs({
  dictionary,
  value,
  valueWithRefs,
}: {
  dictionary: Dictionary;
  value: unknown;
  valueWithRefs: unknown;
}) {
  let replacedValue = String(value);

  if (dictionary.usesReference(valueWithRefs)) {
    const refs = dictionary.getReferences(valueWithRefs);

    refs.forEach(ref => {
      replacedValue = replacedValue.replace(ref.value, `$${ref.name}`);
    });
  }

  return replacedValue;
}

export function buildScssMapValue({
  dictionary,
  token,
  depth = 0,
  valueFormat = ValueFormat.Original,
}: {
  dictionary: Dictionary;
  token: TransformedTokens;
  depth?: number;
  valueFormat?: ValueFormat;
}): string {
  const indent = new Array(depth).fill(BASE_INDENT).join('');
  const indentPlus1 = indent + BASE_INDENT;

  const tokenToString = (token: Record<string, any>, formatter: (key: string, value: any) => string) =>
    Object.entries(token)
      .map(([key, value]) => formatter(key, value))
      .join(`,\n${indentPlus1}`);

  const wrapInBrackets = (str: string) => `(
${indentPlus1}${str}
${indent})`;

  const tokenDictionaryTemplate = (token: TransformedTokens) =>
    wrapInBrackets(
      tokenToString(
        token,
        (key, tokenInner) =>
          `${toKebabCase(key)}: ${buildScssMapValue({
            dictionary,
            token: tokenInner,
            depth: depth + 1,
            valueFormat,
          })}`,
      ),
    );

  const simpleTokenTemplate = (token: TransformedToken) =>
    valueFormat === ValueFormat.Original
      ? `${replaceRefs({ dictionary, value: token.value, valueWithRefs: token.original.value })}`
      : `--${token.name}`;

  const compositeTokenTemplate = (token: TransformedToken) => {
    const cssEntryToString = (key: string, value: string) =>
      figmaTokenToCssProps(toKebabCase(key))
        .map(
          prop => `"${prop}": ${valueFormat === ValueFormat.Original ? value : `--${token.name}-${toKebabCase(key)}`}`,
        )
        .join(`,\n${indentPlus1}`);

    return wrapInBrackets(
      tokenToString(token.value, (key, value) =>
        value && typeof value === 'object'
          ? `${tokenToString(value, cssEntryToString)}`
          : cssEntryToString(key, replaceRefs({ dictionary, value, valueWithRefs: token.original.value[key] })),
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
