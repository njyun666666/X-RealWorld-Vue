<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
const { locale } = useI18n()
document.documentElement.setAttribute('lang', locale.value)

useDark()
// const toggleDark = useToggle(isDark)
// toggleDark(!isDark.value)
</script>

<template>
  <RouterView />
</template>
