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
import type { MenuItem } from 'primevue/menuitem'
import ProfilePostsTab from './ProfilePostsTab.vue'
import ProfileLikesTab from './ProfileLikesTab.vue'
import ProfileSkeleton from '@/components/Profile/ProfileSkeleton.vue'
import { watchWithFilter } from '@vueuse/core'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import type { ArticleTabType } from '@/stores/article'
import { useLoginStore } from '@/stores/login'
import ProfileEditBtn from '@/components/Profile/ProfileEditBtn.vue'

const login = useLoginStore()
const route = useRoute()
const username = ref<string>(route.params['username'] as string)
const profileStore = useProfileStore()
const profile = ref<Profile>()
const isPending = ref(true)
const toast = useToast()
const items = ref<MenuItem[]>([
  { key: 'profilePosts', label: 'page.Posts' },
  { key: 'profileLikes', label: 'page.Likes' }
])

const comps: Partial<Record<ArticleTabType, any>> = {
  profilePosts: ProfilePostsTab,
  profileLikes: ProfileLikesTab
}

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
        <template v-if="login.loginState && login.user.username == username">
          <ProfileEditBtn />
        </template>
        <template v-else>
          <ProfileFollowBtn :profile="profile" />
        </template>
      </div>
    </div>
    <div class="w-full overflow-hidden px-4">
      <h2>{{ profile.username }}</h2>
      <p v-html="profile.bio.replace(/\n/g, '<br />')"></p>
    </div>
  </template>

  <Tabs v-model:value="profileStore.activeTab[username]">
    <TabList :pt="{ tabs: { class: '!bg-transparent' } }">
      <template v-for="tab in items" :key="tab.key">
        <Tab
          v-if="tab.visible ?? true"
          :value="tab.key"
          :pt="{ root: { class: 'w-full hover:!bg-foreground/10' } }"
        >
          <span>{{ $t(String(tab.label)) }}</span>
        </Tab>
      </template>
    </TabList>
  </Tabs>

  <KeepAlive>
    <component :is="comps[profileStore.activeTab[username]]"></component>
  </KeepAlive>
</template>
