<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{
  slug: string
}>()
</script>
<template>
  <Button
    severity="secondary"
    rounded
    text
    class="!text-sm"
    @click.stop="() => console.log('share')"
    @mousedown.middle.stop.prevent
  >
    <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />
  </Button>
</template>
