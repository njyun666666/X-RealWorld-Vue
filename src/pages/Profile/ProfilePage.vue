<script setup lang="ts">
import { useRoute } from 'vue-router'
import { webTitle } from '@/libs/common'

const route = useRoute()
const username = route.params['username'] as string
webTitle.value = username
</script>
<template>
  <div>
    <h2>{{ username }}</h2>
  </div>
</template>
