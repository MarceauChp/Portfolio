import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import frTranslation from './locales/fr.json';
import enTranslation from './locales/en.json';
import jaTranslation from './locales/ja.json';
import koTranslation from './locales/ko.json';
import zhTranslation from './locales/zh.json';

export const SUPPORTED_LANGUAGES = [
  {
    code: 'fr',
    label: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷',
    flagImg: '/assets/img/flags/fr.jpg',
    shortLabel: 'FR',
  },
  {
    code: 'en',
    label: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    flagImg: '/assets/img/flags/en.png',
    shortLabel: 'EN',
  },
  {
    code: 'ja',
    label: '日本語',
    nativeName: '日本語',
    flag: '🇯🇵',
    flagImg: '/assets/img/flags/jp.png',
    shortLabel: 'JA',
  },
  {
    code: 'ko',
    label: '한국어',
    nativeName: '한국어',
    flag: '🇰🇷',
    flagImg: '/assets/img/flags/kr.png',
    shortLabel: 'KO',
  },
  {
    code: 'zh',
    label: '中文',
    nativeName: '简体中文',
    flag: '🇨🇳',
    flagImg: '/assets/img/flags/cn.png',
    shortLabel: 'ZH',
  },
] as const;

export type SupportedLanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: frTranslation },
      en: { translation: enTranslation },
      ja: { translation: jaTranslation },
      ko: { translation: koTranslation },
      zh: { translation: zhTranslation },
    },
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en', 'ja', 'ko', 'zh'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
