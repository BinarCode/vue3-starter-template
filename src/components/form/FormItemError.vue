<template>
  <div :class="$attrs.class">
    <slot>

    </slot>
    <div class="min-h-error mb-1 mt-1">
      <div>
        <p :key="error" class="text-sm leading-none text-red-600">
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'FormItemError',
  inheritAttrs: false,
  props: {
    error: {
      type: String,
      default: ''
    },
  },
})
</script>
<style scoped>
.min-h-error {
  min-height: 12px;
}
</style>
