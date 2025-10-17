<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'reset' | 'submit'
    disabled?: boolean
  }>(),
  {
    type: 'button',
    disabled: false,
  },
)
</script>

<template>
  <button type="submit" :disabled="disabled" class="main-button"><slot /></button>
</template>

<style lang="scss" scoped>
.main-button {
  background-color: var(--c-background);
  color: var(--c-dark-brown);
  border: 0.125rem solid var(--c-dark-brown);
  padding: 0.5rem 1.25rem;
  font-size: var(--s-font-p);
  font-weight: 500;
  border-radius: var(--s-border-radius);
  cursor: pointer;
  transition: var(--t-transition);
  @include box-shadow(0, 0.125rem, 0.25rem);

  &:hover {
    background-color: var(--c-dark-brown);
    color: var(--c-background);
    @include box-shadow(0, 0.25rem, 0.5rem, $color: rgba(0, 0, 0, 0.2));
    transform: translateY(-0.0625rem);
  }

  &:active {
    transform: translateY(0);
    @include box-shadow(0, 0.125rem, 0.25rem, $color: rgba(0, 0, 0, 0.2), $inset: true);
  }

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
    cursor: not-allowed;
  }
}
</style>
