<script setup lang="ts">
import { articleService, type ArticleModel } from '@/libs/services/articleService'
import { useArticleStore, type ArticleTabType } from '@/stores/article'
import { useInfiniteQuery, type QueryFunctionContext } from '@tanstack/vue-query'
import { useInfiniteScroll, useWindowScroll } from '@vueuse/core'
import { computed, onActivated, onDeactivated, ref, watch } from 'vue'
import Button from 'primevue/button'
import ArticleItem from './ArticleItem.vue'
import ArticleItemSkeleton from './ArticleItemSkeleton.vue'
import appConst from '@/appConst'

const props = defineProps<{
  queryModel?: ArticleModel
  savedScrollYKey: ArticleTabType
}>()

const enable = ref(false)
const articleStore = useArticleStore()
const { y: scrollY } = useWindowScroll()
const canLoadMore = ref(true)

const getData = async (query: QueryFunctionContext<unknown[], ArticleModel>) => {
  const data = await articleService
    .getArticles({ ...props.queryModel, ...query.pageParam })
    .then((data) => data.data)
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

const { data, fetchNextPage, isFetchingNextPage, isPending, isError } = useInfiniteQuery({
  queryKey: ['ArticlesList', props.queryModel],
  queryFn: getData,
  staleTime: appConst.StaleTime,
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
  scrollY.value = articleStore.scrollY[props.savedScrollYKey]
})

onDeactivated(() => {
  enable.value = false
})

watch(scrollY, (y) => {
  if (enable.value) {
    articleStore.setSavedScrollY(props.savedScrollYKey, y)
  }
})
</script>

<template>
  <div class="divide-y">
    <template v-for="(page, index) in data?.pages" :key="index">
      <ArticleItem v-for="item in page.articles" :key="item.slug" :article="item" />
    </template>

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
          <span class="ml-2">{{ $t('action.LoadMore') }}</span>
        </Button>
      </template>
    </div>
  </div>
</template>
