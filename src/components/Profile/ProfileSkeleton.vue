<script setup lang="ts">
import { cn } from '@/libs/utils'
import type { HTMLAttributes } from 'vue'
import Skeleton from 'primevue/skeleton'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
<template>
  <div :class="cn('flex w-full flex-col', props.class)">
    <div class="aspect-[600/250] w-full">
      <Skeleton class="!h-full !w-full !rounded-none" />
    </div>
  </div>
  <div class="flex">
    <div
      class="relative z-[1] -mt-18 ml-4 !h-32 !w-32 overflow-hidden rounded-full border-4 border-background bg-background"
    >
      <Skeleton shape="circle" class="!h-full !w-full" />
    </div>
    <div class="flex grow justify-end gap-2 p-2">
      <!-- button   -->
    </div>
  </div>
  <div class="w-full overflow-hidden px-4">
    <Skeleton class="!my-3 !h-8 !w-1/3" />

    <Skeleton v-for="n in 3" :key="n" class="my-2.5 !h-4" />
  </div>
</template>
