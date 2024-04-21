<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { webTitle } from '@/libs/common'
import BackHeader from '@/components/BackHeader.vue'
import { articleService } from '@/libs/services/articleService'
import ProfileImageBtn from '@/components/Profile/ProfileImageBtn.vue'
import ProfileTextBtn from '@/components/Profile/ProfileTextBtn.vue'
import { useQuery } from '@tanstack/vue-query'
import ArticleCommentBtn from '@/components/Article/ArticleCommentBtn.vue'
import ArticleLikeBtn from '@/components/Article/ArticleLikeBtn.vue'
import ArticleShareBtn from '@/components/Article/ArticleShareBtn.vue'
import dayjs from 'dayjs'

const route = useRoute()
// const username = route.params['username'] as string
const slug = route.params['slug'] as string
webTitle.value = slug

const { isPending, data } = useQuery({
  queryKey: [slug],
  queryFn: () => articleService.getArticleBySlug(slug).then((res) => res.data.article),
  staleTime: 30 * 60 * 1000
})
</script>
<template>
  <BackHeader></BackHeader>
  <template v-if="isPending">
    {{ isPending }}
  </template>
  <template v-if="!isPending && data">
    <article class="px-4 pt-2">
      <div class="flex items-center gap-3">
        <ProfileImageBtn :profile="data.author" />
        <ProfileTextBtn :profile="data.author" />
      </div>

      <h2>{{ data?.title }}</h2>

      <p v-html="data.description.replace(/\\n/g, '<br/>')"></p>
      <p v-html="data.body.replace(/\\n/g, '<br/>')"></p>

      <div class="py-4 text-foreground/60">
        {{ dayjs(data.createdAt).format('L LT') }}
      </div>
    </article>

    <div class="divide-y">
      <div></div>
      <div class="flex justify-between px-4 py-2">
        <ArticleCommentBtn :slug="data.slug" />
        <ArticleLikeBtn
          :slug="data.slug"
          :favorited="data.favorited"
          :favorites-count="data.favoritesCount"
        />
        <ArticleShareBtn :slug="data.slug" />
      </div>
      <div></div>
    </div>
  </template>
</template>
