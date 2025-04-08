import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defaultConfig, plugin as formKitPlugin } from '@formkit/vue'
import App from './App.vue'
import router from './router/router'
import i18n from '@/i18n'
import globalPlugins from '@/plugins/globalPlugins'

import '@formkit/themes/genesis'
import '@/assets/css/index.css'

import './modules/common/apiConfig'
createApp(App)
  .use(createPinia())
  .use(router)
  .use(globalPlugins)
  .use(formKitPlugin, defaultConfig)
  .use(i18n)
  .mount('#app')
