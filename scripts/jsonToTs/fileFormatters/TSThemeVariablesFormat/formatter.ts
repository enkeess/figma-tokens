import { FormatterArguments } from 'style-dictionary/types/Format';

import { buildTsMapValue } from '../../utils';

export function formatter({ dictionary }: FormatterArguments) {
  return `import { baseVars } from './styles-base-variables';

export { baseVars };

export function simpleVar(variable: string): string {
  return \`var(\${variable})\`;
}

export function compositeVar(variableMap: Record<\string, string>): string {
  return Object.entries(variableMap)
    .map(([key, value]) => \`\${key}: var(\${value});\`)
    .join('\\n');
}

export const themeVars = ${buildTsMapValue({ dictionary, token: dictionary.tokens })};
`;
}
