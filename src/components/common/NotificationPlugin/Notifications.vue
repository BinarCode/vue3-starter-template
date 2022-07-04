<template>
  <div class="notifications">
    <transition-group
      :name="transitionName"
      :mode="transitionMode"
    >
      <Notification
        v-for="(notification, index) in notifications"
        v-bind="notification"
        :key="notificationKey(notification, index)"
        :click-handler="notification.onClick"
        @close="removeNotification"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Notification from './Notification.vue'
import { Notification as NotificationType } from './index'

export default defineComponent({
  components: {
    Notification,
  },
  props: {
    transitionName: {
      type: String,
      default: 'list',
    },
    transitionMode: {
      type: String,
      default: 'in-out',
    },
    overlap: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      notifications: this.$notifications?.state || [],
    }
  },
  watch: {
    overlap(newVal: boolean) {
      this.$notifications.settings.overlap = newVal
    },
  },
  created() {
    if (this.$notifications) {
      this.$notifications.settings.overlap = this.overlap
    }
  },
  methods: {
    notificationKey(notification: NotificationType, index: number) {
      if (notification.timestamp && notification.timestamp instanceof Date) {
        return notification.timestamp.getTime()
      }

      return index
    },
    removeNotification(timestamp: number) {
      this.$notifications.removeNotification(timestamp)
    },
  },
})
</script>

<style lang="scss">
.notifications {
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }

  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }

  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }

  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}
</style>
