<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/libs/utils'
import Button from 'primevue/button'
import { useLocaleStore } from '@/stores/locale'
import type { LangType } from '@/i18n/config'

interface Options {
  name: string
  value: LangType
}

const localeStore = useLocaleStore()
const options: Options[] = [
  { name: 'English', value: 'en' },
  { name: '中文', value: 'zh-tw' }
]
const defaultValue = options.find((x) => x.value === localeStore.lang) as Options

const selected = ref<Options>(defaultValue)

const handleClick = (value: Options) => {
  localeStore.setLang(value.value)
  selected.value = value
}
</script>
<template>
  <div>
    <h2 class="px-4">
      {{ $t('page.Language') }}
    </h2>
    <div class="flex flex-col">
      <Button
        v-for="item in options"
        :key="item.name"
        text
        plain
        :class="
          cn('min-h-12 w-full !justify-start !rounded-none', {
            '!bg-primary/10 !text-primary': selected.value === item.value
          })
        "
        @click="() => handleClick(item)"
      >
        <span>{{ item.name }}</span>
        <div class="grow"></div>
        <font-awesome-icon icon="fa-solid fa-check" v-if="selected.value === item.value" />
      </Button>
    </div>
  </div>
</template>
