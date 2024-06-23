<script setup lang="ts">
import SearchForm from '@/components/Search/SearchForm.vue'
import ArticleList from '@/components/Article/ArticleList.vue'
import { useLoginStore } from '@/stores/login'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { watchWithFilter } from '@vueuse/core'

const login = useLoginStore()
const route = useRoute()
const comkey = ref<string>()

watchWithFilter(
  () => [route.name, route.query],
  () => {
    if (!route.query['tag'] && !route.query['author']) {
      comkey.value = undefined
      return
    }

    comkey.value = login.currentUsername + JSON.stringify(route.query) + new Date().toISOString()
  },
  {
    immediate: true,

    eventFilter: (invoke, { args }) => {
      var [routeName] = args[0]

      if (routeName == 'search') {
        invoke()
      }
    }
  }
)
</script>

<template>
  <div class="border-b p-4">
    <SearchForm />
  </div>
  <ArticleList
    v-if="comkey"
    articleTabType="search"
    :queryModel="route.query"
    enableSavedScrollY
    :key="comkey"
  />
</template>
