<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProfileBody from './ProfileBody.vue'

const route = useRoute()
const username = ref<string>(route.params['username'] as string)

watch(route, () => {
  username.value = route.params['username'] as string
})
</script>
<template>
  <ProfileBody :key="username" />
</template>
