<script setup lang="ts">
import Brand from '@/components/Brand.vue'
import type { ResponseErrors } from '@/libs/api/pmAPI'
import { loginService } from '@/libs/services/loginService'
import Page from '@/pages/Page.vue'
import type { AxiosError } from 'axios'
import { useLoginStore } from '@/stores/login'
import router from '@/router'

const login = useLoginStore()

const onSubmit = async () => {
  await loginService
    .login({
      email: 'admin@example.com',
      password: 'demo123456'
    })
    .then(({ data }) => {
      console.log(data)
      login.setToken(data)
      router.push('/')
    })
    .catch((error: AxiosError<ResponseErrors>) => {
      console.log(error.response?.data)
    })
}
</script>

<template>
  <Page title="Login">
    <div className="flex w-full flex-col items-center p-2">
      <div className="mb-16 mt-8">
        <Brand />
      </div>
      <div className="w-full md:w-2/5 text-center">
        <button @click="onSubmit" class="rounded bg-primary p-2">Login</button>
      </div>
    </div>
  </Page>
</template>
