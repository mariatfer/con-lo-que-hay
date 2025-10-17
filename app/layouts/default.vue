<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'es',
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
