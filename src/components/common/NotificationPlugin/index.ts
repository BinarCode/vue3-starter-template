import { App, createApp, reactive } from 'vue'
import Notifications from './Notifications.vue'

export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

export interface NotificationSettings {
  overlap: boolean
  verticalAlign: string
  horizontalAlign: string
  type: NotificationType
  timeout: number
  closeOnClick: boolean
  showClose: boolean
}

export interface Notification {
  message: string | Notification
  timestamp?: number | Date
  verticalAlign?: string
  horizontalAlign?: string
  type?: NotificationType
  timeout?: number
  closeOnClick?: boolean
  showClose?: boolean
  onClick?: Function
}

export interface NotificationStoreType {
  state: Notification[]
  settings: NotificationSettings
  removeNotification: Function
}

const NotificationStore = {
  state: [], // here the notifications will be added
  settings: {
    overlap: true,
    verticalAlign: 'top',
    horizontalAlign: 'right',
    type: NotificationType.Info,
    timeout: 5000,
    closeOnClick: true,
    showClose: true,
  },
  removeNotification,
} as NotificationStoreType

const store = reactive(NotificationStore)

function setOptions(options: NotificationSettings) {
  store.settings = Object.assign(store.settings, options)
}

function removeNotification(timestamp: number) {
  const indexToDelete = store.state.findIndex(n => n?.timestamp === timestamp)
  if (indexToDelete !== -1) {
    store.state.splice(indexToDelete, 1)
  }
}

function addNotification(notification: Notification | string) {
  if (typeof notification === 'string') {
    notification = { message: notification }
  }

  notification.timestamp = new Date()
  notification.timestamp.setMilliseconds(
    notification.timestamp.getMilliseconds() + store.state.length,
  )
  notification = Object.assign({}, store.settings, notification)
  store.state.push(notification)
}

function _notify(notification: Notification) {
  if (Array.isArray(notification)) {
    notification.forEach((notificationInstance) => {
      addNotification(notificationInstance)
    })
  } else {
    addNotification(notification)
  }
}

function parseNotification(notification: Notification | string): Notification {
  if (typeof notification === 'string') {
    return {
      message: notification,
    }
  }
  return notification
}

const methods: any = {
  notify: _notify,
  error(notification: Notification | string) {
    _notify({
      type: NotificationType.Error,
      ...parseNotification(notification),
    })
  },
  warning(notification: Notification | string) {
    _notify({
      type: NotificationType.Warning,
      ...parseNotification(notification),
    })
  },
  info(notification: Notification | string) {
    _notify({
      type: NotificationType.Info,
      ...parseNotification(notification),
    })
  },
  success(notification: Notification | string) {
    _notify({
      type: NotificationType.Success,
      ...parseNotification(notification),
    })
  },
}

const NotificationsPlugin = {
  install(Vue: App, options: NotificationSettings) {
    Object.keys(methods).forEach((method) => {
      Vue.config.globalProperties[`$${method}`] = methods[method]
    })
    Vue.config.globalProperties.$notifications = store

    if (options) {
      setOptions(options)
    }

    mountNotificationsPlugin()
  },
}

function mountNotificationsPlugin() {
  const node = document.createElement('section')
  node.classList.add('notifications-group')

  document.firstElementChild?.insertBefore(node, document.body)
  const notificationsApp = createApp(Notifications)
  notificationsApp.config.globalProperties.$notifications = store

  notificationsApp.mount(node)
}

export const error = methods.error
export const success = methods.success
export const warning = methods.warning
export const info = methods.info
export const notify = methods.notify
export const notifications = store

export default NotificationsPlugin
