<script setup lang="ts">
import { useLoginStore } from '@/stores/login'
import ItemSlot from '../Slots/ItemSlot.vue'
import ProfileImageBtn from '../Profile/ProfileImageBtn.vue'
import Textarea from 'primevue/textarea'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import { commentService } from '@/libs/services/commentService'
import { useToast } from 'primevue/usetoast'
import { type HTMLAttributes } from 'vue'
import { cn } from '@/libs/utils'

const props = defineProps<{
  slug: string
  connectLinePrev?: boolean
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  close: []
}>()

const toast = useToast()
const query = commentService.query(props.slug)
const login = useLoginStore()
const { t } = useI18n()

const formSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, { message: t('message.required') })
})

const { defineField, handleSubmit, errors, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    body: ''
  }
})

const [body] = defineField('body')

const onSubmit = handleSubmit(async (values) => {
  await commentService
    .addComments(props.slug, { comment: values })
    .then(async () => {
      await query.refetch()
      resetForm()
      emit('close')
      toast.add({ severity: 'success', summary: t('message.AddSuccess'), life: 3000 })
    })
    .catch(() => {
      toast.add({ severity: 'error', summary: t('message.AddFail'), life: 3000 })
    })
})
</script>
<template>
  <ItemSlot :class="cn('p-0', props.class)" :connectLinePrev="connectLinePrev">
    <template #ProfileImage>
      <ProfileImageBtn v-bind="login.user" />
    </template>
    <template #content>
      <form @submit="onSubmit" novalidate class="flex flex-col gap-2">
        <Textarea
          v-model="body"
          autoResize
          class="min-h-16 w-full"
          :placeholder="$t('AddCommentModel.body')"
          :invalid="!!errors.body"
        />
        <div class="flex w-full justify-end">
          <Button
            rounded
            type="submit"
            :label="$t('action.Comment')"
            :loading="isSubmitting"
            size="small"
          />
        </div>
      </form>
    </template>
  </ItemSlot>
</template>
