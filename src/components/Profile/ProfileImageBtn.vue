<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Avatar from 'primevue/avatar'

defineProps<{
  username: string
  image: string
}>()
</script>
<template>
  <RouterLink
    :to="{ name: 'profile', params: { username: username } }"
    class="!h-10 hover:opacity-80 active:opacity-70"
    @click.stop
  >
    <Avatar v-if="image" :image="image" shape="circle" class="!h-10 !w-10" />
    <Avatar v-else :label="username.substring(0, 1)" shape="circle" class="!h-10 !w-10" />
  </RouterLink>
</template>
