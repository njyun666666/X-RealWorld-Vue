<script setup lang="ts">
import { webTitle } from '@/libs/common'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const route = useRoute()
const message = route.params['message']
const { t } = useI18n()

webTitle.value = t(`message.${message}`)
</script>

<template>
  <h1>{{ $t(`message.${message}`) }}</h1>
</template>
