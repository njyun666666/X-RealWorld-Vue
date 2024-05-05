<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useScroll, useWindowSize } from '@vueuse/core'
import { cn } from '@/libs/utils'

const divRef = ref<HTMLDivElement>()
const { y: scrollY } = useScroll(window)
const { height: windowHeight } = useWindowSize()
const minTop = computed(() => windowHeight.value - (divRef.value?.clientHeight || 0))
const top = ref(0)

watch([scrollY, minTop], ([yVal, minTopVal], [yOldVal]) => {
  const diff = yVal - yOldVal
  const newTop = top.value - diff

  if (minTopVal >= 0 || newTop >= 0) {
    top.value = 0
  } else if (newTop <= minTopVal) {
    top.value = minTopVal
  } else {
    top.value = newTop
  }
})
</script>
<template>
  <div class="flex min-h-screen divide-x">
    <div class="grow">
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </div>
    <div class="lg:hidden"></div>
    <div :class="cn('hidden w-[280px] shrink-0 pl-8 lg:block')">
      <div ref="divRef" :class="cn('sticky w-full')" :style="{ top: `${top}px` }">
        <RouterView name="RightSidebar" />
      </div>
    </div>
  </div>
</template>
