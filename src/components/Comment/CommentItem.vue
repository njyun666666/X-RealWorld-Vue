<script setup lang="ts">
import { ref, type HTMLAttributes } from 'vue'
import { commentService, type Comment } from '@/libs/services/commentService'
import { cn } from '@/libs/utils'
import ProfileImageBtn from '../Profile/ProfileImageBtn.vue'
import ProfileTextBtn from '../Profile/ProfileTextBtn.vue'
import RelativeTime from '../RelativeTime.vue'
import ItemSlot from '../slot/ItemSlot.vue'
import TieredMenu from 'primevue/tieredmenu'
import Button, { type ButtonProps } from 'primevue/button'
import type { MenuItem } from 'primevue/menuitem'
import { useLoginStore } from '@/stores/login'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

interface CommentMenu extends MenuItem {
  buttonProps?: ButtonProps
}

const props = defineProps<{
  class?: HTMLAttributes['class']
  slug: string
  comment: Comment
  connectLinePrev?: boolean
  connectLineNext?: boolean
}>()

const isSubmitting = ref(false)
const login = useLoginStore()
const toast = useToast()
const query = commentService.query(props.slug)
const { t } = useI18n()
const menu = ref()
const items = ref<CommentMenu[]>([
  {
    label: 'action.Remove',
    icon: 'fa-solid fa-trash',
    buttonProps: { severity: 'danger' },
    command: () => {
      handleDelete()
    }
  }
])

const toggle = (event: MouseEvent) => {
  menu.value.toggle(event)
}

const handleDelete = async () => {
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
  <ItemSlot
    :class="cn(props.class)"
    :connectLinePrev="connectLinePrev"
    :connectLineNext="connectLineNext"
  >
    <template #ProfileImage>
      <ProfileImageBtn v-bind="comment.author" />
    </template>
    <template #content>
      <div class="flex gap-3">
        <ProfileTextBtn :profile="comment.author" />
        <span>
          <RelativeTime :datetime="comment.createdAt" />
        </span>
      </div>
      <div>
        <p class="break-normal" v-html="comment.body.replace(/\\n/g, '<br/>')"></p>
      </div>

      <!-- menu -->
      <template v-if="login.loginState && login.user.username === comment.author.username">
        <Button
          type="button"
          rounded
          @click="toggle"
          severity="secondary"
          text
          aria-haspopup="true"
          aria-controls="overlay_tmenu"
          class="!absolute right-2 top-2 -mr-4 !h-9 !w-9"
          :loading="isSubmitting"
          @click.stop
          @mousedown.middle.stop.prevent
        >
          <font-awesome-icon v-if="isSubmitting" icon="fa-solid fa-circle-notch" spin />
          <font-awesome-icon v-else icon="fa-solid fa-ellipsis" />
        </Button>
        <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup>
          <template #item="{ item, props }">
            <a class="align-items-center flex !p-0" v-bind="props.action">
              <Button text class="grow !justify-start" v-bind="item.buttonProps">
                <font-awesome-icon :icon="item.icon" />
                <span class="ml-2">{{ $t(item.label as string) }}</span>
              </Button>
            </a>
          </template>
        </TieredMenu>
      </template>
    </template>
  </ItemSlot>
</template>
