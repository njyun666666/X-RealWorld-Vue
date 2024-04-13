<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Profile } from '@/libs/services/profileService'

defineProps<{ profile: Profile }>()
</script>
<template>
  <RouterLink
    :to="{ name: 'profile', params: { username: profile.username } }"
    class="font-bold hover:underline"
  >
    {{ profile.username }}
  </RouterLink>
</template>
