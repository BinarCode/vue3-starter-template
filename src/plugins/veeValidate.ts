import { defineRule, configure } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';

export default {
  install() {
    configure({
      generateMessage: localize({
        en,
      })
    })
    Object.keys(AllRules).forEach(rule => {
      const validationRule = AllRules[rule]
      if (typeof validationRule === 'function') {
        defineRule(rule, validationRule);
      }
    });

    defineRule('email', (value: string) => {
      if (!value || /(^$)|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        return true
      }
      return 'This field must be a valid email';
    });

    defineRule('url', (value: string) => {
      if (!/(^$)|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(value)) {
        return 'This field must be a valid url';
      }
      return true;
    });
  }
}
