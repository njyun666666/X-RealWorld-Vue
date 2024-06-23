<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRoute, useRouter } from 'vue-router'
import { watchWithFilter } from '@vueuse/core'
import type { ArticleModel } from '@/libs/services/articleService'

const router = useRouter()
const route = useRoute()

const initValues: ArticleModel = {
  tag: undefined,
  author: undefined
}

const formSchema = z.object({
  tag: z.string().trim().optional(),
  author: z.string().trim().optional()
})

const { defineField, handleSubmit, errors, isSubmitting, setValues } = useForm({
  validationSchema: toTypedSchema(formSchema)
  // initialValues: route.query
})

const [tag] = defineField('tag')
const [author] = defineField('author')

const onSubmit = handleSubmit(async (values) => {
  const param = Object.entries(values).reduce((prev, [key, value]) => {
    if (!value) return prev
    return { ...prev, [key]: value }
  }, {})

  router.push({ name: 'search', query: param })
})

watchWithFilter(
  () => [route.name, route.query],
  () => {
    setValues({ ...initValues, ...route.query })
  },
  {
    immediate: true,

    eventFilter: (invoke, { args }) => {
      var [routeName] = args[0]

      if (routeName == 'search') {
        invoke()
      }
    }
  }
)
</script>
<template>
  <form @submit="onSubmit" novalidate class="flex flex-col gap-2">
    <div class="flex flex-col gap-2">
      <InputText
        type="text"
        v-model="tag"
        class="w-full"
        :placeholder="$t('SearchModel.tag')"
        :invalid="!!errors.tag"
      />
      <InputText
        type="text"
        v-model="author"
        class="w-full"
        :placeholder="$t('SearchModel.author')"
        :invalid="!!errors.author"
      />
    </div>
    <div class="flex w-full justify-end">
      <Button
        rounded
        type="submit"
        :label="$t('action.Search')"
        :loading="isSubmitting"
        size="small"
        :pt="{ label: { class: '!font-bold' } }"
      />
    </div>
  </form>
</template>
