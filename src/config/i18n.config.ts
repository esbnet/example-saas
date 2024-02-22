const langs = ["pt-BR", "en-US"] as const;
const defaultLocale = "pt-BR";

const locales = langs as unknown as string[];

export const i18n = { defaultLocale, locales, localeDtection: true };

export type Locale = (typeof langs)[number];
