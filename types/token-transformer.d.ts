declare module 'token-transformer' {
  type TransformerOptions = {
    expandTypography?: boolean;
    expandShadow?: boolean;
    expandComposition?: boolean;
    preserveRawValue?: boolean;
    throwErrorWhenNotResolved?: boolean;
    resolveReferences?: boolean;
  };

  function transformTokens(
    rawTokens: AnyRecord,
    setsToUse?: string[],
    excludes?: string[],
    transformerOptions?: TransformerOptions,
  ): AnyRecord;
}
