<script setup lang="ts">
import { cn } from '@/libs/utils'
</script>
<template>
  <div class="flex min-h-screen">
    <div class="grow border-r">
      <RouterView />
    </div>
    <div
      :class="cn('sticky top-0 hidden h-screen w-[280px] shrink-0 bg-white/10 py-1 pl-8 lg:block')"
    >
      123
    </div>
  </div>
</template>
