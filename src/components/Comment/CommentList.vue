<script setup lang="ts">
import { commentService } from '@/libs/services/commentService'
import { useQuery } from '@tanstack/vue-query'
import CommentItem from './CommentItem.vue'
import appConst from '@/appConst'
import CommentItemSkeleton from './CommentItemSkeleton.vue'

const props = defineProps<{
  slug: string
}>()

const { isPending, data } = useQuery({
  queryKey: [commentService.getComments.name, props.slug],
  queryFn: () => commentService.getComments(props.slug).then((res) => res.data.comments),
  staleTime: appConst.StaleTime
})
</script>
<template>
  <CommentItemSkeleton v-if="isPending" />
  <template v-if="data">
    <CommentItem v-for="item in data" :key="item.id" :comment="item" />
  </template>
</template>
