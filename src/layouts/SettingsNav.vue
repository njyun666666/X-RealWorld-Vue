<script setup lang="ts">
import { cn } from '@/libs/utils'
import Button from 'primevue/button'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

interface NavModel {
  name: string
  to: RouteLocationRaw
}

const items: NavModel[] = [
  {
    name: 'page.Language',
    to: { name: 'language' }
  },
  {
    name: 'page.Theme',
    to: { name: 'theme' }
  }
]
</script>
<template>
  <div class="flex flex-col">
    <RouterLink v-for="item in items" :key="item.name" :to="item.to" activeClass="group is-active">
      <Button
        text
        plain
        :class="
          cn(
            'min-h-12 w-full !justify-start !rounded-none',
            'group-[.is-active]:!bg-primary/10 group-[.is-active]:!text-primary'
          )
        "
      >
        <span>{{ $t(item.name) }}</span>
        <div class="grow"></div>
        <font-awesome-icon icon="fa-solid fa-angle-right" />
      </Button>
    </RouterLink>
  </div>
</template>
