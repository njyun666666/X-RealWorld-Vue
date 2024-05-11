<script setup lang="ts">
import { type ComputedRef } from 'vue'
import ArticleForm from './ArticleForm.vue'
import { inject } from 'vue'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'

const dialogRef = inject('dialogRef') as ComputedRef<DynamicDialogInstance>

const closeDialog = () => {
  dialogRef.value.close()
}
</script>
<template>
  <ArticleForm expand @close="closeDialog" />
</template>
