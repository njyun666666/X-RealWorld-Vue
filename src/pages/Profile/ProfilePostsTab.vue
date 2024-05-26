<script setup lang="ts">
import ArticleList from '@/components/Article/ArticleList.vue'
import { useLoginStore } from '@/stores/login'
import { useRoute } from 'vue-router'

// const login = useLoginStore()
const route = useRoute()
const username = route.params['username'] as string
</script>
<template>
  <ArticleList :queryModel="{ author: username }" articleTabType="profilePosts" />
</template>
