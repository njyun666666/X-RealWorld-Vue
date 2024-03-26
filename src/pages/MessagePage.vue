<script setup lang="ts">
import { useRoute } from 'vue-router'
import Page from './Page.vue'

const route = useRoute()
const message = route.params['message']
</script>

<template>
  <Page :title="$t(`message.${message}`)">
    <h1>{{ $t(`message.${message}`) }}</h1>
  </Page>
</template>
