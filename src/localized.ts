import * as Localization from 'expo-localization';
import { I18n, Scope, TranslateOptions } from 'i18n-js';
import { I18nManager } from 'react-native';
import { de } from './locales/de';
import { en } from './locales/en';

export const Localize = (scope: Scope, options?: TranslateOptions) => Localized.getInstance().i18n.t(scope, options);

class Localized {
  private static localized: Localized;
  public translations: {};
  public i18n: I18n;

  private constructor() {
    this.translations = {
      'de': de,
      'de-DE': de,
      'en': en,
      'en-EN': en,
    };

    this.i18n = new I18n(this.translations);

    // update layout direction
    I18nManager.forceRTL(Localization.isRTL);

    this.i18n.locale = Localization.locale;
    this.i18n.enableFallback = true;
  }

  public static getInstance(): Localized {
    if (!Localized.localized) {
      Localized.localized = new Localized();
    }

    return Localized.localized;
  }
}
