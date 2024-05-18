<script setup lang="ts">
import Image from 'primevue/image'
import Avatar from 'primevue/avatar'

defineProps<{
  username: string
  image?: string
}>()
</script>
<template>
  <Image v-if="image" :src="image" alt="Image" preview />
  <Avatar v-else :label="username.substring(0, 1)" size="xlarge" shape="circle" />
</template>
