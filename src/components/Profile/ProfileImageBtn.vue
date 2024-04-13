<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Profile } from '@/libs/services/profileService'
import Avatar from 'primevue/avatar'

defineProps<{ profile: Profile }>()
</script>
<template>
  <RouterLink
    :to="{ name: 'profile', params: { username: profile.username } }"
    class="hover:opacity-80 active:opacity-70"
    @click.stop
  >
    <Avatar v-if="profile.image" :image="profile.image" shape="circle" class="!h-10 !w-10" />
    <Avatar v-else :label="profile.username.substring(0, 1)" shape="circle" class="!h-10 !w-10" />
  </RouterLink>
</template>
