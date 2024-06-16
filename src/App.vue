<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import { useLocaleStore } from './stores/locale'
import type { LangType } from './i18n/config'
import Toast from './components/UI/Toast.vue'
import DynamicDialog from 'primevue/dynamicdialog'
import ConfirmDialog from './components/UI/ConfirmDialog.vue'
import { useLoginStore } from './stores/login'
import { onBeforeMount } from 'vue'

const login = useLoginStore()
const { locale } = useI18n()
const localeStore = useLocaleStore()
localeStore.setLang(locale.value as LangType)

useDark()

onBeforeMount(async () => {
  await login.authentication()
})
</script>

<template>
  <RouterView />
  <Toast />
  <DynamicDialog />
  <ConfirmDialog />
</template>
