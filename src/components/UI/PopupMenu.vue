<script setup lang="ts">
import Button, { type ButtonProps } from 'primevue/button'
import type { MenuItem } from 'primevue/menuitem'
import TieredMenu from 'primevue/tieredmenu'
import { ref } from 'vue'

export interface PopupMenuItem extends MenuItem {
  buttonProps?: ButtonProps
}

defineProps<{
  buttonProps?: ButtonProps
  items: PopupMenuItem[]
}>()

const menu = ref()

const toggle = (event: MouseEvent) => {
  menu.value.toggle(event)
}
</script>
<template>
  <Button @click.stop="toggle" @mousedown.middle.stop.prevent v-bind="buttonProps">
    <slot />
  </Button>
  <TieredMenu ref="menu" :model="items" popup>
    <template #item="{ item, props }">
      <a class="align-items-center flex !p-0" v-bind="props.action">
        <Button text class="grow !justify-start" v-bind="item.buttonProps">
          <font-awesome-icon :icon="item.icon" class="h-4 w-4" />
          <span class="ml-2 font-bold">{{ $t(item.label as string) }}</span>
        </Button>
      </a>
    </template>
  </TieredMenu>
</template>
