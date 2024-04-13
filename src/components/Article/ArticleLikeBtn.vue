<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{
  slug: string
  favorited: boolean
  favoritesCount: number
}>()
</script>
<template>
  <Button
    severity="secondary"
    rounded
    text
    class="!text-sm hover:!bg-rose-500/15 hover:!text-rose-500 active:!bg-rose-500/25"
    @click.stop="() => console.log('like')"
    @mousedown.middle.stop.prevent
  >
    <font-awesome-icon v-if="!favorited" icon="fa-regular fa-heart" />
    <font-awesome-icon v-else icon="fa-solid fa-heart" />
    <span class="ml-2">
      {{ favoritesCount }}
    </span>
  </Button>
</template>
