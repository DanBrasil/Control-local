import { css, type DefaultTheme, type Interpolation } from "styled-components";

type BreakpointKey = keyof DefaultTheme["breakpoints"];

const breakpointValue = (theme: DefaultTheme, key: BreakpointKey): string => {
  return theme.breakpoints[key];
};

const maxWidthFor = (theme: DefaultTheme, key: BreakpointKey): string => {
  const raw = breakpointValue(theme, key).replace("px", "");
  const numeric = Number(raw);

  if (Number.isNaN(numeric)) {
    return breakpointValue(theme, key);
  }

  return `${numeric - 1}px`;
};

export const media = {
  down:
    (key: BreakpointKey) =>
    (
      strings: TemplateStringsArray,
      ...interpolations: Interpolation<any>[]
    ) => css`
      @media (max-width: ${({ theme }) => maxWidthFor(theme, key)}) {
        ${css(strings, ...interpolations)}
      }
    `,

  up:
    (key: BreakpointKey) =>
    (
      strings: TemplateStringsArray,
      ...interpolations: Interpolation<any>[]
    ) => css`
      @media (min-width: ${({ theme }) => breakpointValue(theme, key)}) {
        ${css(strings, ...interpolations)}
      }
    `,
};
