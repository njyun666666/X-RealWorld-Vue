<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { type Article } from '@/libs/services/articleService'
import { cn } from '@/libs/utils'
import ArticleLikeBtn from './ArticleLikeBtn.vue'
import ArticleShareBtn from './ArticleShareBtn.vue'
import ProfileImageBtn from '../Profile/ProfileImageBtn.vue'
import ProfileTextBtn from '../Profile/ProfileTextBtn.vue'
import { useRouter } from 'vue-router'
import RelativeTime from '../RelativeTime.vue'
import CommentBtn from '../Comment/CommentBtn.vue'
import { commentService } from '@/libs/services/commentService'
import ArticleItemSkeleton from './ArticleItemSkeleton.vue'
import CommentItem from '../Comment/CommentItem.vue'
import ItemSlot from '../Slots/ItemSlot.vue'
import { useLoginStore } from '@/stores/login'
import ArticleAction from './ArticleAction.vue'
import { useQuery } from '@tanstack/vue-query'
import appConst from '@/appConst'
import { faker } from '@faker-js/faker'

const props = defineProps<{
  article: Article
  class?: HTMLAttributes['class']
}>()
const login = useLoginStore()
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

// const { isPending, data: comments } = commentService.query(props.article.slug)
const { isPending, data: comments } = useQuery({
  queryKey: ['comment', props.article.slug],
  queryFn: async () =>
    commentService.getComments(props.article.slug).then((res) => res.data.comments),
  staleTime: appConst.StaleTime
})

const popularComments = computed(() => {
  return comments.value?.filter((item) => {
    if (item.author.username === props.article.author.username) return true
    if (login.loginState && item.author.username === login.user.username) return true
    return faker.datatype.boolean()
  })
})

const connectLineNext = computed(() => popularComments.value && popularComments.value.length > 0)
</script>
<template>
  <div
    :class="cn('cursor-pointer', props.class)"
    @click="() => router.push(routeData)"
    @mousedown.middle.prevent="openNewWindow"
  >
    <ArticleItemSkeleton v-if="isPending" />
    <ItemSlot v-else :connectLineNext="connectLineNext">
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
          <p class="line-clamp-6 break-normal">
            {{ article.description }}
          </p>
        </div>
        <div class="my-2 flex justify-between">
          <CommentBtn :article="article" />
          <ArticleLikeBtn :slug="article.slug" />
          <ArticleShareBtn :slug="article.slug" :username="article.author.username" />
        </div>
        <ArticleAction :article="article" class="!absolute right-2 top-2 -mr-4" />
      </template>
    </ItemSlot>

    <template v-if="popularComments">
      <CommentItem
        v-for="(item, index) in popularComments"
        :key="item.id"
        :slug="article.slug"
        :comment="item"
        :connectLinePrev="true"
        :connectLineNext="index < popularComments.length - 1"
      />
    </template>
  </div>
</template>
