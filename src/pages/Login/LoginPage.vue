<script setup lang="ts">
import Brand from '@/components/Brand.vue'
import type { ResponseErrors } from '@/libs/api/pmAPI'
import { loginService } from '@/libs/services/loginService'
import Page from '@/pages/Page.vue'
import type { AxiosError } from 'axios'
import { useLoginStore } from '@/stores/login'
import router from '@/router'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { useI18n } from 'vue-i18n'
import { toTypedSchema } from '@vee-validate/zod'
import { cn } from '@/libs/utils'

const login = useLoginStore()
const { t } = useI18n()

const formSchema = z.object({
  email: z
    .string()
    .email({ message: t('message.InvalidEmail') })
    .trim()
    .min(1, { message: t('message.required') })
    .toLowerCase(),
  password: z
    .string()
    .trim()
    .min(1, { message: t('message.required') })
})

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    email: 'admin@example.com',
    password: 'demo123456'
  }
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  await loginService
    .login(values)
    .then(async ({ data }) => {
      login.setToken(data)
      await router.push('/')
    })
    .catch((error: AxiosError<ResponseErrors>) => {
      console.log(error.response?.data)
    })
})
</script>

<template>
  <Page :title="$t('login.title')">
    <div className="flex w-full flex-col items-center p-2">
      <div className="mb-16 mt-8">
        <Brand />
      </div>
      <div className="w-full md:w-2/5 text-center">
        <form @submit="onSubmit">
          <div class="space-y-5 text-left">
            <div>
              <div>{{ $t('field.email') }}</div>
              <input name="email" v-model="email" type="email" class="w-full rounded p-2" />
              <div class="text-red-500">{{ errors.email }}</div>
            </div>

            <div>
              <div>{{ $t('field.password') }}</div>
              <input
                name="password"
                v-model="password"
                type="password"
                class="w-full rounded p-2"
              />
              <div class="text-red-500">{{ errors.password }}</div>
            </div>

            <div class="text-center">
              <button
                type="submit"
                :class="cn('rounded bg-primary p-2', { 'bg-surface-500': isSubmitting })"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'submitting' : $t('login.login') }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Page>
</template>
