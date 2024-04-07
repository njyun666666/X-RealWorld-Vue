<script setup lang="ts">
import { breakpoints } from '@/libs/common'
import { cn } from '@/libs/utils'
import Brand from '@/components/Brand.vue'
import ScrollPanel from 'primevue/scrollpanel'
import Button from 'primevue/button'
</script>
<template>
  <div
    :class="
      cn(
        'mx-auto flex w-full',
        'md:max-w-[calc(50px+theme(size.2)+600px)]',
        'lg:max-w-[calc(50px+theme(size.2)+600px+280px)]',
        'xl:max-w-[calc(280px+theme(size.2)+600px+280px)]'
      )
    "
  >
    <header
      :class="
        cn(
          'sticky top-0 flex h-screen shrink-0 grow-0 flex-col items-center gap-2 ',
          'w-[calc(50px+theme(size.2))] min-w-[calc(50px+theme(size.2))] md:w-[calc(80px+theme(size.2))] xl:w-[280px]'
        )
      "
    >
      <ScrollPanel class="h-full w-full">
        <div class="flex h-full w-full flex-col">
          <div class="sticky top-0 z-[1] w-full bg-background pb-1 pl-1 pr-1 pt-1 md:pr-8">
            <Brand />
          </div>
          <div class="flex grow flex-col gap-2 py-1 pb-5 pl-1 pr-1 md:pr-8"></div>
          <div
            class="sticky bottom-0 z-[1] flex w-full flex-col gap-2 bg-background pb-1 pl-1 pr-1 pt-2 md:pr-8"
          >
            <Button label="X" :class="cn('h-[50px] w-[50px] xl:w-full')" rounded />
            <Button label="Y" :class="cn('h-[50px] w-[50px] xl:w-full')" rounded />
          </div>
        </div>
      </ScrollPanel>
    </header>
    <main :class="cn('flex grow border-l ')">
      <div :class="cn('grow border-r')">
        <h1>{{ breakpoints.active() }}</h1>
        <RouterView />
      </div>
      <div
        :class="cn('sticky top-0 hidden h-screen w-[280px] shrink-0 bg-white/10 lg:block')"
      ></div>
    </main>
  </div>
</template>
