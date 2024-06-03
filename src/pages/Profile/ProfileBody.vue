<script setup lang="ts">
import { useRoute } from 'vue-router'
import { webTitle } from '@/libs/common'
import BackHeader from '@/components/BackHeader.vue'
import { type Profile } from '@/libs/services/profileService'
import Image from '@/components/UI/Image.vue'
import ProfileImage from '@/components/Profile/ProfileImage.vue'
import ProfileFollowBtn from '@/components/Profile/ProfileFollowBtn.vue'
import { useProfileStore } from '@/stores/profile'
import { ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import TabMenu from 'primevue/tabmenu'
import type { MenuItem } from 'primevue/menuitem'
import { cn } from '@/libs/utils'
import ProfilePostsTab from './ProfilePostsTab.vue'
import ProfileLikesTab from './ProfileLikesTab.vue'
import ProfileSkeleton from '@/components/Profile/ProfileSkeleton.vue'
import { watchWithFilter } from '@vueuse/core'

const route = useRoute()
const username = ref<string>(route.params['username'] as string)
const profileStore = useProfileStore()
const profile = ref<Profile>()
const isPending = ref(true)
const toast = useToast()
const items = ref<MenuItem[]>([{ label: 'page.Posts' }, { label: 'page.Likes' }])
const comps = [ProfilePostsTab, ProfileLikesTab]

watchWithFilter(
  () => [route.name, route.params['username']],
  () => {
    isPending.value = true
    profileStore.getActiveTab(username.value)
    username.value = route.params['username'] as string

    profileStore
      .getProfile(username.value)
      .then((data) => {
        webTitle.value = data.username
        profile.value = data
        isPending.value = false
      })
      .catch(() => {
        toast.add({ severity: 'error', summary: 'error', life: 3000 })
      })
  },
  {
    immediate: true,
    eventFilter: (invoke, { args }) => {
      var [routeName, routeUsername] = args[0]

      if (routeName == 'profile' && routeUsername) {
        invoke()
      }
    }
  }
)

watch(
  () => profileStore.profile[username.value as string],
  (val) => {
    profile.value = val
  }
)
</script>
<template>
  <BackHeader>
    <h1 class="m-0 line-clamp-1 p-0">
      {{ profile?.username }}
    </h1>
  </BackHeader>
  <ProfileSkeleton v-if="isPending" />
  <template v-if="!isPending && profile">
    <div class="flex aspect-[600/250] w-full flex-col justify-center overflow-hidden">
      <div class="aspect-[600/250] w-full">
        <Image
          :src="`https://picsum.photos/1280/720?random=${username}`"
          class="w-full"
          preview
          width="100%"
          height="100%"
          :skeletonProps="{ borderRadius: '0' }"
        />
      </div>
    </div>
    <div class="flex">
      <div
        class="relative z-[1] -mt-18 ml-4 !h-32 !w-32 overflow-hidden rounded-full border-4 border-background bg-background"
      >
        <ProfileImage :username="profile.username" :image="profile.image" />
      </div>
      <div class="flex grow justify-end gap-2 p-2">
        <ProfileFollowBtn :profile="profile" />
      </div>
    </div>
    <div class="w-full overflow-hidden px-4">
      <h2>{{ profile.username }}</h2>
      <p v-html="profile.bio.replace(/\n/g, '<br />')"></p>
    </div>
  </template>
  <TabMenu
    v-model:activeIndex="profileStore.activeTab[username]"
    :model="items"
    :pt="{
      menu: { class: '!bg-transparent' },
      menuitem: {
        class: cn('grow shrink w-1/2')
      }
    }"
  >
    <template #item="{ item, props }">
      <a
        v-bind="props.action"
        class="flex justify-center gap-2 !rounded-none align-middle hover:bg-foreground/10"
      >
        <font-awesome-icon :icon="item.icon" class="h-4 w-4" v-if="item.icon" />
        <span>{{ $t(String(item.label)) }}</span>
      </a>
    </template>
  </TabMenu>
  <KeepAlive>
    <component :is="comps[profileStore.activeTab[username]]"></component>
  </KeepAlive>
</template>
