<script setup lang="ts">
import { inject, type ComputedRef } from 'vue'
import ArticleForm from './ArticleForm.vue'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'

const dialogRef = inject('dialogRef') as ComputedRef<DynamicDialogInstance>
const dialogProps = dialogRef.value.data

const closeDialog = () => {
  dialogRef.value.close()
}
</script>
<template>
  <ArticleForm expand v-bind="dialogProps" @close="closeDialog" />
</template>
