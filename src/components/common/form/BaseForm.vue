<template>
  <div ref="form" class="form-wrapper">
    <FormKit
      type="form"
      v-bind="$attrs"
      @submit="$emit('submit', $event)"
    >
      <slot />
    </FormKit>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['submit'])
</script>

<style scoped lang="postcss">
.form-wrapper:deep(button),
.form-wrapper:deep(.formkit-outer[data-type="submit"]) {
  @apply mb-0
}
.form-wrapper:deep(input) {
  width: 100%;
  box-sizing: border-box;
}
.form-wrapper:deep(.formkit-messages + .formkit-actions) {
  @apply mt-1;
}
</style>
