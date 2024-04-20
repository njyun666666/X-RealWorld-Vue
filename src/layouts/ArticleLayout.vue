<script setup lang="ts"></script>
<template>
  <div class="flex min-h-screen divide-x">
    <div class="grow">
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </div>
    <div class="lg:hidden"></div>
    <div class="hidden w-[280px] shrink-0 py-1 pl-8 lg:block">
      <RouterView name="RightSidebar" />
    </div>
  </div>
</template>
