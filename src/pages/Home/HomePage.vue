<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import TabMenu from 'primevue/tabmenu'
import type { MenuItem } from 'primevue/menuitem'
import { useLoginStore } from '@/stores/login'
import { articleService, type Article, type ArticleModel } from '@/libs/services/articleService'
import ArticleItem from '@/components/Article/ArticleItem.vue'
import ArticleSkeleton from '@/components/Article/ArticleSkeleton.vue'
import { useArticleStore } from '@/stores/article'
import { useWindowScroll } from '@vueuse/core'
import { useInfiniteQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'

const login = useLoginStore()
const active = ref<number>()
const items = ref<MenuItem[]>([
  { label: 'Your Feed', visible: () => login.loginState },
  { label: 'Global Feed' },
  { label: 'pop', icon: 'fa-solid fa-hashtag', visible: () => true }
])

const { y: scrollY } = useWindowScroll()
const articleStore = useArticleStore()

const getData = async (query: unknown) => {
  // console.log('query', query)
  const params = (query as any).pageParam as ArticleModel
  const data = await articleService
    .getArticles(params)
    .then((data) => data.data.articles)
    .catch(() => [] as Article[])

  return {
    articles: data,
    nextCursor: {
      ...params,
      offset: (params?.offset || 0) + data.length
    } as ArticleModel
  }
}

const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  isPending,
  isError
} = useInfiniteQuery({
  queryKey: ['articles'],
  queryFn: getData,
  staleTime: 30 * 60 * 1000,
  initialPageParam: { limit: 10 },
  getNextPageParam: (lastPage) => lastPage.nextCursor
})

onMounted(async () => {
  active.value = 1
  scrollY.value = articleStore.savedScrollY
})

watch(scrollY, (y) => {
  articleStore.savedScrollY = y
})

watch(
  () => login.loginState,
  () => {
    if (!login.loginState && active.value == 0) {
      active.value = 1
    }
  }
)
</script>

<template>
  <div class="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-[2px]">
    <TabMenu
      v-model:activeIndex="active"
      :model="items"
      class="bg-transparent"
      :pt="{
        menu: { class: '!bg-transparent' },
        menuitem: { class: 'grow shrink w-1/2' }
      }"
    >
      <template #item="{ item, props }">
        <a v-bind="props.action" class="flex justify-center gap-2 align-middle">
          <font-awesome-icon :icon="item.icon" class="h-4 w-4" v-if="item.icon" />
          <span class="font-bold">{{ item.label }}</span>
        </a>
      </template>
    </TabMenu>
  </div>
  <div class="divide-y">
    <template v-if="isPending">
      <ArticleSkeleton v-for="n in 10" :key="n" />
    </template>
    <template v-else>
      <template v-for="(page, index) in data?.pages" :key="index">
        <ArticleItem v-for="item in page.articles" :key="item.slug" :article="item" />
      </template>
    </template>
    <div></div>
    <Button @click="() => fetchNextPage()">fetchNextPage</Button>
    <ArticleSkeleton v-if="isFetchingNextPage" />
    <div class="h-[200px]"></div>
  </div>
</template>
