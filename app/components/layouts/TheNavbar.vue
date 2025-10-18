<script setup lang="ts">
import type { Navbar } from '@/interfaces/navbar'

const { data: navbarLocales } = useLocales<Navbar>('navbar')
</script>

<template>
  <header v-if="navbarLocales" class="header">
    <h1 v-if="navbarLocales?.title" class="header__title">{{ navbarLocales.title }}</h1>
  </header>
  <UiLanguageButton />
</template>

<style lang="scss" scoped>
.header {
  @include flex();
  width: 100%;
  padding: 2rem 0.5rem 0 0.5rem;
  &__title {
    width: 100%;
    color: var(--c-primary);
    text-shadow: 0 0 9rem var(--c-light-terracotta);
    text-align: center;
    font-size: clamp(2.5rem, 6vw + 1rem, 5.5rem);
  }
}
</style>
