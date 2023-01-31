type TokenValue = { value: string };
type TokenMap = Record<string, TokenValue>;

const TOKENS_PATH_TO_ADD_UNITS = {
  px: [
    ['Base/Anatomy', 'ModuleScale'],
    ['Base/Fonts', 'FontSize'],
    ['Base/Fonts', 'LetterSpacing'],
  ],
};

export const addUnits = (rawTokens: Record<string, any>) => {
  Object.entries(TOKENS_PATH_TO_ADD_UNITS).forEach(([unit, paths]) => {
    paths.forEach(pathParts => {
      const token: TokenMap | TokenValue = pathParts.reduce((res, cur) => res[cur], rawTokens);
      (token.value ? [token] : Object.values(token)).forEach(entry => (entry.value += unit));
    });
  });

  return rawTokens;
};
