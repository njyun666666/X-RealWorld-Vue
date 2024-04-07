<script setup lang="ts">
import { cn } from '@/libs/utils'
import Brand from '@/components/Brand.vue'
import ScrollPanel from 'primevue/scrollpanel'
import Button from 'primevue/button'
import { useLoginStore } from '@/stores/login'
import { RouterLink } from 'vue-router'
import Nav from './Nav.vue'

const login = useLoginStore()
</script>
<template>
  <div
    :class="
      cn(
        'mx-auto flex w-full divide-x',
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
            <Brand isNav />
          </div>
          <div class="flex grow flex-col gap-2 py-1 pb-5 pl-1 pr-1 md:pr-8">
            <Nav />
          </div>
          <div
            class="sticky bottom-0 z-[1] flex w-full flex-col gap-2 bg-background pb-1 pl-1 pr-1 pt-2 md:pr-8"
          >
            <RouterLink :to="{ name: 'login' }" v-if="!login.loginState">
              <Button severity="secondary" rounded :class="cn('h-12 w-12 xl:w-full')">
                <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
                <span class="ml-2 hidden xl:block">{{ $t('action.Login') }}</span>
              </Button>
            </RouterLink>

            <RouterLink :to="{ name: 'register' }" v-if="!login.loginState">
              <Button rounded :class="cn('h-12 w-12 xl:w-full')">
                <font-awesome-icon icon="fa-solid fa-user-plus" />
                <span class="ml-2 hidden xl:block">{{ $t('action.Register') }}</span>
              </Button>
            </RouterLink>
          </div>
        </div>
      </ScrollPanel>
    </header>
    <main :class="cn('min-h-screen grow')">
      <RouterView />
    </main>
  </div>
</template>
