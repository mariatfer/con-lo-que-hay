<script setup lang="ts">
import type { Navbar } from '@/interfaces/navbar'

const { data: navbarLocales } = await useLocales<Navbar>('navbar')
</script>

<template>
  <header class="header">
    <h1 class="header__title">{{ navbarLocales.title }}</h1>
  </header>
</template>

<style lang="scss" scoped>
.header {
  @include flex();
  width: 100%;
  padding: var(--s-padding-mobile) 0 0 0;
  &__title {
    color: var(--c-primary);
    text-shadow: 0 0 9rem var(--c-light-terracotta);
    text-align: center;
    font-size: clamp(2.5rem, 6vw + 1rem, 5.5rem);
  }
}
</style>
