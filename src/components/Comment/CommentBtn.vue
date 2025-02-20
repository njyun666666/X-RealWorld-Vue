<script setup lang="ts">
import { commentService } from '@/libs/services/commentService'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import { computed } from 'vue'
import CommentFormDialog from './CommentFormDialog.vue'
import type { Article } from '@/libs/services/articleService'
import { useLoginStore } from '@/stores/login'
import { useDialog } from '@/libs/common'
import appConst from '@/appConst'
import { useQuery } from '@tanstack/vue-query'

const props = defineProps<{
  article: Article
}>()

const { isPending, data } = useQuery({
  queryKey: ['comment', props.article.slug],
  queryFn: async () =>
    commentService.getComments(props.article.slug).then((res) => res.data.comments),
  staleTime: appConst.StaleTime
})
const count = computed(() => data.value?.length || 0)
const dialog = useDialog()
const login = useLoginStore()

const handleClick = () => {
  if (!login.checkLogin()) return

  dialog.open(CommentFormDialog, {
    data: {
      article: props.article
    },
    props: {
      header: ' ',
      position: 'top'
    }
  })
}
</script>
<template>
  <Skeleton v-if="isPending" class="!h-9.5 !w-16 !rounded-full" />
  <Button
    severity="secondary"
    rounded
    text
    class="!text-sm"
    @click.stop="handleClick"
    @mousedown.middle.stop.prevent
  >
    <font-awesome-icon icon="fa-regular fa-comment" />
    <span class="ml-2"> {{ count }} </span>
  </Button>
</template>
