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
import { useToast } from 'primevue/usetoast'
import { ref, type HTMLAttributes } from 'vue'
import { cn } from '@/libs/utils'
import InputChips from 'primevue/chips'
import { articleService } from '@/libs/services/articleService'
import { useArticleStore } from '@/stores/article'

const props = withDefaults(
  defineProps<{
    expand?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    expand: false
  }
)

const emit = defineEmits<{
  close: []
}>()

const expand = ref(props.expand)
const articleStore = useArticleStore()
const toast = useToast()
const login = useLoginStore()
const { t } = useI18n()

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: t('message.required') }),
  description: z
    .string()
    .trim()
    .min(1, { message: t('message.required') }),
  body: z
    .string()
    .trim()
    .min(1, { message: t('message.required') }),
  tagList: z.string().trim().array().optional()
})

const { defineField, handleSubmit, errors, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {}
})

const [title] = defineField('title')
const [description] = defineField('description')
const [body] = defineField('body')
const [tagList] = defineField('tagList')

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  await articleService
    .createArticle({ article: values })
    .then(async ({ data }) => {
      articleStore.mergeArticle(data.article)
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
  <ItemSlot :class="cn('p-0', props.class)" @click="expand = true">
    <template #ProfileImage>
      <ProfileImageBtn v-bind="login.user" />
    </template>
    <template #content>
      <div v-show="!expand" class="text-xl text-foreground/50">
        {{ $t('ArticleCreateModel.writeArticle') }}
      </div>
      <form @submit="onSubmit" novalidate class="flex flex-col gap-2">
        <div v-show="expand" class="flex flex-col gap-2">
          <Textarea
            v-model="title"
            autoResize
            class="min-h-16 w-full"
            :placeholder="$t('ArticleCreateModel.title')"
            :invalid="!!errors.title"
          />
          <Textarea
            v-model="description"
            autoResize
            class="min-h-16 w-full"
            :placeholder="$t('ArticleCreateModel.description')"
            :invalid="!!errors.description"
          />
          <Textarea
            v-model="body"
            autoResize
            class="min-h-16 w-full"
            :placeholder="$t('ArticleCreateModel.body')"
            :invalid="!!errors.body"
          />
          <InputChips
            v-model="tagList"
            class="w-full"
            :placeholder="$t('ArticleCreateModel.tag')"
            :pt="{ token: { class: '!rounded-full' } }"
          />
        </div>
        <div class="flex w-full justify-end">
          <Button
            rounded
            type="submit"
            :label="$t('action.Post')"
            :loading="isSubmitting"
            :disabled="!expand"
            size="small"
          />
        </div>
      </form>
    </template>
  </ItemSlot>
</template>
