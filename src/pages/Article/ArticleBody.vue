<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { webTitle } from '@/libs/common'
import BackHeader from '@/components/BackHeader.vue'
import ProfileImageBtn from '@/components/Profile/ProfileImageBtn.vue'
import ProfileTextBtn from '@/components/Profile/ProfileTextBtn.vue'
import CommentBtn from '@/components/Comment/CommentBtn.vue'
import ArticleLikeBtn from '@/components/Article/ArticleLikeBtn.vue'
import ArticleShareBtn from '@/components/Article/ArticleShareBtn.vue'
import dayjs from 'dayjs'
import ArticleSkeleton from '@/components/Article/ArticleSkeleton.vue'
import CommentList from '@/components/Comment/CommentList.vue'
import ArticleTagList from '@/components/Article/ArticleTagList.vue'
import CommentForm from '@/components/Comment/CommentForm.vue'
import { useLoginStore } from '@/stores/login'
import { useArticleStore } from '@/stores/article'
import type { Article } from '@/libs/services/articleService'
import ArticleAction from '@/components/Article/ArticleAction.vue'
import { useToast } from 'primevue/usetoast'
import { watchWithFilter } from '@vueuse/core'

const route = useRoute()
// const username = route.params['username'] as string
const slug = ref<string>()
const login = useLoginStore()
const articleStore = useArticleStore()
const article = ref<Article>()
const isPending = ref(true)
const toast = useToast()

watchWithFilter(
  () => [route.name, route.params['slug']],
  () => {
    slug.value = route.params['slug'] as string

    if (!slug.value) return

    isPending.value = true

    articleStore
      .getArticleBySlug(slug.value)
      .then((data) => {
        webTitle.value = data.title
        article.value = data
        isPending.value = false
      })
      .catch(() => {
        toast.add({ severity: 'error', summary: 'error', life: 3000 })
      })
  },
  {
    immediate: true,

    eventFilter: (invoke, { args }) => {
      var [routeName, routeSlug] = args[0]

      if (routeName == 'article' && routeSlug) {
        invoke()
      }
    }
  }
)

watch(
  () => articleStore.article[slug.value as string],
  (val) => {
    article.value = val
  }
)
</script>
<template>
  <BackHeader></BackHeader>
  <ArticleSkeleton v-if="isPending" />
  <article v-if="!isPending && article" class="relative px-4 pb-4 pt-2">
    <div class="flex items-center gap-3">
      <ProfileImageBtn v-bind="article.author" />
      <ProfileTextBtn :profile="article.author" class="grow" />
      <ArticleAction :article="article" />
    </div>

    <h2>{{ article?.title }}</h2>

    <p>{{ article.description }}</p>
    <p v-html="article.body?.replace(/\n/g, '<br/>')"></p>

    <div class="space-y-4 pt-10">
      <ArticleTagList :tags="article.tagList" />

      <div class="text-foreground/60">
        {{ dayjs(article.createdAt).format('L LT') }}
      </div>
    </div>
  </article>

  <div class="divide-y">
    <div v-if="article"></div>
    <div v-if="article" class="flex justify-between px-4 py-2">
      <CommentBtn :article="article" />
      <ArticleLikeBtn :slug="article.slug" />
      <ArticleShareBtn :slug="article.slug" :username="article.author.username" />
    </div>
    <CommentForm v-if="login.loginState && article && slug" :slug="slug" class="px-4 pb-4" />
    <CommentList v-if="slug" :slug="slug" />
  </div>
</template>
