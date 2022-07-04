<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DEFAULT_APP_TITLE } from '@/modules/common/config'

export default defineComponent({
  watch: {
    $route: {
      handler() {
        this.setTitle()
      },
      immediate: true,
    },
  },
  methods: {
    setTitle() {
      document.title = `${String(this.$route.name)} - ${DEFAULT_APP_TITLE}`
    },
  },
})
</script>
