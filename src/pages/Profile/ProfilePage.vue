<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ProfileBody from './ProfileBody.vue'
import { watchWithFilter } from '@vueuse/core'
import { useLoginStore } from '@/stores/login'

const login = useLoginStore()
const route = useRoute()
const username = ref<string>(route.params['username'] as string)

watchWithFilter(
  () => [route.name, route.params['username']],
  () => {
    username.value = route.params['username'] as string
  },
  {
    eventFilter: (invoke, { args }) => {
      var [routeName, routeUsername] = args[0]

      if (routeName == 'profile' && routeUsername) {
        invoke()
      }
    }
  }
)
</script>
<template>
  <ProfileBody :key="`${username}/${login.currentUsername}`" />
</template>
