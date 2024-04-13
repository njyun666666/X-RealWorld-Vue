<script setup lang="ts">
import { useRoute } from 'vue-router'
import { webTitle } from '@/libs/common'

const route = useRoute()
const username = route.params['username'] as string
const slug = route.params['slug'] as string
webTitle.value = slug
</script>
<template>
  <div>
    <h2>{{ username }}</h2>
    <p>
      {{ slug }}
    </p>
  </div>
</template>
