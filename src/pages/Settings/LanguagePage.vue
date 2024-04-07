<script setup lang="ts">
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { cn } from '@/libs/utils'
import Button from 'primevue/button'

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
const defaultValue = options.find((x) => x.value === locale.value) as Options

const selected = ref<Options>(defaultValue)

const HandleClick = (value: Options) => {
  locale.value = value.value
  lang.value = value.value
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
        @click="() => HandleClick(item)"
      >
        <span>{{ $t(item.name) }}</span>
        <div class="grow"></div>
        <font-awesome-icon icon="fa-solid fa-check" v-if="selected.value === item.value" />
      </Button>
    </div>
  </div>
</template>
