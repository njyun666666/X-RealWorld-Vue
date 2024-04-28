<script setup lang="ts">
import Button from 'primevue/button'
import { RouterLink } from 'vue-router'

defineProps<{
  tags: string[]
}>()
</script>
<template>
  <div class="flex w-full flex-wrap gap-2">
    <RouterLink
      v-for="item in [...tags]"
      :key="item"
      :to="{ name: 'search', query: { tag: item } }"
    >
      <Button :label="item" severity="secondary" size="small" rounded class="!text-xs" />
    </RouterLink>
  </div>
</template>
