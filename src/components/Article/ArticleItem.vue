<script setup lang="ts">
import type { Article } from '@/libs/services/articleService'
import { cn } from '@/libs/utils'
import { type HTMLAttributes } from 'vue'
import ArticleCommentBtn from './ArticleCommentBtn.vue'
import ArticleLikeBtn from './ArticleLikeBtn.vue'
import ArticleShareBtn from './ArticleShareBtn.vue'
import ProfileImageBtn from '../Profile/ProfileImageBtn.vue'
import ProfileTextBtn from '../Profile/ProfileTextBtn.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  article: Article
  class?: HTMLAttributes['class']
}>()
const router = useRouter()
const routeData = router.resolve({
  name: 'article',
  params: { username: props.article.author.username, slug: props.article.slug }
})

const openNewWindow = () => {
  const el = document.createElement('a')
  el.href = routeData.href
  el.target = '_blank'
  el.click()
}
</script>
<template>
  <article :class="cn('w-full cursor-pointer p-4 pb-1', props.class)">
    <div
      :class="cn('flex w-full')"
      @click="() => router.push(routeData)"
      @mousedown.middle.prevent="openNewWindow"
    >
      <div class="pr-2">
        <ProfileImageBtn :profile="article.author" />
      </div>
      <div class="grow">
        <div class="flex gap-3">
          <ProfileTextBtn :profile="article.author" />
          <span class="text-foreground/60">
            {{ article.createdAt }}
          </span>
        </div>
        <div>
          <h3 class="line-clamp-2 break-normal">{{ article.title }}</h3>
          <p class="line-clamp-6 break-normal" v-html="article.body.replace(/\\n/g, '<br/>')"></p>
        </div>
        <div class="my-2 flex justify-between">
          <ArticleCommentBtn :slug="article.slug" />
          <ArticleLikeBtn
            :slug="article.slug"
            :favorited="article.favorited"
            :favorites-count="article.favoritesCount"
          />
          <ArticleShareBtn :slug="article.slug" />
        </div>
      </div>
    </div>
  </article>
</template>
