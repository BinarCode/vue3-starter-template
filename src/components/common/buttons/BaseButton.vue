<template>
  <button
    v-bind="$attrs"
    ref="button"
    :type="type"
    :disabled="disabled || loading"
    class="items-center justify-center border border-transparent rounded-md shadow-sm font-medium focus:outline-none focus:ring-gray-600 focus:border-gray-600 transition ease-in-out duration-150"
    :class="{
      'text-white bg-blue-600 hover:bg-blue-700': variant === 'primary',
      'text-xs px-2.5 py-1.5 leading-4': size === 'xs',
      'text-sm px-4 py-2 leading-4': size === 'sm',
      'text-sm px-5 py-2 leading-5': size === 'md',
      'text-base px-6 py-4 leading-6': size === 'lg',
      'text-base px-8 py-4 leading-6': size === 'xl',
      'opacity-50 cursor-not-allowed': disabled || loading,
      'inline-flex': !block,
      'w-full flex justify-center': block,
    }"
  >
    <span
      v-if="loading"
      class="absolute flex w-full items-center justify-center"
    >
      <LoadingIcon :size="size" />
    </span>

    <span
      class="flex flex-wrap items-center"
      :class="{ 'opacity-0': loading }"
    >
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import LoadingIcon from '@/components/common/buttons/LoadingIcon.vue'

type ButtonType = 'button' | 'submit' | 'reset' | undefined

export default defineComponent({
  components: {
    LoadingIcon,
  },
  inheritAttrs: false,
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'primary',
    },
    type: {
      type: String as PropType<ButtonType>,
      default: 'button',
    },
    size: {
      type: String,
      default: 'md', // xs|sm|md|lg|xl
    },
  },
  methods: {
    focus() {
      this.$refs.button?.focus()
    },
  },
})
</script>

<style lang="scss" scoped>
.base-button {
  &:focus {
    @apply ring-1 ring-blue-500;
  }
}
</style>
