<script setup lang="ts">
import Page from '../../pages/Page.vue'
import Card from 'primevue/card'
</script>

<template>
  <Page :title="$t('page.Home')" class="p-5">
    <h1>{{ $t('page.Home') }}</h1>

    <Card>
      <template #title>Simple Card</template>
      <template #content>
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
          repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
          ratione quam perferendis esse, cupiditate neque quas!
        </p>
      </template>
    </Card>
  </Page>
</template>
