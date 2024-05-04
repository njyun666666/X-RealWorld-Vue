<script setup lang="ts">
import appConst from '@/appConst'
import { tagService } from '@/libs/services/tagService'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import { RouterLink } from 'vue-router'
import Skeleton from 'primevue/skeleton'

const { isPending, data } = useQuery({
  queryKey: ['TagList'],
  queryFn: () => tagService.getTags().then((res) => res.data.tags),
  staleTime: appConst.StaleTime
})
</script>
<template>
  <div class="flex flex-col overflow-hidden rounded-xl border">
    <template v-if="isPending">
      <div v-for="(item, index) in 9" :key="item" class="px-4 py-2">
        <Skeleton class="!h-6 !rounded-none" :width="`${((index % 3) + 1) * 30}%`" />
      </div>
    </template>
    <template v-else>
      <RouterLink v-for="item in data" :key="item" :to="{ name: 'search', query: { tag: item } }">
        <Button
          :label="item"
          severity="secondary"
          text
          class="w-full !justify-start !rounded-none"
        />
      </RouterLink>
    </template>
  </div>
</template>
