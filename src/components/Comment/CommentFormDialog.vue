<script setup lang="ts">
import { onMounted, ref, type ComputedRef } from 'vue'
import CommentForm from './CommentForm.vue'
import { inject } from 'vue'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import type { Article } from '@/libs/services/articleService'
import ItemSlot from '../Slots/ItemSlot.vue'
import ProfileImageBtn from '../Profile/ProfileImageBtn.vue'
import ProfileTextBtn from '../Profile/ProfileTextBtn.vue'
import RelativeTime from '../RelativeTime.vue'

const article = ref<Article>()

const dialogRef = inject('dialogRef') as ComputedRef<DynamicDialogInstance>

onMounted(() => {
  const params = dialogRef.value.data
  article.value = params.article as Article
})

const closeDialog = () => {
  dialogRef.value.close()
}
</script>
<template>
  <template v-if="article">
    <ItemSlot class="p-0" connectLineNext>
      <template #ProfileImage>
        <ProfileImageBtn v-bind="article.author" />
      </template>
      <template #content>
        <div class="flex gap-3">
          <ProfileTextBtn :profile="article.author" />
          <span>
            <RelativeTime :datetime="article.createdAt" />
          </span>
        </div>
        <div>
          <h3 class="line-clamp-2 break-normal">{{ article.title }}</h3>
          <p
            class="line-clamp-6 break-normal"
            v-html="article.description.replace(/\n/g, '<br/>')"
          ></p>
        </div>
      </template>
    </ItemSlot>

    <CommentForm :slug="article.slug" connectLinePrev @close="closeDialog" />
  </template>
</template>
