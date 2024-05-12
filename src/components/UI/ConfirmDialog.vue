<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog'
</script>
<template>
  <ConfirmDialog
    :draggable="false"
    :pt="{
      root: { class: 'w-[600px] max-w-full' },
      rejectButton: { label: { class: '!font-bold' } },
      acceptButton: { label: { class: '!font-bold' } }
    }"
  >
    <template #message="slotProps">
      <div class="flex-column align-items-center flex w-full gap-3">
        <font-awesome-icon
          v-if="slotProps.message.icon == 'info'"
          icon="fa-solid fa-circle-info"
          class="!h-6 !w-6"
        />
        <font-awesome-icon
          v-else-if="slotProps.message.icon == 'success'"
          icon="fa-solid fa-circle-check"
          class="!h-6 !w-6"
        />
        <font-awesome-icon
          v-else-if="slotProps.message.icon == 'error'"
          icon="fa-solid fa-circle-xmark"
          class="!h-6 !w-6"
        />
        <font-awesome-icon
          v-else-if="slotProps.message.icon == 'warn'"
          icon="fa-solid fa-circle-exclamation"
          class="!h-6 !w-6"
        />
        <font-awesome-icon
          v-else-if="slotProps.message.icon"
          :icon="slotProps.message.icon"
          class="!h-6 !w-6"
        />
        <div>{{ slotProps.message.message }}</div>
      </div>
    </template>
  </ConfirmDialog>
</template>
