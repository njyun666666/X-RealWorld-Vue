<script setup lang="ts">
import SearchForm from '@/components/Search/SearchForm.vue'
import ArticleList from '@/components/Article/ArticleList.vue'
import { useLoginStore } from '@/stores/login'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const login = useLoginStore()
const route = useRoute()
const comkey = computed(
  () => login.currentUsername + JSON.stringify(route.query) + new Date().toISOString()
)

const exec = computed(() => !!route.query['tag'] || !!route.query['author'])
</script>

<template>
  <div class="border-b p-4">
    <SearchForm />
  </div>
  <ArticleList
    v-if="exec"
    articleTabType="search"
    :queryModel="route.query"
    enableSavedScrollY
    :key="comkey"
  />
</template>
