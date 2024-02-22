"use client";

import { Locale, i18n } from "@/config/i18n.config";
import { defaultDictionaries } from "./default-dictionaries";

export const getDictionaryUseClient = (locale: Locale) => {
  return (
    defaultDictionaries[locale] ??
    defaultDictionaries[i18n.defaultLocale as Locale]
  );
};
