<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'
const { language } = storeToRefs(useLanguageStore())
useHead({
  htmlAttrs: {
    lang: language,
  },
})
</script>

<template>
  <div class="layout">
    <LayoutsTheNavbar />
    <main class="layout__content">
      <slot />
    </main>
    <LayoutsTheFooter />
    <div ref="overlay" class="fade-overlay" />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  @include flex(column, flex-start, flex-start);
  min-height: 100vh;

  &__content {
    width: 100%;
    flex: 1;
  }
}
</style>
