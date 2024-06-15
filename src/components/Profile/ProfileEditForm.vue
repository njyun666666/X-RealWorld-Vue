<script setup lang="ts">
import { inject, onMounted, ref, type ComputedRef } from 'vue'
import { useLoginStore } from '@/stores/login'
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { userService, type UserUpdate } from '@/libs/services/userService'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { useProfileStore } from '@/stores/profile'

const toast = useToast()
const login = useLoginStore()
const profileStore = useProfileStore()
const { t } = useI18n()
const data = ref<UserUpdate>()

const dialogRef = inject('dialogRef') as ComputedRef<DynamicDialogInstance>

const closeDialog = () => {
  dialogRef.value.close()
}

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: t('message.required') }),
  bio: z
    .string()
    .trim()
    .min(1, { message: t('message.required') }),
  image: z
    .string()
    .trim()
    .min(1, { message: t('message.required') })
})

const { defineField, handleSubmit, errors, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {}
})

const [email] = defineField('email')
const [bio] = defineField('bio')
const [image] = defineField('image')
// https://api.realworld.io/images/smiley-cyrus.jpeg

const onSubmit = handleSubmit(async (values) => {
  await userService
    .update({ user: values })
    .then(async ({ data }) => {
      login.setUser(data.user)
      profileStore.mergeProfile({
        ...data.user,
        following: false
      })
      closeDialog()
      toast.add({ severity: 'success', summary: t('message.EditSuccess'), life: 3000 })
    })
    .catch(() => {
      toast.add({ severity: 'error', summary: t('message.EditFail'), life: 3000 })
    })
})

onMounted(() => {
  const params = dialogRef.value.data
  data.value = params.data as UserUpdate
  resetForm({ values: data.value })
})
</script>
<template>
  <form @submit="onSubmit" novalidate class="flex flex-col gap-2">
    <div class="flex flex-col gap-2">
      <label for="email">{{ $t('UserUpdateModel.email') }}</label>
      <InputText id="email" type="email" v-model="email" :invalid="!!errors.email" />
      <small class="text-error">{{ errors.email }}</small>
    </div>
    <div class="flex flex-col gap-2">
      <label for="bio">{{ $t('UserUpdateModel.bio') }}</label>
      <Textarea v-model="bio" autoResize class="min-h-16 w-full" :invalid="!!errors.bio" />
      <small class="text-error">{{ errors.email }}</small>
    </div>
    <div class="flex flex-col gap-2">
      <label for="image">{{ $t('UserUpdateModel.image') }}</label>
      <InputText id="image" type="text" v-model="image" :invalid="!!errors.image" />
      <small class="text-error">{{ errors.image }}</small>
    </div>

    <div class="flex w-full justify-end">
      <Button
        rounded
        type="submit"
        :label="$t('action.Save')"
        :loading="isSubmitting"
        size="small"
        :pt="{ label: { class: '!font-bold' } }"
      />
    </div>
  </form>
</template>
