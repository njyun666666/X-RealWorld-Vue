<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import DropdownMenu, { type DropdownItem } from '../UI/DropdownMenu.vue'

const props = defineProps<{
  slug: string
  username: string
}>()
const { copy } = useClipboard()
const url = `${location.protocol}/${location.host}/${props.username}/${props.slug}`
const items = ref<DropdownItem[]>([
  {
    label: 'action.CopyURL',
    icon: 'fa-solid fa-copy',
    buttonProps: { severity: 'secondary' },
    command: () => {
      copy(url)
    }
  }
])
</script>
<template>
  <DropdownMenu
    :items="items"
    :buttonProps="{
      severity: 'secondary',
      text: true,
      rounded: true,
      class: '!text-sm'
    }"
  >
    <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />
  </DropdownMenu>
</template>
