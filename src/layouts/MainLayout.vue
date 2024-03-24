<script setup lang="ts">
import { breakpoints } from '@/libs/common'
import { useStorage } from '@vueuse/core'
import { ref, watch } from 'vue'

const navDefaultExpanded = useStorage('navDefaultExpanded', true)
const navExpandedState = ref(false)
const navMobileOpenState = ref(false)

watch(breakpoints.active(), () => {
  if (breakpoints.sm) {
    navMobileOpenState.value = false
  }
})
</script>
<template>
  <div class="fixed h-full w-full overflow-hidden">
    <header
      class="bg-background flex h-12 w-full items-center space-x-2 overflow-hidden border-b p-2"
    >
      <button
        class="bg-red-300 sm:hidden"
        @click="() => (navMobileOpenState = !navMobileOpenState)"
      >
        {{ navMobileOpenState }}
      </button>
      <div class="text-primary font-mono text-3xl font-bold">Vue-Project</div>
      <div className="grow"></div>
      <div></div>
    </header>

    <nav
      :class="[
        'group/nav bg-background absolute left-0 top-0 z-10 flex h-full w-0 flex-col overflow-hidden duration-200',
        'sm:w-13 sm:top-12 sm:h-[calc(100%-theme(height.12))] sm:border-0',
        {
          'border-r': navMobileOpenState,
          '!w-64': navMobileOpenState || navExpandedState,
          'xl:w-64': navDefaultExpanded
        }
      ]"
      @mouseenter="() => (navExpandedState = true)"
      @mouseleave="() => (navExpandedState = false)"
    >
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <button
        class="hidden bg-red-300 xl:block"
        @click="
          () => {
            navDefaultExpanded = !navDefaultExpanded
            navExpandedState = navDefaultExpanded
          }
        "
      >
        {{ navDefaultExpanded }}
      </button>
    </nav>

    <div
      v-if="navMobileOpenState"
      class="absolute left-0 top-0 z-[9] h-full w-full bg-black/80 duration-200"
      @click="() => (navMobileOpenState = false)"
    ></div>

    <main
      :class="[
        'bg-foreground/5 absolute left-0 top-12 h-[calc(100%-theme(height.12))] w-full overflow-hidden pl-0 duration-200',
        'sm:pl-13',
        {
          'xl:pl-64': navDefaultExpanded
        }
      ]"
    >
      <div class="pl-72">
        navMobileOpenState: {{ navMobileOpenState }}
        <br />
        navDefaultExpanded: {{ navDefaultExpanded }}
        <br />
        navExpandedState: {{ navExpandedState }}
      </div>

      <RouterView />
    </main>
  </div>
</template>
