<script setup lang="ts">
import { ref, watch } from 'vue'
import Listbox from 'primevue/listbox'
import { useStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

interface Options {
  name: string
  value: string
}

const lang = useStorage('lang', 'zh-Hant')
const { locale } = useI18n()
const options: Options[] = [
  { name: 'English', value: 'en' },
  { name: '中文', value: 'zh-Hant' }
]

const selected = ref<Options>()
selected.value = options.find((x) => x.value === locale.value)

watch(selected, (val) => {
  locale.value = val!.value
  lang.value = val!.value
})
</script>
<template>
  <div>
    <h2 class="px-4">
      {{ $t('page.Language') }}
    </h2>
    <div>
      <Listbox v-model="selected" :options="options" optionLabel="name" class="w-full !border-0" />
    </div>
  </div>
</template>
