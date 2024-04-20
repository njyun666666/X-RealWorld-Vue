<script setup lang="ts">
import { cn } from '@/libs/utils'
</script>
<template>
  <div class="flex min-h-screen divide-x">
    <div class="grow">
      <slot name="main"></slot>
    </div>
    <div class="lg:hidden"></div>
    <div :class="cn('hidden w-[280px] shrink-0 py-1 pl-8 lg:block')">
      <slot name="rightBar"></slot>
    </div>
  </div>
</template>
