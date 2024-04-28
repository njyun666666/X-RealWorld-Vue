<script setup lang="ts">
import { commentService } from '@/libs/services/commentService'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import { computed } from 'vue'

const props = defineProps<{
  slug: string
}>()

const { isPending, data } = commentService.query(props.slug)
const count = computed(() => data.value?.length || 0)
</script>
<template>
  <Skeleton v-if="isPending" class="!h-9.5 !w-16 !rounded-full" />
  <Button
    v-else
    severity="secondary"
    rounded
    text
    class="!text-sm"
    @click.stop="() => console.log('comment')"
    @mousedown.middle.stop.prevent
  >
    <font-awesome-icon icon="fa-regular fa-comment" />

    <span class="ml-2"> {{ count }} </span>
  </Button>
</template>
