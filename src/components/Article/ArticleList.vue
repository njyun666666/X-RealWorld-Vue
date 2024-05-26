<script setup lang="ts">
import { type Article, type ArticleModel } from '@/libs/services/articleService'
import { useArticleStore, type ArticleTabType } from '@/stores/article'
import { useInfiniteQuery, type QueryFunctionContext } from '@tanstack/vue-query'
import { useInfiniteScroll, useWindowScroll } from '@vueuse/core'
import { computed, onActivated, onDeactivated, ref, watch } from 'vue'
import Button from 'primevue/button'
import ArticleItem from './ArticleItem.vue'
import ArticleItemSkeleton from './ArticleItemSkeleton.vue'
import { sortBy } from 'lodash'

const props = defineProps<{
  queryModel?: ArticleModel
  articleTabType: ArticleTabType
  enableSavedScrollY?: boolean
}>()

const enable = ref(false)
const articleStore = useArticleStore()
const { y: scrollY } = useWindowScroll()
const canLoadMore = ref(true)
const articleList = computed<Article[]>(() => {
  switch (props.articleTabType) {
    case 'globalFeed':
      return articleStore.globalFeedList

    case 'yourFeed':
      return articleStore.yourFeedList

    case 'search':
      return articleStore.yourFeedList

    case 'profilePosts':
      return sortBy(
        articleStore.articleList.filter((x) => x.author.username == props.queryModel?.author),
        ['createdAt']
      ).reverse()

    case 'profileLikes': {
      if (!props.queryModel?.favorited) return []

      const arr = articleStore.favorited[props.queryModel.favorited] ?? []

      return sortBy(
        articleStore.articleList.filter((item) => arr.includes(item.slug)),
        ['createdAt']
      ).reverse()

      // return data.value?.pages.flatMap((page) => page.articles) ?? []
    }

    default:
      return []
  }
})

const getData = async (query: QueryFunctionContext<unknown[], ArticleModel>) => {
  const data = await articleStore
    .getArticles({ ...props.queryModel, ...query.pageParam })
    .then((data) => data)

  const length = (query.pageParam?.offset || 0) + data.articles.length
  canLoadMore.value = length < data.articlesCount

  return {
    articles: data.articles,
    nextCursor: {
      ...query.pageParam,
      offset: length
    } as ArticleModel
  }
}

const { fetchNextPage, isFetchingNextPage, isPending, isError } = useInfiniteQuery({
  queryKey: ['ArticlesList', props.queryModel],
  queryFn: getData,
  staleTime: Infinity,
  initialPageParam: { limit: 10 },
  getNextPageParam: (lastPage) => lastPage.nextCursor
})

const { isLoading: isLoadingMore } = useInfiniteScroll(
  window,
  () => {
    fetchNextPage()
  },
  {
    distance: 1200,
    canLoadMore: () =>
      canLoadMore.value && !isPending.value && !isFetchingNextPage.value && enable.value
  }
)

const isLoading = computed(() => {
  return isPending.value || isLoadingMore.value || isFetchingNextPage.value
})

onActivated(() => {
  enable.value = true
  console.log('onActivated')

  if (props.enableSavedScrollY) {
    console.log('enableSavedScrollY')
    scrollY.value = articleStore.scrollY[props.articleTabType]
  }
})

onDeactivated(() => {
  enable.value = false
})

watch(scrollY, (y) => {
  if (enable.value && props.enableSavedScrollY) {
    articleStore.setSavedScrollY(props.articleTabType, y)
  }
})
</script>

<template>
  <div class="divide-y">
    <ArticleItem
      v-for="item in articleList"
      :key="item.slug"
      :article="articleStore.article[item.slug]"
    />

    <template v-if="isLoading">
      <ArticleItemSkeleton v-for="n in 10" :key="n" />
    </template>

    <div class="flex min-h-60 flex-col items-center justify-center gap-6">
      <template v-if="(isError || !canLoadMore) && !isLoading">
        <div class="text-center italic text-foreground/50">
          {{ isError ? $t('message.IsError') : $t('message.NoMore') }}
        </div>
      </template>
      <template v-if="!isLoading">
        <Button rounded @click="() => fetchNextPage()">
          <font-awesome-icon icon="fa-solid fa-rotate-right" />
          <span class="ml-2 font-bold">{{ $t('action.LoadMore') }}</span>
        </Button>
      </template>
    </div>
  </div>
</template>
