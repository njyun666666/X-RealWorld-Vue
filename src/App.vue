<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import { useLocaleStore } from './stores/locale'
import type { LangType } from './i18n/config'
import Toast from './components/UI/Toast.vue'

const { locale } = useI18n()
const localeStore = useLocaleStore()
localeStore.setLang(locale.value as LangType)

useDark()
</script>

<template>
  <RouterView />
  <Toast />
</template>
