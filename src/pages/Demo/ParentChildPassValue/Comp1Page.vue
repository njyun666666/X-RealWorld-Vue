<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import ChildTest from './ChildTest.vue'

const countFromParent = ref(10)
const countFromChild = ref(0)
const childref = ref<InstanceType<typeof ChildTest> | null>(null)

onMounted(() => {
  countFromChild.value = childref.value?.count || 0
  console.log('onMounted ', childref.value?.count)
})

provide('countFromParent', countFromParent)
</script>

<template>
  <div class="p-2">
    <div class="space-y-2 rounded border p-1">
      <div>
        Parent: {{ countFromParent }}
        <br />
        Child: {{ countFromChild }}
        <br />
        Child ref: {{ childref?.count }}
      </div>
      <ChildTest ref="childref" @submitobj="(val) => (countFromChild = val.count)" />
    </div>
  </div>
</template>
