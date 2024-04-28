<script setup lang="ts">
import { commentService } from '@/libs/services/commentService'
import CommentItem from './CommentItem.vue'
import CommentItemSkeleton from './CommentItemSkeleton.vue'

const props = defineProps<{
  slug: string
}>()
const { isPending, data } = commentService.query(props.slug)
</script>
<template>
  <CommentItemSkeleton v-if="isPending" />
  <template v-if="data">
    <CommentItem v-for="item in data" :key="item.id" :slug="slug" :comment="item" />
  </template>
</template>
