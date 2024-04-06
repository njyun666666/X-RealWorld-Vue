<script setup lang="ts">
import Brand from '@/components/Brand.vue'
import { breakpoints } from '@/libs/common'
import { useLoginStore } from '@/stores/login'
import { useNavStore } from '@/stores/nav'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { cn } from '@/libs/utils'
import UserNav from './UserNav.vue'
import ScrollPanel from 'primevue/scrollpanel'
import Button from 'primevue/button'

const nav = useNavStore()
const login = useLoginStore()
const router = useRouter()

watch(
  () => login.loginState,
  (loginState) => {
    // if (!loginState) router.replace({ name: 'login' })
  }
)

watch(breakpoints.active(), () => {
  if (breakpoints.sm) {
    nav.navMobileOpenState = false
  }
})
</script>
<template>
  <div class="fixed h-full w-full overflow-hidden">
    <header
      class="flex h-12 w-full items-center gap-2 overflow-hidden border-b bg-surface-0 p-2 dark:bg-surface-900"
    >
      <Button
        class="sm:!hidden"
        text
        severity="secondary"
        @click="() => (nav.navMobileOpenState = true)"
      >
        <font-awesome-icon icon="fa-solid fa-bars" />
      </Button>
      <Brand />
      <div className="grow"></div>
      <div class="flex items-center gap-2">
        <Button
          v-if="!login.loginState"
          :label="$t('action.Login')"
          severity="secondary"
          size="small"
          @click="() => router.push({ name: 'login' })"
        />
        <Button v-if="!login.loginState" :label="$t('action.Register')" size="small" />
        <UserNav />
      </div>
    </header>

    <nav
      :class="
        cn(
          'group/nav absolute left-0 top-0 z-10 flex h-full w-0 flex-col overflow-hidden bg-surface-0 duration-200 dark:bg-surface-900',
          'sm:top-12 sm:h-[calc(100%-theme(height.12))] sm:w-13 sm:border-0',
          {
            'border-r': nav.navMobileOpenState,
            '!w-64': nav.navMobileOpenState || nav.navExpandedState,
            'xl:w-64': nav.navDefaultExpanded
          }
        )
      "
      @mouseenter="() => (nav.navExpandedState = true)"
      @mouseleave="() => (nav.navExpandedState = false)"
    >
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <button
        class="hidden bg-red-300 xl:block"
        @click="
          () => {
            nav.navDefaultExpanded = !nav.navDefaultExpanded
            nav.navExpandedState = nav.navDefaultExpanded
          }
        "
      >
        {{ nav.navDefaultExpanded }}
      </button>
    </nav>

    <div
      v-if="nav.navMobileOpenState"
      class="absolute left-0 top-0 z-[9] h-full w-full bg-black/80 duration-200"
      @click="() => (nav.navMobileOpenState = false)"
    ></div>

    <main
      :class="
        cn(
          'absolute left-0 top-12 h-[calc(100%-theme(height.12))] w-full overflow-hidden pl-0 duration-200',
          'sm:pl-13',
          {
            'xl:pl-64': nav.navDefaultExpanded
          }
        )
      "
    >
      <ScrollPanel class="h-full w-full">
        <div class="p-4">
          <RouterView />
        </div>
      </ScrollPanel>
    </main>
  </div>
</template>
