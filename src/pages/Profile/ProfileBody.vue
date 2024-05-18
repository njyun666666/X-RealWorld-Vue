<script setup lang="ts">
import { useRoute } from 'vue-router'
import { webTitle } from '@/libs/common'
import BackHeader from '@/components/BackHeader.vue'
import { profileService, type Profile } from '@/libs/services/profileService'
import Image from 'primevue/image'
import ProfileImage from '@/components/Profile/ProfileImage.vue'
import ProfileFollowBtn from '@/components/Profile/ProfileFollowBtn.vue'
import { useProfileStore } from '@/stores/profile'
import { ref, watch } from 'vue'
import { useLoginStore } from '@/stores/login'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const username = ref<string>()
const login = useLoginStore()
const profileStore = useProfileStore()
const profile = ref<Profile>()
const isPending = ref(true)
const toast = useToast()

watch(
  route,
  () => {
    username.value = route.params['username'] as string

    if (!username.value) return

    isPending.value = true

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
    immediate: true
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
  <div v-if="!isPending && profile" class="flex flex-col">
    <Image
      :src="`https://picsum.photos/seed/${profile.username}/600/250`"
      class="aspect-[600/250] w-full"
      width="100%"
      preview
    />
    <div class="flex">
      <ProfileImage
        :username="profile.username"
        :image="profile.image"
        class="relative z-[1] -mt-18 ml-4 !h-32 !w-32 overflow-hidden rounded-full border-4 border-background"
      />
      <div class="flex grow justify-end gap-2 p-2">
        <ProfileFollowBtn :profile="profile" />
      </div>
    </div>
    <div>
      <h2>{{ username }}</h2>
    </div>
  </div>
</template>
