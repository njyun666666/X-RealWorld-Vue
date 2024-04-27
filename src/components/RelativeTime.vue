<script setup lang="ts">
import { ref, type HTMLAttributes } from 'vue'
import dayjs from 'dayjs'
import { cn } from '@/libs/utils'

const props = defineProps<{
  datetime: dayjs.ConfigType
  class?: HTMLAttributes['class']
}>()

const date = ref(dayjs(props.datetime))
</script>
<template>
  <div
    :class="cn('text-foreground/60 hover:underline', props.class)"
    v-tooltip="date.format('L LT')"
  >
    {{ dayjs().to(date) }}
  </div>
</template>
