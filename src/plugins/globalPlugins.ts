import { App } from 'vue'
import copyToClipboard from '@/plugins/copyToClipboard'
import NotificationsPlugin from '@/components/common/NotificationPlugin'
import dateFormatPlugin from '@/plugins/dateFormatPlugin'

export default {
  install(Vue: App) {
    Vue.use(copyToClipboard)
    Vue.use(dateFormatPlugin)
    Vue.use(NotificationsPlugin)
  },
}
