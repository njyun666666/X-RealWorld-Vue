<script setup lang="ts">
import { cn } from '@/libs/utils'
import type { HTMLAttributes } from 'vue'
import Skeleton from 'primevue/skeleton'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
<template>
  <div :class="cn('w-full p-4 pb-1', props.class)">
    <div :class="cn('flex w-full')">
      <div class="pr-2">
        <Skeleton shape="circle" class="!h-10 !w-10" />
      </div>
      <div class="grow">
        <div class="flex gap-3">
          <Skeleton class="!h-6 !w-1/3" />
          <Skeleton class="!h-6 !w-28" />
        </div>
        <div>
          <Skeleton class="my-3.5 !h-12" />
          <div class="my-4">
            <Skeleton v-for="n in 3" :key="n" class="my-2.5 !h-4" />
          </div>
        </div>
        <div class="my-2 flex justify-between">
          <Skeleton class="!h-10 !w-16 !rounded-full" />
          <Skeleton class="!h-10 !w-16 !rounded-full" />
          <Skeleton class="!h-10 !w-16 !rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>
