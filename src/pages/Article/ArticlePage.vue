<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ArticleBody from './ArticleBody.vue'

const route = useRoute()
const slug = ref<string>(route.params['slug'] as string)

watch(route, () => {
  slug.value = route.params['slug'] as string
})
</script>
<template>
  <ArticleBody :key="slug" />
</template>
