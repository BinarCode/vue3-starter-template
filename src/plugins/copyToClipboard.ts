import { App } from 'vue'
import { success } from '@/components/common/NotificationPlugin'

function copyToClipboard(value: string, message = 'Text copied to clipboard.') {
  const el = document.createElement('textarea')

  el.value = value

  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  success(message)
}

export default {
  install(Vue: App) {
    Vue.config.globalProperties.$copyToClipboard = copyToClipboard
  },
}
