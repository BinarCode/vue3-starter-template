<template>
  <div
    class="notification-item"
    role="status"
    aria-live="polite"
    :class="[{ 'alert-with-icon': icon }, verticalAlign, horizontalAlign, alertType]"
    :style="customPosition"
  >
    <transition
      appear
      appear-active-class="transform ease-out duration-300 transition"
      appear-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      appear-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="showNotification"
        class="max-w-sm bg-white dark:bg-gray-900 shadow-lg rounded-lg pointer-events-auto"
      >
        <div
          class="rounded-lg shadow-xs overflow-hidden"
          @click="tryClose"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div
                class="h-6 w-6 flex justify-center items-center rounded-full"
                :class="{
                  'bg-green-200': type === 'success',
                  'bg-blue-200': type === 'info',
                  'bg-red-200': type === 'error',
                  'bg-yellow-200': type === 'warning',
                }"
              >
                <svg
                  class="h-4 w-4"
                  :class="{
                    'text-green-600': type === 'success',
                    'text-blue-600': type === 'info',
                    'text-red-600': type === 'error',
                    'text-yellow-600': type === 'warning',
                  }"
                  stroke="currentColor" fill="none" viewBox="0 0 24 24"
                >
                  <path
                    v-if="type === 'error' || type === 'warning'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                  <path
                    v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <div
                  v-if="message"
                  class="text-sm leading-5 font-medium text-gray-900 dark:text-white"
                  v-html="message"
                />
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  v-if="showClose"
                  class="inline-flex text-gray-400 dark:text-white focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                  @click="tryClose"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { NotificationType } from './index'

export default defineComponent({
  name: 'Notification',
  props: {
    message: [String, Object],
    title: String,
    icon: String,
    verticalAlign: {
      type: String,
      default: 'top',
      validator: (value: string) => {
        const acceptedValues = ['top', 'bottom']
        return acceptedValues.includes(value)
      },
    },
    horizontalAlign: {
      type: String,
      default: 'right',
      validator: (value: string) => {
        const acceptedValues = ['left', 'center', 'right']
        return acceptedValues.includes(value)
      },
    },
    type: {
      type: String as PropType<NotificationType>,
      default: 'info',
    },
    timeout: {
      type: Number,
      default: 5000,
      validator: (value: number) => {
        return value >= 0
      },
    },
    timestamp: {
      type: [Date, Number],
      default: () => new Date(),
    },
    component: {
      type: [Object, Function],
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    clickHandler: Function,
  },
  emits: ['close'],
  data() {
    return {
      elmHeight: 0,
      showNotification: true,
    }
  },
  computed: {
    hasIcon() {
      return this.icon && this.icon.length > 0
    },
    alertType() {
      return `notification-${this.type}`
    },
    customPosition() {
      const initialMargin = 20
      const alertHeight = this.elmHeight + 10
      let sameAlertsCount = this.$notifications.state.filter((alert) => {
        return (
          alert.horizontalAlign === this.horizontalAlign
          && alert.verticalAlign === this.verticalAlign
          && alert.timestamp && alert.timestamp <= this.timestamp
        )
      }).length
      if (this.$notifications.settings.overlap) {
        sameAlertsCount = 1
      }

      const pixels = (sameAlertsCount - 1) * alertHeight + initialMargin
      const styles: any = {}
      if (this.verticalAlign === 'top') {
        styles.top = `${pixels}px`
      } else {
        styles.bottom = `${pixels}px`
      }

      return styles
    },
  },
  mounted() {
    this.elmHeight = this.$el.clientHeight
    if (this.timeout) {
      setTimeout(this.close, this.timeout)
    }
  },
  methods: {
    close() {
      this.showNotification = false
      // We need this for leave transitions to work
      setTimeout(() => {
        this.$emit('close', this.timestamp)
      }, 500)
    },
    tryClose(evt: Event) {
      if (this.clickHandler) {
        this.clickHandler(evt, this)
      }

      if (this.closeOnClick) {
        this.close()
      }
    },
  },
})
</script>

<style lang="scss">
.notifications .notification-item {
  position: fixed;
  z-index: 10000;
  width: 400px;
  cursor: pointer;

  &.center {
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  &.left {
    left: 20px;
  }

  &.right {
    right: 20px;
  }
}
</style>
