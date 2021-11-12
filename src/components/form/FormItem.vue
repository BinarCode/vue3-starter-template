<template>
  <div
    class="my-6"
    :class="[{
      'has-error': errorMessage,
    }, otherClasses]"
  >
    <label v-if="label || $slots.label"
           :for="String($attrs.id)"
           class="block text-sm font-medium text-gray-700"
    >
      <slot name="label">
        {{ label }}
        <span v-if="required" class="text-gray-500">
          *
        </span>
      </slot>
    </label>

    <div class="relative rounded-md">
      <FormItemError
        :error="errorMessage"
        :show-tooltip="inlineErrors"
      >
        <slot
          :handleChange="handleChange"
          :handleBlur="handleBlur"
          :inputValue="inputValue"
          :errorMessage="errorMessage"
        />

      </FormItemError>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from "vue";
import { useField } from "vee-validate";
import { XCircleIcon, InfoIcon } from '@zhuowenli/vue-feather-icons'
import FormItemError from "@/components/form/FormItemError.vue";

export default defineComponent({
  inheritAttrs: false,
  components: {
    InfoIcon,
    XCircleIcon,
    FormItemError,
  },
  props: {
    maxLength: {
      type: [Number, String],
      default: ''
    },
    name: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    labelInfo: {
      type: String,
      default: '',
    },
    infoText: {
      type: String,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    inlineErrors: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [String, Object],
      default: ''
    },
    layout: {
      type: String,
      default: 'vertical'
    },
    columnCount: {
      type: Number,
      default: 4,
    },
    showErrorIcon: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // we don't provide any rules here because we are using form-level validation
    // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
    const name = props.name || props.label
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(name, props.rules, {
      initialValue: props.modelValue,
    });

    provide('handleChange', handleChange)
    provide('handleBlur', handleBlur)

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
  computed: {
    hasSuffix() {
      return this.$slots.suffix || (this.clearable && this.modelValue)
    },
    otherClasses() {
      if (this.$attrs.class) {
        return this.$attrs.class
      }
      return ''
    }
  },
  watch: {
    modelValue(val, oldVal) {
      if (val && this.maxLength && val.length > this.maxLength) {
        this.$emit('update:modelValue', oldVal)
        this.inputValue = oldVal
        return
      }

      if (val !== this.inputValue) {
        this.inputValue = val
      }
    }
  }
})
</script>
