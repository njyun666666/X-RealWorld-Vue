<script setup lang="ts">
import Page from '../../pages/Page.vue'
</script>

<template>
  <Page :title="$t('page.Home')">
    <h1>Dashboard page</h1>
    {{ $t('page.Home') }}
  </Page>
</template>
