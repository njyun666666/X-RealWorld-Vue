<script setup lang="ts">
import { cn } from '@/libs/utils'
</script>
<template>
  <div class="flex min-h-screen divide-x">
    <div class="w-[280px]">
      <h2 class="px-4">
        {{ $t('page.Settings') }}
      </h2>
    </div>
    <div :class="cn('grow py-1')">
      <RouterView />
    </div>
    <div></div>
  </div>
</template>
