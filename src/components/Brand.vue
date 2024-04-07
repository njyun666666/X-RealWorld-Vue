<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
</script>
<template>
  <Button text rounded severity="secondary" class="h-[50px] w-[50px] !p-2">
    <RouterLink to="/">
      <img src="/src/assets/logo.svg" class="w-full max-w-full" />
    </RouterLink>
  </Button>
</template>
