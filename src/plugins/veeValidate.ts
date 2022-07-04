import { configure, defineRule } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'

export default {
  install() {
    configure({
      generateMessage: localize({
        en,
      }),
    })
    Object.keys(AllRules).forEach((rule) => {
      const validationRule = AllRules[rule]
      if (typeof validationRule === 'function') {
        defineRule(rule, validationRule)
      }
    })
  },
}
