<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/libs/utils'
import { useTitle } from '@vueuse/core'

interface Props {
  title: string
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

useTitle(props.title, { titleTemplate: '%s | Vue-Project' })
</script>
<template>
  <div :class="cn(props.class)">
    <slot />
  </div>
</template>
