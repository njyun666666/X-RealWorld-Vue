<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from 'vue'
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
import DropdownMenu, { type DropdownItem } from '../UI/DropdownMenu.vue'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useArticleStore } from '@/stores/article'

const props = defineProps<{
  article: Article
  class?: HTMLAttributes['class']
}>()
const login = useLoginStore()
const router = useRouter()
const { t } = useI18n()
const isSubmitting = ref(false)
const toast = useToast()
const articleStore = useArticleStore()

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

const { isPending, data: comments } = commentService.query(props.article.slug)

const popularComments = computed(() => {
  return comments.value?.filter((item) => {
    if (item.author.username === props.article.author.username) return true
    if (login.loginState && item.author.username === login.user.username) return true
  })
})

const connectLineNext = computed(() => popularComments.value && popularComments.value.length > 0)

const items = ref<DropdownItem[]>([
  {
    label: 'action.Remove',
    icon: 'fa-solid fa-trash',
    buttonProps: { severity: 'danger' },
    command: () => {
      handleDelete()
    }
  }
])

const handleDelete = async () => {
  isSubmitting.value = true

  await articleStore
    .deleteArticle(props.article.slug)
    .then(() => {
      toast.add({ severity: 'success', summary: t('message.RemoveSuccess'), life: 3000 })
    })
    .catch(() => {
      toast.add({ severity: 'error', summary: t('message.DeleteFail'), life: 3000 })
    })

  isSubmitting.value = false
}
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
        <!-- menu -->
        <template v-if="login.loginState && login.user.username === article.author.username">
          <DropdownMenu
            :items="items"
            :buttonProps="{
              severity: 'secondary',
              text: true,
              rounded: true,
              loading: isSubmitting,
              class: '!absolute right-2 top-2 -mr-4 !h-9 !w-9'
            }"
          >
            <font-awesome-icon v-if="isSubmitting" icon="fa-solid fa-circle-notch" spin />
            <font-awesome-icon v-else icon="fa-solid fa-ellipsis" />
          </DropdownMenu>
        </template>
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
