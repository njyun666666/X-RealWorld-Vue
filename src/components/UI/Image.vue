<script setup lang="ts">
import Image from 'primevue/image'
import { ref } from 'vue'
import Skeleton, { type SkeletonProps } from 'primevue/skeleton'

defineProps<{
  src: string
  preview?: boolean
  width?: string
  height?: string
  skeletonProps?: SkeletonProps
}>()

defineOptions({
  inheritAttrs: false
})

const loaded = ref(false)
</script>
<template>
  <Image
    v-show="loaded"
    v-bind="$attrs"
    :src="src"
    :preview="preview"
    :style="{
      width: width,
      height: height
    }"
    :pt="{
      image: {
        onload: () => {
          loaded = true
        }
      }
    }"
  >
  </Image>
  <Skeleton v-if="true" :width="width" :height="height" v-bind="skeletonProps" />
</template>
