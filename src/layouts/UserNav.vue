<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLoginStore } from '@/stores/login'
import Avatar from 'primevue/avatar'
import TieredMenu from 'primevue/tieredmenu'
import { useI18n } from 'vue-i18n'
import type { MenuItem } from 'primevue/menuitem'
import { useDark, useStorage } from '@vueuse/core'

interface UserNavItem extends MenuItem {
  isI18n?: boolean
}

const { t, locale } = useI18n()
const login = useLoginStore()
const isDark = useDark()
const lang = useStorage('lang', 'zh-Hant')

const menu = ref()
const items = ref<UserNavItem[]>([
  {
    label: login.payload?.sub
  },
  {
    separator: true
  },
  {
    label: 'UserNav.Language',
    isI18n: true,
    icon: 'fa-solid fa-globe',
    items: [
      {
        label: 'English',
        command: () => (locale.value = 'en')
      },
      {
        label: '中文',
        command: () => (locale.value = 'zh-Hant')
      }
    ]
  },
  {
    label: 'UserNav.Theme',
    isI18n: true,
    icon: 'fa-solid fa-palette',
    items: [
      {
        label: 'UserNav.Light',
        isI18n: true,
        command: () => (isDark.value = false)
      },
      {
        label: 'UserNav.Dark',
        isI18n: true,
        command: () => (isDark.value = true)
      }
    ]
  },
  {
    separator: true
  },
  {
    label: 'UserNav.Logout',
    isI18n: true,
    icon: 'fa-solid fa-right-from-bracket',
    command: () => login.logout()
  }
])

const toggle = (event: MouseEvent) => {
  menu.value.toggle(event)
}

watch(locale, () => {
  document.documentElement.setAttribute('lang', locale.value)
  lang.value = locale.value
})
</script>
<template>
  <div class="flex items-center">
    <Avatar
      v-if="login.payload?.photoURL"
      :image="login.payload?.photoURL"
      shape="circle"
      class="h-8 w-8 cursor-pointer"
      @click="toggle"
    />

    <Avatar v-else shape="circle" class="h-8 w-8 cursor-pointer" @click="toggle">
      <template #icon>
        <font-awesome-icon icon="fa-solid fa-user" />
      </template>
    </Avatar>

    <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup>
      <template #item="{ item, props, hasSubmenu }">
        <a class="align-items-center flex" v-bind="props.action">
          <font-awesome-icon v-if="item.icon" :icon="item.icon" class="mr-2" />
          <span>
            <!-- // -->
            {{ item.isI18n ? t(item.label as string) : item.label }}
          </span>
          <i v-if="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
        </a>
      </template>
    </TieredMenu>
  </div>
</template>
