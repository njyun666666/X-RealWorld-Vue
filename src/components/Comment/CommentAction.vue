<script setup lang="ts">
import { ref, type HTMLAttributes } from 'vue'
import PopupMenu, { type PopupMenuItem } from '../UI/PopupMenu.vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { cn } from '@/libs/utils'
import { useConfirm } from 'primevue/useconfirm'
import { commentService, type Comment } from '@/libs/services/commentService'
import { useLoginStore } from '@/stores/login'

const props = defineProps<{
  slug: string
  comment: Comment
  class?: HTMLAttributes['class']
}>()

const login = useLoginStore()
const { t } = useI18n()
const isSubmitting = ref(false)
const toast = useToast()
const query = commentService.query(props.slug)
const confirm = useConfirm()

const items = ref<PopupMenuItem[]>([
  {
    label: 'action.Remove',
    icon: 'fa-solid fa-trash',
    buttonProps: { severity: 'danger' },
    command: () => {
      handleDeleteClick()
    }
  }
])

const handleDeleteClick = () => {
  confirm.require({
    message: t('title.ConfirmText', {
      action: t('action.Remove').toLowerCase(),
      title: t('title.Comment').toLowerCase()
    }),
    header: t('title.Confirm', { title: t('action.Remove').toLowerCase() }),
    icon: 'warn',
    rejectProps: {
      label: t('action.Cancel'),
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: t('action.Remove'),
      severity: 'danger'
    },
    accept: () => {
      doDelete()
    },
    reject: () => {}
  })
}

const doDelete = async () => {
  isSubmitting.value = true

  await commentService
    .deleteComment(props.slug, props.comment.id)
    .then(async () => {
      await query.refetch()
      toast.add({ severity: 'success', summary: t('message.RemoveSuccess'), life: 3000 })
    })
    .catch(() => {})

  isSubmitting.value = false
}
</script>
<template>
  <PopupMenu
    v-if="login.loginState && login.user.username === comment.author.username"
    :items="items"
    :buttonProps="{
      severity: 'secondary',
      text: true,
      rounded: true,
      loading: isSubmitting,
      class: cn(['!h-9 !w-9'], props.class)
    }"
  >
    <font-awesome-icon v-if="isSubmitting" icon="fa-solid fa-circle-notch" spin />
    <font-awesome-icon v-else icon="fa-solid fa-ellipsis" />
  </PopupMenu>
</template>
