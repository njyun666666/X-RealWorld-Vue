<script setup lang="ts">
import { useRoute } from 'vue-router'
import { webTitle } from '@/libs/common'
import BackHeader from '@/components/BackHeader.vue'
import { articleService } from '@/libs/services/articleService'
import ProfileImageBtn from '@/components/Profile/ProfileImageBtn.vue'
import ProfileTextBtn from '@/components/Profile/ProfileTextBtn.vue'
import { useQuery } from '@tanstack/vue-query'
import CommentBtn from '@/components/Comment/CommentBtn.vue'
import ArticleLikeBtn from '@/components/Article/ArticleLikeBtn.vue'
import ArticleShareBtn from '@/components/Article/ArticleShareBtn.vue'
import dayjs from 'dayjs'
import ArticleSkeleton from '@/components/Article/ArticleSkeleton.vue'
import CommentList from '@/components/Comment/CommentList.vue'
import appConst from '@/appConst'
import ArticleTagList from '@/components/Article/ArticleTagList.vue'
import CommentForm from '@/components/Comment/CommentForm.vue'
import { useLoginStore } from '@/stores/login'

const route = useRoute()
// const username = route.params['username'] as string
const slug = route.params['slug'] as string
webTitle.value = slug

const login = useLoginStore()

const { isPending, data } = useQuery({
  queryKey: [articleService.getArticleBySlug.name, slug],
  queryFn: () => articleService.getArticleBySlug(slug).then((res) => res.data.article),
  staleTime: appConst.StaleTime
})
</script>
<template>
  <BackHeader></BackHeader>
  <ArticleSkeleton v-if="isPending" />
  <article v-if="!isPending && data" class="px-4 pb-4 pt-2">
    <div class="flex items-center gap-3">
      <ProfileImageBtn v-bind="data.author" />
      <ProfileTextBtn :profile="data.author" />
    </div>

    <h2>{{ data?.title }}</h2>

    <p v-html="data.description.replace(/\\n/g, '<br/>')"></p>
    <p v-html="data.body.replace(/\\n/g, '<br/>')"></p>

    <div class="space-y-4 pt-10">
      <ArticleTagList :tags="data.tagList" />

      <div class="text-foreground/60">
        {{ dayjs(data.createdAt).format('L LT') }}
      </div>
    </div>
  </article>

  <div class="divide-y">
    <div v-if="data"></div>
    <div v-if="data" class="flex justify-between px-4 py-2">
      <CommentBtn :slug="data.slug" />
      <ArticleLikeBtn
        :slug="data.slug"
        :favorited="data.favorited"
        :favoritesCount="data.favoritesCount"
      />
      <ArticleShareBtn :slug="data.slug" />
    </div>
    <CommentForm v-if="login.loginState && data" :slug="slug" />
    <CommentList :slug="slug" />
  </div>
</template>
