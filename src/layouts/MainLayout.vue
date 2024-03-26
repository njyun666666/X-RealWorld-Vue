<script setup lang="ts">
import Brand from '@/components/Brand.vue'
import { breakpoints } from '@/libs/common'
import { useLoginStore } from '@/stores/login'
import { useNavStore } from '@/stores/nav'
import { useDark, useStorage } from '@vueuse/core'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const nav = useNavStore()
const { locale } = useI18n()
const lang = useStorage('lang', 'zh-Hant')
const isDark = useDark()
const login = useLoginStore()
const router = useRouter()

watch(
  () => login.loginState,
  (loginState) => {
    if (!loginState) router.replace({ name: 'login' })
  }
)

watch(locale, () => {
  document.documentElement.setAttribute('lang', locale.value)
  lang.value = locale.value
})

watch(breakpoints.active(), () => {
  if (breakpoints.sm) {
    nav.navMobileOpenState = false
  }
})
</script>
<template>
  <div class="fixed h-full w-full overflow-hidden">
    <header
      class="flex h-12 w-full items-center space-x-2 overflow-hidden border-b bg-background p-2"
    >
      <button class="bg-red-300 sm:hidden" @click="() => (nav.navMobileOpenState = true)">
        {{ nav.navMobileOpenState }}
      </button>
      <Brand />
      <div className="grow"></div>
      <div class="space-x-2">
        <select v-model="isDark">
          <option :value="false">light</option>
          <option :value="true">dark</option>
        </select>

        <select v-model="locale">
          <option value="en">en</option>
          <option value="zh-Hant">zh-Hant</option>
        </select>

        <button type="button" class="rounded bg-surface-500 p-1" @click="() => login.logout()">
          {{ $t('UserNav.Logout') }}
        </button>
      </div>
    </header>

    <nav
      :class="[
        'group/nav absolute left-0 top-0 z-10 flex h-full w-0 flex-col overflow-hidden bg-background duration-200',
        'sm:top-12 sm:h-[calc(100%-theme(height.12))] sm:w-13 sm:border-0',
        {
          'border-r': nav.navMobileOpenState,
          '!w-64': nav.navMobileOpenState || nav.navExpandedState,
          'xl:w-64': nav.navDefaultExpanded
        }
      ]"
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
      :class="[
        'absolute left-0 top-12 h-[calc(100%-theme(height.12))] w-full overflow-hidden bg-foreground/5 pl-0 duration-200',
        'sm:pl-13',
        {
          'xl:pl-64': nav.navDefaultExpanded
        }
      ]"
    >
      <div class="pl-72">
        navMobileOpenState: {{ nav.navMobileOpenState }}
        <br />
        navDefaultExpanded: {{ nav.navDefaultExpanded }}
        <br />
        navExpandedState: {{ nav.navExpandedState }}
      </div>

      <RouterView />
    </main>
  </div>
</template>
