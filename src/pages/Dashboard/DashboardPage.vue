<script setup lang="ts">
import { menuService } from '@/libs/services/menuService'
import Page from '../../pages/Page.vue'

const handleClick = () => {
  menuService.getMenu()
}
</script>

<template>
  <Page :title="$t('page.Home')">
    <h1>{{ $t('page.Home') }}</h1>

    <div>
      <button @click="handleClick" class="rounded bg-primary p-2">call api</button>
    </div>
  </Page>
</template>
