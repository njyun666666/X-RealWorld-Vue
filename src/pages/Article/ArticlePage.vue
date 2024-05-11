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

const route = useRoute()
// const username = route.params['username'] as string
const slug = route.params['slug'] as string
webTitle.value = slug

const login = useLoginStore()
const articleStore = useArticleStore()
const article = ref<Article>()
const isPending = ref(true)

articleStore
  .getArticleBySlug(slug)
  .then((data) => {
    article.value = data
    isPending.value = false
  })
  .catch(() => {
    // isPending.value = false
  })

watch(
  () => articleStore.article[slug],
  (val) => {
    article.value = val
  }
)
</script>
<template>
  <BackHeader></BackHeader>
  <ArticleSkeleton v-if="isPending" />
  <article v-if="!isPending && article" class="px-4 pb-4 pt-2">
    <div class="flex items-center gap-3">
      <ProfileImageBtn v-bind="article.author" />
      <ProfileTextBtn :profile="article.author" />
    </div>

    <h2>{{ article?.title }}</h2>

    <p>{{ article.description }}</p>
    <p v-html="article.body.replace(/\n/g, '<br/>')"></p>

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
    <CommentForm v-if="login.loginState && article" :slug="slug" class="px-4 pb-4" />
    <CommentList :slug="slug" />
  </div>
</template>
