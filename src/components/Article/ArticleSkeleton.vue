<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
</script>
<template>
  <div class="px-4 pt-2">
    <div class="flex items-center gap-3">
      <Skeleton shape="circle" class="!h-10 !w-10" />
      <Skeleton class="!h-6 !w-1/3" />
    </div>

    <Skeleton class="my-3.5 !h-12" />

    <p>
      <Skeleton v-for="n in 6" :key="n" class="my-2.5 !h-4" />
    </p>

    <div class="py-4">
      <Skeleton class="!h-6 !w-36" />
    </div>
  </div>

  <div class="divide-y">
    <div></div>
    <div class="flex justify-between px-4 py-2">
      <Skeleton class="!h-10 !w-16 !rounded-full" />
      <Skeleton class="!h-10 !w-16 !rounded-full" />
      <Skeleton class="!h-10 !w-16 !rounded-full" />
    </div>
    <div></div>
  </div>
</template>
