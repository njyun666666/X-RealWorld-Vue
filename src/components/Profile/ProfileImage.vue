<script setup lang="ts">
import Image from '../UI/Image.vue'
import Avatar from 'primevue/avatar'

defineProps<{
  username: string
  image?: string
}>()
</script>
<template>
  <Image v-if="image" :src="image" preview width="100%" height="100%" />
  <Avatar v-else :label="username.substring(0, 1)" size="xlarge" shape="circle" />
</template>
