<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/libs/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>
<template>
  <RouterLink to="/">
    <Button text rounded severity="secondary" :class="cn('h-12 w-12 !p-2', props.class)">
      <img src="/src/assets/logo.svg" class="w-full max-w-full" />
    </Button>
  </RouterLink>
</template>
