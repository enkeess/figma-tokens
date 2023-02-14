import StyleDictionaryPackage from 'style-dictionary';

export const toCamelCase = (key: string) =>
  StyleDictionaryPackage.transform['name/cti/camel'].transformer(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { path: [key] },
    { prefix: '' },
  );
