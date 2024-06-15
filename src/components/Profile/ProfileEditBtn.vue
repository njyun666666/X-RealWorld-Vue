<script setup lang="ts">
import Button from 'primevue/button'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/libs/utils'
import ProfileEditForm from './ProfileEditForm.vue'
import { useLoginStore } from '@/stores/login'
import { useI18n } from 'vue-i18n'
import { useDialog } from '@/libs/common'
import type { UserUpdate } from '@/libs/services/userService'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

defineOptions({
  inheritAttrs: false
})

const dialog = useDialog()
const login = useLoginStore()
const { t } = useI18n()

const data = computed<UserUpdate>(() => {
  return { email: login.user.email, bio: login.user.bio, image: login.user.image }
})

const handleClick = () => {
  if (!login.checkLogin()) return

  dialog.open(ProfileEditForm, {
    data: { data },
    props: {
      header: t('title.Edit', { title: t('title.Profile') }),
      position: 'top'
    }
  })
}
</script>
<template>
  <Button
    :label="$t('action.EditProfile')"
    severity="contrast"
    outlined
    rounded
    :class="cn([props.class])"
    @click="handleClick"
  />
</template>
