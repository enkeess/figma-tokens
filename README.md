# Figma tokens

Репозиторий для хранения и обработки фигма-токенов дизайн-системы компании [Cloud](https://sbercloud.ru)

* [Макеты Figma](https://www.figma.com/files/1101513230643708615/team/1194627249980298820/DS-(FF))
* Инструмент для пресборки токенов: [Token Transformer](https://github.com/tokens-studio/figma-plugin/tree/main/token-transformer)
* Инструмент для сборки json-токенов в соответсвующие стилевые файлы: [Style Dictionary](https://amzn.github.io/style-dictionary/)


## Начало работы
1. Установите зависимости: `npm install`
2. Запустите сборку: `npm run build:all`

В репозитории собираются:
* CSS-файл со значениями токенов (содержит два класса для модификаций - .light и .dark): 
`build/css/brand.module.css`
* SCSS-файлы с токенами: `build/scss`
* TS-файлы с токенами: `build/ts`

## Семантика токенов:

Есть 3 слоя токенов - базовые, тематические и компонентные (лежат в папках Base, Theme и Components соответсвенно)
* Базовые - самые основные токены; внутри поделены на токены цветов, шрифтов и анатомии
* Тематические токены - ссылаются на базовые токены; сущетсвуют в двух модификациях для цветов - Light и Dark
* Токены компонентов - ссылаются на тематические токены (либо напрямую на базовые, если не требуется темизация каких-либо св-в); поделены покомпонентно

<img src="./assets/tokens-structure.jpg" width="800">

## Использование токенов в проекте

### Типы токенов
* Обычные - токены содержат одно св-во и применяются к конкретному св-ву css с помощью функции `simple-var` либо напрямую через css-var, если это простая переменная
```scss
.buttonLabel {
  color: simple-var($theme-variables, "sys", "primary", "on-accent");
  // или
  color: var($sys-primary-on-accent);
}
```
* Композитные (composite, typography, border) - токен внутри содержит несколько св-в css - их нужно применять внутри класса с помощью миксина `composite-var`
```scss
.buttonLabel {
  @include composite-var($theme-variables, "sans", "label", "size-s");
  // или
  @include composite-var($sans-label-size-s);
}
```
* Случаи-исключения:
    * Токен для св-ва outline - в фигме для него нет специального типа, поэтому для него используется композитный токен типа border. Соответвенно, для него понадобится свой миксин `outline-var`
```scss
.button {
  &:focus-visible {
    @include outline-var($container-focused-available-size-s);
  }
}
```

### Как использовать токены в приложении

1. Подключите пакет `@sbercloud/figma-tokens` актуальной версии
3. Подключите файл с токенами, а затем поместите их в нужное место, используя вспомогательные функции `var`, `simple-var` или `composite-var`
  * scss
    ```scss
    @import '@sbercloud/figma-tokens/build/scss/styles-theme-variables';
    
    .wrapper {
      color: var($sys-primary-text-main-enabled);
      opacity: simple-var($theme-variables, 'opacity', 'a032');
   
      @include composite-var($sans-label-l);
    }
    ```
  * ts
    ```typescript
    import { styled } from '@linaria/react';
    import { compositeVar, simpleVar, themeVars } from '@sbercloud/figma-tokens';
    
    export const Wrapper = styled.div`
      color: ${simpleVar(themeVars.sys.primary.textMainEnabled)};
    
      ${compositeVar(themeVars.sans.label.s)};
    `;
    ```

### Как использовать токены в компонентах uikit-a
1. Проверьте, что в uikit подключен пакет `@sbercloud/figma-tokens` актуальной версии
2. Создайте файл для компонента (напр., `ButtonFilled.tsx`) и scss-файл для стилей (`styles.module.scss`), который импортится в файл компонента
3. Подключите файлы с токенами в `styles.module.scss` (тематические, компонентные - какие нужны):
    * файлы с токенами компонентов по умолчанию уже включают в себя тематические токены
```scss
@import '@sbercloud/figma-tokens/build/scss/styles-theme-variables';
@import '@sbercloud/figma-tokens/build/scss/components/styles-tokens-***';
```
4. Соберите стили компонента по макетам в figma, подключая токены через `var`, `simple-var` или `composite-var`
    * в scss можно также добавлять миксины и различные функции, чтобы убирать дублирование кода, пример:
```scss
// пример миксина, в других случаях код может быть другой

$sizes: s, m, l;
$variants: label-only, icon-only, label-icon;

@mixin button-anatomy-styles {
  @each $size in $sizes {
    &[data-size="#{$size}"] {
      @each $variant in $variants {
        &[data-variant="#{$variant}"] {
          @include composite-var($button-filled, 'container', $size, $variant);
        }
      }
    }
  }
}

.button {
  @include button-anatomy-styles;
}
```
5. Подключите scss-файл в компонент в виде объекта с класснеймами, и далее используйте следующим образом:

```tsx
import styles from './styles.module.scss';

export type ButtonFilledProps = {
  label?: string;
  size?: Size;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
};

export const ButtonFilled = ({ label, size, variant, disabled, loading }: ButtonFilledProps) => {
  return (
    <button
      className={classNames.button}
      data-size={size}
      data-variant={variant}
      data-disabled={disabled || undefined}
      data-loading={loading || undefined}
    >
      <label className={styles.label}>{label}</label>
    </button>
  );
};

```

## Процесс сборки пакета с токенами

1. Сборка json-ов c помощью **token-transformer** (в подходящий формат для **style-dictionary**) (`scripts/buildTokens`)
    * Сборка базовых и тематических токенов (папка `build/tokens/themes`)
        * Согласно файлу `tokens/$themes.json` происходит сборка тематических файлов (в файле лежит 2 конфига для тем, с указанием, какие наборы токенов надо включить - св-во `selectedTokenSets`)
        * **token-transformer** собирает базовые токены и токены темы в 2 общих файла - для модификаций dark и light
        * Сборка **token-transformer**-ом включает в себя резолв всех зависимостей и арифметических операций
    * Сборка токенов компонентов (папка `build/tokens/components`)
        * Для каждого компонента собирается отдельный файл с токенами
        * Связи с токенами тем и базовыми здесь уже не резолвятся, т.к. они нужны для работы тем в дальнейшем
        * Важно - в токенах компонентов должны отсутствовать арифметические операции! Должны быть только ссылки на базовые/тематические токены

2. Сборка css, scss и ts файлов из json-ов с помощью **style-dictionary** (`scripts/buildStyleFiles`)
    * Сборка тематических файлов
        * Файл с темами (`build/css/brand.module.css`)
        * Файлы, содержащий только токены темы:
            * SCSS (`build/scss/styles-theme-variables.scss`)
            * TS (`build/ts/styles-theme-variables.ts`)
        * Файл с темами подключается в проекте в корневую директорию, где нужно навесить классы на самую верхнюю обёртку
        * Файлы только с токенами подключаются в конкретном месте использования токенов
    * Сборка компонентных файлов (папка `build/scss/components`)
        * Для каждого компонента собирается свой scss, который содержит компонентные токены - они подключаются в конкретный компонент
    * Основные понятия для работы со **style-dictionary**
        * **Transform** - трансформеры для токенов - функция, которая принимает сырой токен и может его преобразовать в какой-либо формат
            * `scripts/buildStyleFiles/transformers`
            * См. https://amzn.github.io/style-dictionary/#/transforms
        * **Filter** - фильтр для токенов - функция, которая принимает токен и возвращает true/false - брать или не брать токен в итоговый список токенов
            * `scripts/buildStyleFiles/tokenFilters.ts`
            * См. https://amzn.github.io/style-dictionary/#/formats?id=filtering-tokens
        * **Format** - форматы для файлов - функция, которая принимает в себя итоговый список токенов и возвращает контент файла (т.е. на текущий момент - это контент scss файла)
            * `scripts/buildStyleFiles/fileFormatters`
            * См. https://amzn.github.io/style-dictionary/#/formats
        * Конфиги для **style-dictionary**
            * `scripts/buildStyleFiles/utils/getCSSModuleThemeConfig.ts` - конфиг для сборки тематического css-файла
            * `scripts/buildStyleFiles/utils/getSCSSThemeVariablesConfig.ts` - конфиг для сборки scss-файла с токенами
            * `scripts/buildStyleFiles/utils/getTSThemeVariablesConfig.ts` - конфиг для сборки ts-файла с токенами
            * `scripts/buildStyleFiles/utils/getComponentStylesConfig.ts` - конфиг для сборки компонентных scss файлов

## Как создать свою тему

TODO: добавить доки по хьютону

TODO: добавить доки по созданию форка
