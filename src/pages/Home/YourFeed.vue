<script setup lang="ts">
import ArticleList from '@/components/Article/ArticleList.vue'
import { useLoginStore } from '@/stores/login'

const login = useLoginStore()
</script>
<template>
  <ArticleList
    v-if="login.loginState"
    :queryModel="{ author: login.user.username }"
    articleTabType="yourFeed"
    enableSavedScrollY
  />
</template>
