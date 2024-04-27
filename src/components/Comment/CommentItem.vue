<script setup lang="ts">
import type { Comment } from '@/libs/services/commentService'
import { cn } from '@/libs/utils'
import ProfileImageBtn from '../Profile/ProfileImageBtn.vue'
import ProfileTextBtn from '../Profile/ProfileTextBtn.vue'
import RelativeTime from '../RelativeTime.vue'
import ItemSlot from '../slot/ItemSlot.vue'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  comment: Comment
  connectLinePrev?: boolean
  connectLineNext?: boolean
}>()
</script>

<template>
  <ItemSlot
    :class="cn(props.class)"
    :connectLinePrev="connectLinePrev"
    :connectLineNext="connectLineNext"
  >
    <template #ProfileImage>
      <ProfileImageBtn :profile="comment.author" />
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
    </template>
  </ItemSlot>
</template>
