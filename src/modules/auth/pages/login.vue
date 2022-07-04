<template>
  <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
    {{ $t('Sign In') }}
  </h2>

  <BaseForm
    :submit-label="$t('Sign In')"
    @submit="onSubmit"
  >
    <FormKit
      v-model="model.email"
      type="email"
      :label="$t('Email')"
      :placeholder="$t('Enter your email')"
      validation="required|email"
      validation-visibility="dirty"
    />

    <FormKit
      v-model="model.password"
      type="password"
      :label="$t('Password')"
      :placeholder="$t('Enter your password')"
      validation="required"
      validation-visibility="dirty"
      :classes="{
        outer: 'w-full',
        input: 'w-full',
      }"
    />
  </BaseForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { error } from '@/components/common/NotificationPlugin'

const model = reactive({
  email: '',
  password: '',
})

function onSubmit() {
  error('Login not implemented yet')
}
</script>

<route lang="yaml">
name: Login
meta:
  layout: authLayout
</route>

<style>
</style>
