<script setup lang="ts">
import { ref } from 'vue'
import Brand from '@/components/Brand.vue'
import type { ResponseErrors } from '@/libs/api/realworldAPI'
import { userService } from '@/libs/services/userService'
import type { AxiosError } from 'axios'
import { useLoginStore } from '@/stores/login'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { useI18n } from 'vue-i18n'
import { toTypedSchema } from '@vee-validate/zod'
import { useRoute, useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import ErrorMessage from '@/components/ErrorMessage.vue'
import appConfig from '@/appConfig'

const login = useLoginStore()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const routeQueryUrl = route.query['url']
const errorMessage = ref<ResponseErrors>()

const formSchema = z
  .object({
    username: z
      .string({ required_error: t('message.required') })
      .trim()
      .min(1, { message: t('message.required') }),
    email: z
      .string({ required_error: t('message.required') })
      .email({ message: t('message.InvalidEmail') })
      .trim()
      .min(1, { message: t('message.required') })
      .toLowerCase(),
    password: z
      .string({ required_error: t('message.required') })
      .trim()
      .min(1, { message: t('message.required') }),
    confirm: z
      .string({ required_error: t('message.required') })
      .trim()
      .min(1, { message: t('message.required') })
  })
  .refine((data) => data.password === data.confirm, {
    message: t('message.Password_dont_match'),
    path: ['confirm']
  })

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    username: appConfig.VITE_USERNAME,
    email: appConfig.VITE_EMAIL,
    password: appConfig.VITE_EMAIL,
    confirm: appConfig.VITE_EMAIL
  }
})

const [username] = defineField('username')
const [email] = defineField('email')
const [password] = defineField('password')
const [confirm] = defineField('confirm')

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = undefined

  await userService
    .registration({ user: values })
    .then(async ({ data }) => {
      login.setUser(data.user)

      if (routeQueryUrl) {
        await router.push(routeQueryUrl as string)
      } else {
        await router.push({ name: 'index' })
      }
    })
    .catch((error: AxiosError<ResponseErrors>) => {
      errorMessage.value = error.response!.data
    })
})
</script>

<template>
  <div className="flex w-full flex-col items-center p-2">
    <div className="mb-16 mt-8">
      <Brand />
    </div>
    <div className="w-full md:w-2/5 text-center">
      <form @submit="onSubmit" novalidate>
        <div class="flex flex-col gap-5 text-left">
          <ErrorMessage keypath="UserModel" :errors="errorMessage"> </ErrorMessage>

          <div class="flex flex-col gap-2">
            <label for="username">{{ $t('UserModel.username') }}</label>
            <InputText id="username" v-model="username" :invalid="!!errors.username" />
            <small class="text-error">{{ errors.username }}</small>
          </div>

          <div class="flex flex-col gap-2">
            <label for="email">{{ $t('UserModel.email') }}</label>
            <InputText id="email" type="email" v-model="email" :invalid="!!errors.email" />
            <small class="text-error">{{ errors.email }}</small>
          </div>

          <div class="flex flex-col gap-2">
            <label for="password">{{ $t('UserModel.password') }}</label>
            <InputText
              id="password"
              type="password"
              v-model="password"
              :invalid="!!errors.password"
            />
            <small class="text-error">{{ errors.password }}</small>
          </div>

          <div class="flex flex-col gap-2">
            <label for="confirm">{{ $t('UserModel.confirm') }}</label>
            <InputText id="confirm" type="password" v-model="confirm" :invalid="!!errors.confirm" />
            <small class="text-error">{{ errors.confirm }}</small>
          </div>

          <div class="text-center">
            <Button rounded type="submit" :label="$t('action.Register')" :loading="isSubmitting" />
          </div>
          <div class="pt-6 text-center">
            <RouterLink :to="{ name: 'login', query: { url: routeQueryUrl } }">
              <Button
                type="button"
                text
                rounded
                :label="$t('action.Have_an_account')"
                severity="secondary"
              />
            </RouterLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
