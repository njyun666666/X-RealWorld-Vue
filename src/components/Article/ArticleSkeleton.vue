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
        <Skeleton shape="circle" size="2.5rem" />
      </div>
      <div class="grow">
        <div class="flex gap-3">
          <Skeleton width="30%" height="1.5rem" />
          <Skeleton width="5rem" height="1.5rem" />
        </div>
        <div>
          <Skeleton class="my-3.5" width="100%" height="3rem" />
          <div class="my-4">
            <Skeleton v-for="n in 3" :key="n" class="my-2.5" width="100%" height="1rem" />
          </div>
        </div>
        <div class="my-2 flex justify-between">
          <Skeleton class="!rounded-full" width="4rem" height="2.5rem" />
          <Skeleton class="!rounded-full" width="4rem" height="2.5rem" />
          <Skeleton class="!rounded-full" width="4rem" height="2.5rem" />
        </div>
      </div>
    </div>
  </div>
</template>
