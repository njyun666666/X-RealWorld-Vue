<script setup lang="ts">
import Toast from 'primevue/toast'
</script>
<template>
  <Toast position="bottom-center">
    <template #message="slotProps">
      <font-awesome-icon
        v-if="slotProps.message.severity == 'info'"
        icon="fa-solid fa-circle-info"
        class="!h-6 !w-6"
      />
      <font-awesome-icon
        v-else-if="slotProps.message.severity == 'success'"
        icon="fa-solid fa-circle-check"
        class="!h-6 !w-6"
      />
      <font-awesome-icon
        v-else-if="slotProps.message.severity == 'error'"
        icon="fa-solid fa-circle-xmark"
        class="!h-6 !w-6"
      />
      <font-awesome-icon
        v-else-if="slotProps.message.severity == 'warn'"
        icon="fa-solid fa-circle-exclamation"
        class="!h-6 !w-6"
      />
      <div class="grow">
        <div class="p-toast-summary !font-bold">
          {{ slotProps.message.summary }}
        </div>
        <div v-if="slotProps.message.detail" class="p-toast-detail">
          {{ slotProps.message.detail }}
        </div>
      </div>
    </template>
  </Toast>
</template>
