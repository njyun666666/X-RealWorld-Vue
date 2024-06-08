<script setup lang="ts">
import { computed, watch } from 'vue'
import { useLoginStore } from '@/stores/login'
import type { MenuItem } from 'primevue/menuitem'
import YourFeed from './YourFeed.vue'
import GlobalFeed from './GlobalFeed.vue'
import { useArticleStore, type ArticleTabType } from '@/stores/article'
import ArticleForm from '@/components/Article/ArticleForm.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'

const login = useLoginStore()
const articleStore = useArticleStore()

const items = computed<MenuItem[]>(() => [
  { key: 'yourFeed', label: 'page.YourFeed', visible: login.loginState },
  { key: 'globalFeed', label: 'page.GlobalFeed' }
])

const comps: Partial<Record<ArticleTabType, any>> = {
  yourFeed: YourFeed,
  globalFeed: GlobalFeed
}

watch(
  () => login.loginState,
  () => {
    if (!login.loginState && articleStore.activeTab == 'yourFeed') {
      articleStore.activeTab = 'globalFeed'
    }
  }
)
</script>

<template>
  <div class="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm">
    <Tabs v-model:value="articleStore.activeTab">
      <TabList :pt="{ tabs: { class: '!bg-transparent' } }">
        <template v-for="tab in items" :key="tab.key">
          <Tab
            v-if="tab.visible ?? true"
            :value="tab.key"
            :pt="{ root: { class: 'w-full hover:!bg-foreground/10' } }"
          >
            <span>{{ $t(String(tab.label)) }}</span>
          </Tab>
        </template>
      </TabList>
    </Tabs>
  </div>

  <ArticleForm v-if="login.loginState" class="border-b px-4 pb-4" isAdd />

  <KeepAlive>
    <component :is="comps[articleStore.activeTab]"></component>
  </KeepAlive>
</template>
