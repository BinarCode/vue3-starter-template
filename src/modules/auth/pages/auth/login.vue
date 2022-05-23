<template>

  <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">{{ $t('Sign In') }}</h2>
  
  <FormKit
    type="form"
    :submit-label="$t('Sign In')"
    @submit="onSubmit"
  >
    <FormKit
      type="email"
      :label="$t('Email')"
      :placeholder="$t('Enter your email')"
      validation="required|email"
    />

    <FormKit
      type="password"
      :label="$t('Password')"
      :placeholder="$t('Enter your password')"
      validation="required"
    >
    </FormKit>
  </FormKit>
  
</template>
<script lang="ts" setup>
import {reactive} from "vue";
import {error} from "@/components/common/NotificationPlugin";


const model = reactive({
  email: "",
  password: "",
})

function onSubmit() {
  error('Login not implemented yet')
}
</script>
<route lang="yaml">
name: Login
</route>
<style>
</style>
