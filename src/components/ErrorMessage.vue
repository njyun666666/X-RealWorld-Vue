<script setup lang="ts">
import type { ResponseErrors } from '@/libs/api/realworldAPI'
import Message from 'primevue/message'

defineProps<{
  keypath: string
  errors?: ResponseErrors
}>()
</script>
<template>
  <Message severity="error" :closable="false" v-if="errors">
    <div v-for="[key, items] in Object.entries(errors.errors)" :key="key">
      <span class="font-bold">
        {{ $t(keypath + '.' + key.replace(/ /g, '_')) }}
      </span>
      <span> : </span>
      <span v-if="typeof items === 'string'">
        {{ $t('message.' + items.replace(/ /g, '_')) }}
      </span>
      <span v-else>
        {{ items.map((item) => $t('message.' + item.replace(/ /g, '_'))).join(', ') }}
      </span>
    </div>
  </Message>
</template>
