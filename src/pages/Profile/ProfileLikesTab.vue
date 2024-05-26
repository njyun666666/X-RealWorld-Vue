<script setup lang="ts">
import ArticleList from '@/components/Article/ArticleList.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const username = route.params['username'] as string
</script>
<template>
  <ArticleList :queryModel="{ favorited: username }" articleTabType="profileLikes" />
</template>
