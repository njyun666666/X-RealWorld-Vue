<script setup lang="ts">
import Button from 'primevue/button'
import { useDialog } from 'primevue/usedialog'
import ArticleFormDialog from './ArticleFormDialog.vue'
import { useLoginStore } from '@/stores/login'
import { breakpoints } from '@/libs/common'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  isAdd?: boolean
}>()

const dialog = useDialog()
const login = useLoginStore()
const { t } = useI18n()

const handleClick = () => {
  if (!login.checkLogin()) return

  dialog.open(ArticleFormDialog, {
    data: {
      isAdd: props.isAdd
    },
    props: {
      header: t(props.isAdd ? 'title.Add' : 'title.Edit', { title: t('title.Article') }),
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
  <Button
    rounded
    class="h-12 w-12 xl:w-full"
    v-tooltip="{ value: $t('action.Post'), disabled: breakpoints.active().value == 'xl' }"
    @click.stop="handleClick"
    @mousedown.middle.stop.prevent
  >
    <font-awesome-icon icon="fa-solid fa-pencil" class="!h-5 !w-5" />
    <span class="ml-2 hidden font-bold xl:block">
      {{ $t('action.Post') }}
    </span>
  </Button>
</template>
