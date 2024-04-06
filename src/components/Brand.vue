<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <RouterLink to="/" class="font-mono text-3xl font-bold text-primary">
    {{ $t('website.Title') }}
  </RouterLink>
</template>
