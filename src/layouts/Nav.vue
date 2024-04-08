<script setup lang="ts">
import { cn } from '@/libs/utils'
import Button from 'primevue/button'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { breakpoints } from '@/libs/common'

interface NavModel {
  icon: string
  name: string
  to: RouteLocationRaw
}

const items: NavModel[] = [
  {
    icon: 'fa-solid fa-house',
    name: 'page.Home',
    to: { name: 'index' }
  },
  {
    icon: 'fa-solid fa-gear',
    name: 'page.Settings',
    to: { name: 'settings' }
  }
]
</script>
<template>
  <RouterLink v-for="item in items" :key="item.name" :to="item.to" activeClass="group is-active">
    <Button
      rounded
      text
      plain
      :class="cn('h-12 w-12 xl:w-full xl:!justify-start ', 'group-[.is-active]:!text-primary')"
      v-tooltip="{ value: $t(item.name), disabled: breakpoints.active().value == 'xl' }"
    >
      <font-awesome-icon :icon="item.icon" class="!h-5 !w-5" />
      <span class="ml-4 hidden xl:block">
        {{ $t(item.name) }}
      </span>
    </Button>
  </RouterLink>
</template>
