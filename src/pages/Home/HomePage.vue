<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import TabMenu from 'primevue/tabmenu'
import type { MenuItem } from 'primevue/menuitem'
import { useLoginStore } from '@/stores/login'
import { articleService, type Article } from '@/libs/services/articleService'
import ArticleItem from '@/components/Article/ArticleItem.vue'

const login = useLoginStore()
const active = ref<number>()
const items = ref<MenuItem[]>([
  { label: 'Your Feed', visible: () => login.loginState },
  { label: 'Global Feed' },
  { label: 'pop', icon: 'fa-solid fa-hashtag', visible: () => true }
])

const articles = ref<Article[]>([])

onMounted(async () => {
  active.value = 0
  articles.value = (await articleService.getArticles({ limit: 10 })).data.articles
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
          <!-- <img :alt="item.name" :src="`/images/avatar/${item.image}`" style="width: 32px" /> -->
          <span class="font-bold">{{ item.label }}</span>
        </a>
      </template>
    </TabMenu>
  </div>
  <div class="divide-y">
    <ArticleItem v-for="item in articles" :key="item.slug" :article="item" />
    <div class="h-[200px]"></div>
  </div>
</template>
