<script setup lang="ts">
import { cn } from '@/libs/utils'
import SettingsNav from './SettingsNav.vue'
</script>
<template>
  <div class="flex min-h-screen divide-x">
    <div class="w-[280px]">
      <h2 class="px-4">
        {{ $t('page.Settings') }}
      </h2>
      <div>
        <SettingsNav />
      </div>
    </div>
    <div :class="cn('grow')">
      <RouterView />
    </div>
    <div></div>
  </div>
</template>
