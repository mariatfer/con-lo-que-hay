<script setup lang="ts">
import type { Footer } from '@/interfaces/footer'

const { data: footerLocales } = useLocales<Footer>('footer')
</script>

<template>
  <footer v-if="footerLocales" class="footer">
    <p v-if="footerLocales?.thankYou" class="footer__paragraph">
      {{ footerLocales.thankYou }}
    </p>
    <p v-if="footerLocales?.bestRecipes" class="footer__paragraph">
      {{ footerLocales.bestRecipes }}
    </p>
    <p v-if="footerLocales?.copyright" class="footer__paragraph">
      {{ footerLocales.copyright }}
    </p>
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
