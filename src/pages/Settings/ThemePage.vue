<script setup lang="ts">
import { ref } from 'vue'
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { cn } from '@/libs/utils'
import Button from 'primevue/button'

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

const defaultValue = options.find(
  (x) => (isDark.value && x.value === 'dark') || (!isDark.value && x.value === 'light')
) as Options

const selected = ref(defaultValue)

const handleClick = (value: Options) => {
  isDark.value = value.value === 'dark'
  selected.value = value
}
</script>
<template>
  <div>
    <h2 class="px-4">
      {{ $t('page.Theme') }}
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
