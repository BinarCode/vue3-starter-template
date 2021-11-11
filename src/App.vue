<template>
  <notifications />
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { DEFAULT_APP_TITLE } from "@/modules/common/config";

export default defineComponent({
  methods: {
    setTitle() {
      document.title = `${String(this.$route.name)} - ${DEFAULT_APP_TITLE}`
    } 
  },
  watch: {
    $route: {
      handler() {
        this.setTitle()
      },
      immediate: true
    }
  }
})
</script>
