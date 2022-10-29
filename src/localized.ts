import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { I18nManager } from 'react-native';
import { de } from './locales/de';
import { en } from './locales/en';

export const translations = {
  'de-DE': de,
  'en-EN': en,
};

export const Localized = (text: string) => {
  const isRightToLeft = Localization.isRTL;
  const i18n = new I18n(translations);
  
  // update layout direction
  I18nManager.forceRTL(isRightToLeft);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;

  return i18n.t(text);
};
