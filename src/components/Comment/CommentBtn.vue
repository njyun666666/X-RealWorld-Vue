<script setup lang="ts">
import { commentService } from '@/libs/services/commentService'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import { computed } from 'vue'
import { useDialog } from 'primevue/usedialog'
import CommentFormDialog from './CommentFormDialog.vue'
import type { Article } from '@/libs/services/articleService'
import { useLoginStore } from '@/stores/login'

const props = defineProps<{
  article: Article
}>()

const { isPending, data } = commentService.query(props.article.slug)
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
      style: {
        width: '100vw',
        maxWidth: '600px'
      },
      modal: true,
      draggable: false,
      position: 'top'
    }
  })
}
</script>
<template>
  <Skeleton v-if="isPending" class="!h-9.5 !w-16 !rounded-full" />
  <Button
    v-else
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
