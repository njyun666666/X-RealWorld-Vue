<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import PopupMenu, { type PopupMenuItem } from '../UI/PopupMenu.vue'

const props = defineProps<{
  slug: string
  username: string
}>()
const { copy } = useClipboard()
const url = `${location.protocol}/${location.host}/${props.username}/${props.slug}`
const items = ref<PopupMenuItem[]>([
  {
    label: 'action.CopyURL',
    icon: 'fa-regular fa-copy',
    buttonProps: { severity: 'secondary' },
    command: () => {
      copy(url)
    }
  }
])
</script>
<template>
  <PopupMenu
    :items="items"
    :buttonProps="{
      severity: 'secondary',
      text: true,
      rounded: true,
      class: '!text-sm'
    }"
  >
    <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />
  </PopupMenu>
</template>
