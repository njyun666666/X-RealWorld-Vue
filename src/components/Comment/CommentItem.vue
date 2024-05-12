<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { type Comment } from '@/libs/services/commentService'
import { cn } from '@/libs/utils'
import ProfileImageBtn from '../Profile/ProfileImageBtn.vue'
import ProfileTextBtn from '../Profile/ProfileTextBtn.vue'
import RelativeTime from '../RelativeTime.vue'
import ItemSlot from '../Slots/ItemSlot.vue'
import { useLoginStore } from '@/stores/login'
import CommentAction from './CommentAction.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  slug: string
  comment: Comment
  connectLinePrev?: boolean
  connectLineNext?: boolean
}>()

const login = useLoginStore()
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
        <p class="break-normal" v-html="comment.body.replace(/\n/g, '<br/>')"></p>
      </div>

      <template v-if="login.loginState && login.user.username === comment.author.username">
        <CommentAction
          class="!absolute right-2 top-2 -mr-4 !h-9 !w-9"
          :slug="slug"
          :comment="comment"
        />
      </template>
    </template>
  </ItemSlot>
</template>
