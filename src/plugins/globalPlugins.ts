import { App } from "vue";
import copyToClipboard from "@/plugins/copyToClipboard";
import NotificationsPlugin from "@/components/common/NotificationPlugin";

export default {
  install(Vue: App) {
    Vue.use(copyToClipboard)
    Vue.use(NotificationsPlugin)
  }
}
