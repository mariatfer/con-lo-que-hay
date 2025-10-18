<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const languageStore = useLanguageStore()
const { currentLanguageInfo, isReady } = storeToRefs(languageStore)

onMounted(() => {
  languageStore.initLanguage()
})

const isFading = ref(false)

const { setLocale } = useI18n()

const handleLanguageChange = async () => {
  isFading.value = true

  await nextTick()
  setTimeout(() => {
    languageStore.toggleLanguage()
    if (!languageStore.currentLanguageInfo) {
      return
    }
    setLocale(languageStore.currentLanguageInfo.value)

    isFading.value = false
  }, 400)
}
</script>

<template>
  <button
    v-show="isReady && currentLanguageInfo"
    :class="['language-button', { fading: isFading }]"
    :title="currentLanguageInfo?.name"
    @click="handleLanguageChange"
  >
    <icon
      v-if="currentLanguageInfo"
      :name="currentLanguageInfo.icon"
      class="language-button__icon"
    />
  </button>
</template>

<style lang="scss" scoped>
.language-button {
  position: fixed;
  right: 1rem;
  top: 1rem;
  @include flex;
  border-radius: 2.5rem;
  font-size: 0.875rem;
  background: transparent;
  cursor: pointer;
  opacity: 1;
  border: 0.1563rem solid var(--c-primary);
  will-change: transform;
  transition: var(--t-transition);
  @include responsive() {
    right: unset;
    top: unset;
    left: 1rem;
    bottom: 1rem;
  }
  &:hover {
    transform: scale(1.05);
    border-color: var(--c-dark-terracotta);
  }
  &.fading {
    opacity: 0.5;
  }
  &__icon {
    width: 2rem;
    height: 2rem;
    @include responsive() {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}
</style>
