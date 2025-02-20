<script setup lang="ts">
import { commentService } from '@/libs/services/commentService'
import CommentItem from './CommentItem.vue'
import CommentItemSkeleton from './CommentItemSkeleton.vue'
import { useQuery } from '@tanstack/vue-query'
import appConst from '@/appConst'

const props = defineProps<{
  slug: string
}>()
const { isPending, data } = useQuery({
  queryKey: ['comment', props.slug],
  queryFn: async () => commentService.getComments(props.slug).then((res) => res.data.comments),
  staleTime: appConst.StaleTime
})
</script>
<template>
  <CommentItemSkeleton v-if="isPending" />
  <template v-if="data">
    <CommentItem v-for="item in data" :key="item.id" :slug="slug" :comment="item" />
  </template>
</template>
