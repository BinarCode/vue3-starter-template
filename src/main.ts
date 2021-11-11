import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import '@/assets/css/index.scss'
import i18n from "@/i18n";
import store from "@/store";
import globalPlugins from "@/plugins/globalPlugins";
import globalComponents from "@/plugins/globalComponents";

createApp(App)
  .use(store)
  .use(i18n)
  .use(router)
  .use(globalPlugins)
  .use(globalComponents)
  .mount('#app')

import './modules/common/apiConfig'
