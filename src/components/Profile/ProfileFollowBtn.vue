<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Button from 'primevue/button'
import { cn } from '@/libs/utils'
import { profileService, type Profile } from '@/libs/services/profileService'
import { useLoginStore } from '@/stores/login'
import { useProfileStore } from '@/stores/profile'

const props = defineProps<{
  profile: Profile
}>()

type iconType = 'follow' | 'unfollow' | 'following'

const login = useLoginStore()
const isSubmitting = ref(false)
const profileStore = useProfileStore()
const profile = ref(profileStore.profile[props.profile.username])
const following = ref(profile.value.following)
const isHover = ref(false)
const iconState = computed<iconType>(() => {
  if (profile.value.following) {
    return isHover.value ? 'unfollow' : 'following'
  }

  return isHover.value ? 'following' : 'follow'
})

const handleMouseEnter = () => {
  isHover.value = true
}

const handleMouseLeave = () => {
  isHover.value = false
}

const handleClick = async () => {
  if (!login.checkLogin()) return
  isSubmitting.value = true

  const tempFollowing = !profile.value.following

  following.value = tempFollowing

  await profileService
    .toggleFollow(profile.value.username, tempFollowing)
    .then(async (res) => {
      profileStore.mergeProfile(res.data.profile)
    })
    .catch(() => {})

  isSubmitting.value = false
}

watch(
  () => profileStore.profile[props.profile.username],
  (val) => {
    profile.value = val
    following.value = val.following
  }
)

watch(
  () => login.loginState,
  (val) => {
    if (!val) {
      following.value = false
    }
  }
)
</script>
<template>
  <Button
    rounded
    :outlined="following"
    :severity="following ? 'secondary' : undefined"
    :class="
      cn('!h-10 !w-10 !p-0 !text-sm', {
        'hover:!border-rose-500 hover:!bg-rose-500/15 hover:!text-rose-500 active:!bg-rose-500/25':
          following
      })
    "
    :loading="isSubmitting"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <div
      v-tooltip.bottom="following ? $t('action.Unfollow') : $t('action.Follow')"
      class="flex h-full w-full items-center justify-center"
    >
      <font-awesome-icon
        v-if="iconState == 'following'"
        icon="fa-solid fa-heart"
        class="!h-5 !w-5"
      />
      <font-awesome-icon
        v-else-if="iconState == 'follow'"
        icon="fa-regular fa-heart"
        class="!h-5 !w-5"
      />
      <font-awesome-icon v-else icon="fa-solid fa-heart-crack" class="!h-5 !w-5" />
    </div>
  </Button>
</template>
