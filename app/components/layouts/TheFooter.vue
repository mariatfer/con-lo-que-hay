<script setup lang="ts">
import type { Footer } from '@/interfaces/footer'

const { data: footerLocales } = await useLocales<Footer>('footer')
</script>

<template>
  <footer class="footer">
    <p class="footer__paragraph">{{ footerLocales.thankYou }}</p>
    <p class="footer__paragraph">{{ footerLocales.bestRecipes }}</p>
    <p class="footer__paragraph">{{ footerLocales.copyright }}</p>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%;
  margin: 0 0 var(--s-margin-mobile) 0;
  @include flex(column, $gap: 0.5rem);
  &__paragraph {
    font-size: var(--s-font-cta);
    text-align: center;
    @include responsive() {
      font-size: var(--s-font-small);
    }
  }
}
</style>
