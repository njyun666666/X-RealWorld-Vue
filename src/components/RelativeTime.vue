<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
const props = defineProps<{
  datetime: string
}>()

const date = ref(dayjs(props.datetime))
</script>
<template>
  <div class="hover:underline" v-tooltip="date.format('L LT')">
    {{ dayjs().to(date) }}
  </div>
</template>
