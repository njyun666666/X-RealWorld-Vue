<script setup lang="ts">
import { cn } from '@/libs/utils'
import Button from 'primevue/button'
import type { HTMLAttributes } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
const router = useRouter()
const handleClick = () => {
  if (router.options.history.state.back) {
    router.back()
  } else {
    router.push({ name: 'index' })
  }
}
</script>
<template>
  <div
    :class="
      cn(
        'sticky top-0 z-10 flex w-full max-w-full items-center gap-2 bg-background/80 px-2 py-1 backdrop-blur-sm',
        props.class
      )
    "
  >
    <Button
      rounded
      text
      plain
      :class="cn('h-12 w-12 ')"
      v-tooltip.bottom="$t('action.Back')"
      @click="handleClick"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-left" class="!h-5 !w-5" />
    </Button>
    <div class="grow">
      <slot></slot>
    </div>
  </div>
</template>
