<script setup lang="ts">
import { ref, watch } from 'vue'
import Listbox from 'primevue/listbox'
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

interface Options {
  name: string
  value: string
}

const isDark = useDark()
const { t } = useI18n()
const options: Options[] = [
  { name: t('action.Light'), value: 'light' },
  { name: t('action.Dark'), value: 'dark' }
]

const selected = ref<Options>()
selected.value = options.find(
  (x) => (isDark.value && x.value === 'dark') || (!isDark.value && x.value === 'light')
)

watch(selected, (val) => {
  isDark.value = val?.value === 'dark'
})
</script>
<template>
  <div>
    <h2 class="px-4">
      {{ $t('page.Theme') }}
    </h2>
    <div>
      <Listbox v-model="selected" :options="options" optionLabel="name" class="w-full !border-0" />
    </div>
  </div>
</template>
