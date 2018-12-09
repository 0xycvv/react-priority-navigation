export const classNames = (...args: Array<string | undefined>) =>
  args.filter(Boolean).join(' ');

export const css = (styles: TemplateStringsArray) => styles;
