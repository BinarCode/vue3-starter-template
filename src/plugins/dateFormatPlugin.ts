import { App } from 'vue'
import { formatDate } from '@/modules/common/utils/dateUtils'

export default {
  install(Vue: App) {
    Vue.config.globalProperties.$formatDate = formatDate
  },
}
