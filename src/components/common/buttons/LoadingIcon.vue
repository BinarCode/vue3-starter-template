<template>
  <LoaderIcon
    class="spin-animation"
    :class="{
      'h-4 w-4': size === 'xs',
      'h-5 w-5': size === 'sm',
      'h-5 w-5': !['xs', 'sm'].includes(size),
    }"
  />
</template>

<script lang="ts">
import { LoaderIcon } from '@zhuowenli/vue-feather-icons'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    LoaderIcon,
  },
  props: {
    size: {
      type: String,
      default: 'md',
    },
  },
})
</script>

<style>
</style>
