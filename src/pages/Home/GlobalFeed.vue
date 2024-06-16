<script setup lang="ts">
import ArticleList from '@/components/Article/ArticleList.vue'
import { useLoginStore } from '@/stores/login'

const login = useLoginStore()
</script>
<template>
  <ArticleList articleTabType="globalFeed" enableSavedScrollY :key="login.currentUsername" />
</template>
