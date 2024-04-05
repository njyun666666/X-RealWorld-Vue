<script setup lang="ts">
import Brand from '@/components/Brand.vue'
import type { ResponseErrors } from '@/libs/api/realworldAPI'
import { loginService } from '@/libs/services/loginService'
import Page from '@/pages/Page.vue'
import type { AxiosError } from 'axios'
import { useLoginStore } from '@/stores/login'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { useI18n } from 'vue-i18n'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const login = useLoginStore()
const { t } = useI18n()
const router = useRouter()

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
    email: 'njyun@example.com',
    password: 'njyun@example.com'
  }
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  await loginService
    .login({ user: values })
    .then(async ({ data }) => {
      login.setUser(data.user)
      await router.push({ name: 'index' })
    })
    .catch((error: AxiosError<ResponseErrors>) => {
      console.log(error)
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
            <div class="flex flex-col gap-2">
              <label for="email">{{ $t('field.email') }}</label>
              <InputText
                id="email"
                autoComplete="username"
                v-model="email"
                :invalid="!!errors.email"
              />
              <small class="text-error">{{ errors.email }}</small>
            </div>

            <div class="flex flex-col gap-2">
              <label for="password">{{ $t('field.password') }}</label>
              <InputText
                id="password"
                type="password"
                autoComplete="current-password"
                v-model="password"
                :invalid="!!errors.password"
              />
              <small class="text-error">{{ errors.password }}</small>
            </div>

            <div class="text-center">
              <Button type="submit" :label="$t('login.login')" :loading="isSubmitting" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </Page>
</template>
