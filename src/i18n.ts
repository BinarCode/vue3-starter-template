import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'

type MessageSchema = typeof en

const i18n = createI18n<[MessageSchema]>({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': en,
  },
  silentTranslationWarn: true,
})

export default {
  i18n,
  install(app: App) {
    app.config.globalProperties.$t = i18n.global.t
    app.config.globalProperties.$i18n = i18n
  },
  t: i18n.global.t,
}
