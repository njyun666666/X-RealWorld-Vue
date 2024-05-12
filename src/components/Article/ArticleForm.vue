<script setup lang="ts">
import { useLoginStore } from '@/stores/login'
import ItemSlot from '../Slots/ItemSlot.vue'
import ProfileImageBtn from '../Profile/ProfileImageBtn.vue'
import InputText from 'primevue/inputtext'
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
import { articleService, type Article } from '@/libs/services/articleService'
import { useArticleStore } from '@/stores/article'
import type { AxiosError } from 'axios'
import type { ResponseErrors } from '@/libs/api/realworldAPI'
import { useRoute, useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    expand?: boolean
    isAdd?: boolean
    article?: Article
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
const router = useRouter()
const route = useRoute()
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
  initialValues: props.article
})

const [title] = defineField('title')
const [description] = defineField('description')
const [body] = defineField('body')
const [tagList] = defineField('tagList')

const onSubmit = handleSubmit(async (values) => {
  await articleService
    .mergeArticle({ article: values }, props.article?.slug)
    .then(async ({ data }) => {
      articleStore.mergeArticle(data.article, props.article?.slug)
      emit('close')
      resetForm()
      toast.add({ severity: 'success', summary: t('message.AddSuccess'), life: 3000 })

      if (route.name == 'article') {
        router.replace({
          name: 'article',
          params: { username: route.params['username'], slug: data.article.slug }
        })
      }
    })
    .catch((error: AxiosError<ResponseErrors>) => {
      console.log(error.response?.data)
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
          <InputText
            type="text"
            v-model="title"
            class="w-full !text-xl !font-bold"
            :placeholder="$t('ArticleCreateModel.title')"
            :invalid="!!errors.title"
          />
          <InputText
            type="text"
            v-model="description"
            class="w-full"
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
