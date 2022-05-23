import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import '@formkit/themes/genesis'
import '@/assets/css/index.scss'
import i18n from "@/i18n";
import globalPlugins from "@/plugins/globalPlugins";
import globalComponents from "@/plugins/globalComponents";
import { createPinia } from 'pinia'
import { plugin as formKitPlugin, defaultConfig } from '@formkit/vue'
createApp(App)
  .use(createPinia())
  .use(i18n)
  .use(router)
  .use(globalPlugins)
  .use(globalComponents)
  .use(formKitPlugin, defaultConfig)
  .mount('#app')

import './modules/common/apiConfig'
