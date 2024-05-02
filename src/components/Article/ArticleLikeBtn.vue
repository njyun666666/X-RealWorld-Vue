<script setup lang="ts">
import { articleService } from '@/libs/services/articleService'
import Button from 'primevue/button'
import { cn } from '@/libs/utils'
import { useLoginStore } from '@/stores/login'
import { ref, watch } from 'vue'
import { useArticleStore } from '@/stores/article'

const props = defineProps<{
  slug: string
}>()

const login = useLoginStore()
const isSubmitting = ref(false)
const articleStore = useArticleStore()
const article = ref(articleStore.article[props.slug])
const favorited = ref(article.value.favorited)
const favoritesCount = ref(article.value.favoritesCount)

const handleClick = async () => {
  if (!login.checkLogin()) return
  isSubmitting.value = true

  const tempFavorited = !article.value.favorited
  if (tempFavorited) {
    favoritesCount.value++
  } else {
    favoritesCount.value--
  }

  favorited.value = tempFavorited

  await articleService
    .toggleFavorite(props.slug, tempFavorited)
    .then(async (res) => {
      articleStore.mergeArticle(res.data.article)
    })
    .catch(() => {})

  isSubmitting.value = false
}

watch(
  () => articleStore.article[props.slug],
  (val) => {
    article.value = val
    favorited.value = val.favorited
    favoritesCount.value = val.favoritesCount
  }
)
</script>
<template>
  <Button
    severity="secondary"
    rounded
    text
    :class="
      cn('!text-sm hover:!bg-rose-500/15 hover:!text-rose-500 active:!bg-rose-500/25', {
        '!text-rose-500': favorited
      })
    "
    :loading="isSubmitting"
    @click.stop="handleClick"
    @mousedown.middle.stop.prevent
  >
    <font-awesome-icon v-if="!favorited" icon="fa-regular fa-heart" />
    <font-awesome-icon v-else icon="fa-solid fa-heart" />
    <span class="ml-2">
      {{ favoritesCount }}
    </span>
  </Button>
</template>
