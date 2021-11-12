<template>
  <VeeForm v-slot="{ handleSubmit, errors, meta }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <slot
        :handleSubmit="handleSubmit"
        :errors="errors"
        :meta="meta"
      />
    </form>
  </VeeForm>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Form as VeeForm } from 'vee-validate'

export default defineComponent({
  components: {
    VeeForm,
  },
  emits: ['submit'],
  methods: {
    onSubmit() {
      this.$emit('submit')
    }
  }
})
</script>
<style>
</style>
