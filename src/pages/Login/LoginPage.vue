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
import { RouterLink, useRoute, useRouter } from 'vue-router'
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
    email: appConfig.VITE_EMAIL,
    password: appConfig.VITE_EMAIL
  }
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = undefined

  await userService
    .login({ user: values })
    .then(async ({ data }) => {
      login.login(data.user)

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
            <label for="email">{{ $t('UserModel.email') }}</label>
            <InputText
              id="email"
              type="email"
              autoComplete="username"
              v-model="email"
              :invalid="!!errors.email"
            />
            <small class="text-error">{{ errors.email }}</small>
          </div>

          <div class="flex flex-col gap-2">
            <label for="password">{{ $t('UserModel.password') }}</label>
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
            <Button rounded type="submit" :label="$t('action.Login')" :loading="isSubmitting" />
          </div>
          <div class="pt-6 text-center">
            <RouterLink :to="{ name: 'register', query: { url: routeQueryUrl } }">
              <Button
                type="button"
                text
                rounded
                :label="$t('action.Need_an_account')"
                severity="secondary"
              />
            </RouterLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
