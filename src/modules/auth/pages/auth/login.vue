<template>

  <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">{{ $t('Sign In') }}</h2>

  <BaseForm
    v-slot="{ meta }"
    @submit="onSubmit">
    <BaseInput
      v-model="model.email"
      :label="$t('Email')"
      :placeholder="$t('Email')"
      :name="$t('Email')"
      rules="required|email"
    />

    <BaseInput
      v-model="model.password"
      :label="$t('Password')"
      :placeholder="$t('Password')"
      :name="$t('Password')"
      type="password"
      rules="required"
    />

    <BaseButton
      :disabled="!meta.valid"
      type="submit"
      class="mt-8"
      variant="primary"
      block
    >

      {{ $t('Sign In') }}
    </BaseButton>
    
  </BaseForm>

</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      model: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    onSubmit() {
      this.$error(this.$t('Login not implemented yet'))
    }
  }
})
</script>
<route lang="yaml">
name: Login
</route>
<style>
</style>
