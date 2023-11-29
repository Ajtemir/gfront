import {getRequestConfig} from 'next-intl/server';

const Locales = ['ru', 'en', 'kg'] as const;
type Locale = typeof Locales[number]

const DefaultLocale: Locale = 'ru';

type LocaleOption = {
  [key in Locale]: {
    icon: string;
    label: string;
  };
}

const LocaleOptions: LocaleOption = {
  ru: {
    label: 'Russian',
    icon: '/icons/ru_flag.svg'
  },
  en: {
    label: 'English',
    icon: '/icons/us_flag.svg'
  },
  kg: {
    label: 'Kyrgyz',
    icon: '/icons/ru_flag.svg'
  }
}

export default getRequestConfig(async ({locale}) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}));

export {
  Locales,
  type Locale,
  DefaultLocale,
  type LocaleOption,
  LocaleOptions,
}