<script setup lang="ts">
import { ref, inject, defineEmits } from 'vue'

const countFromChild = ref(99)
const countFromParent = inject('countFromParent') as number

const emit = defineEmits<{
  submit: [val: number]
  submitobj: [{ count: number }]
}>()

defineExpose({
  count: countFromChild
})
</script>

<template>
  <div class="space-x-1 rounded border p-2">
    <div>ChildTest</div>
    <button type="button" class="rounded bg-surface-500 p-1" @click="countFromParent++">
      countFromParent: {{ countFromParent }}
    </button>

    <button
      type="button"
      class="rounded bg-surface-500 p-1"
      @click="
        () => {
          countFromChild++
          emit('submit', countFromChild)
          emit('submitobj', { count: countFromChild })
        }
      "
    >
      countFromChild: {{ countFromChild }}
    </button>
  </div>
</template>
