<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLoginStore } from '@/stores/login'
import type { MenuItem } from 'primevue/menuitem'
import TabMenu from 'primevue/tabmenu'
import YourFeed from './YourFeed.vue'
import GlobalFeed from './GlobalFeed.vue'
import { useArticleStore } from '@/stores/article'
import { cn } from '@/libs/utils'
import ArticleForm from '@/components/Article/ArticleForm.vue'

const login = useLoginStore()
const articleStore = useArticleStore()

const items = ref<MenuItem[]>([
  { label: 'page.YourFeed', visible: () => login.loginState },
  { label: 'page.GlobalFeed' }
])

const comps = [YourFeed, GlobalFeed]

watch(
  () => login.loginState,
  () => {
    if (!login.loginState && articleStore.activeTab == 0) {
      articleStore.activeTab = 1
    }
  }
)
</script>

<template>
  <div class="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm">
    <TabMenu
      v-model:activeIndex="articleStore.activeTab"
      :model="items"
      class="bg-transparent duration-0"
      :pt="{
        menu: { class: '!bg-transparent' },
        menuitem: {
          class: cn('grow shrink', {
            'w-full': !login.loginState,
            'w-1/2': login.loginState
          })
        },
        inkbar: { class: '!duration-0' }
      }"
    >
      <template #item="{ item, props }">
        <a
          v-bind="props.action"
          class="flex justify-center gap-2 !rounded-none align-middle hover:bg-foreground/10"
        >
          <font-awesome-icon :icon="item.icon" class="h-4 w-4" v-if="item.icon" />
          <span>{{ $t(String(item.label)) }}</span>
        </a>
      </template>
    </TabMenu>
  </div>

  <ArticleForm v-if="login.loginState" class="border-b px-4 pb-4" isAdd />

  <KeepAlive>
    <component :is="comps[articleStore.activeTab]"></component>
  </KeepAlive>
</template>
