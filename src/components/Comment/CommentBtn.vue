<script setup lang="ts">
import appConst from '@/appConst'
import { commentService } from '@/libs/services/commentService'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'

const props = defineProps<{
  slug: string
}>()

const { isPending, data } = useQuery({
  queryKey: [commentService.getComments.name, props.slug],
  queryFn: () => commentService.getComments(props.slug).then((res) => res.data.comments),
  staleTime: appConst.StaleTime,
  select: (data) => data.length || 0
})
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

    <span class="ml-2"> {{ data }} </span>
  </Button>
</template>
