<script setup lang="ts">
import { cn } from '@/libs/utils'
</script>
<template>
  <div class="flex min-h-screen">
    <div class="w-[280px] border-r">
      <h2 class="px-4">
        {{ $t('page.Settings') }}
      </h2>
    </div>
    <div :class="cn(' grow border-r py-1')">
      <RouterView />
    </div>
  </div>
</template>
