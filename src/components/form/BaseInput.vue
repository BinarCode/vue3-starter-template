<template>

  <FormItem v-bind="allAttributes">
    <!--Pass through all slots to FormItem-->
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData"/>
    </template>

    <template
      #default="{
        handleBlur, 
        inputValue,
        errorMessage,
        handleChange, 
      }"
    >
      <slot>
        <input
          v-bind="$attrs"
          :value="inputValue"
          :type="type"
          :name="name || label"
          :class="{
            'form-input-error': errorMessage,
            'pl-8': $slots.prefix,
            'bg-gray-100 dark:bg-gray-700 cursor-not-allowed': $attrs.disabled,
            'dark:bg-gray-800': !$attrs.disabled && $attrs.readonly === undefined,
            'cursor-not-allowed bg-gray-100 dark:bg-gray-700 focus:shadow-none focus:border-transparent': $attrs.readonly !== undefined,
          }"
          ref="input"
          class="form-input"
          @focus="onFocus"
          @blur="onBlur(handleBlur)"
          @input="onInput($event, handleChange)"
        />
      </slot>
    </template>
  </FormItem>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormItem from "@/components/form/FormItem.vue";

export default defineComponent({
  name: 'BaseInput',
  components: {
    FormItem,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: [String],
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  computed: {
    allAttributes() {
      return {
        ...this.$attrs,
        ...this.$props,
      }
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    onFocus() {
      if (this.type !== 'number') {
        return
      }
    },
    onBlur(handleBlur: Function) {
      handleBlur && handleBlur()
      if (this.type !== 'number') {
        return
      }
      if (this.modelValue === '') {
        this.$emit('update:modelValue', 0)
      }
    },
    onInput(evt: any, handleChange: Function) {
      this.$emit('update:modelValue', evt.target.value || null)
      handleChange && handleChange(evt)
    },
    clearInput() {
      this.$emit('update:modelValue', '')
    },
  }
  
})
</script>

<style scoped>
</style>
