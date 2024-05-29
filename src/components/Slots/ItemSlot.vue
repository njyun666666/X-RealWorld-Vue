<script setup lang="ts">
import { cn } from '@/libs/utils'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  connectLinePrev?: boolean
  connectLineNext?: boolean
}>()
</script>
<template>
  <article :class="cn('w-full px-4', props.class)">
    <div class="flex w-full">
      <div class="flex flex-col pr-2">
        <div class="flex h-4 w-full shrink-0 justify-center pb-1">
          <div v-if="connectLinePrev" class="h-full w-0.5 rounded-b-full bg-border"></div>
        </div>
        <slot name="ProfileImage"></slot>
        <div class="flex h-4 w-full grow justify-center pt-1">
          <div v-if="connectLineNext" class="h-full w-0.5 rounded-t-full bg-border"></div>
        </div>
      </div>
      <div class="relative grow pt-4">
        <slot name="content"></slot>
      </div>
    </div>
  </article>
</template>
