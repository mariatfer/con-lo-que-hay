<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string | number
    name: string
    label: string
    ariaLabel: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const modelValue = defineModel<boolean>()
</script>

<template>
  <div class="field">
    <input
      :id="`${id}-${name}`"
      v-model="modelValue"
      type="checkbox"
      class="field__checkbox"
      :name="name"
      :aria-label="ariaLabel"
      :disabled="disabled"
    />
    <label :for="`${id}-${name}`" class="field__label">
      <span class="field__span">
        <svg
          viewBox="0 0 12 10"
          height="10px"
          width="12px"
          class="field__svg"
          aria-hidden="true"
        >
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </span>
      <span>{{ label }}</span>
    </label>
  </div>
</template>

<style scoped lang="scss">
.field {
  @include flex(column, flex-start);
  align-self: start;
  &__checkbox {
    display: none;
    visibility: hidden;
  }

  &__label {
    margin: auto;
    user-select: none;
    cursor: pointer;
    @include flex($gap: 1rem);
    color: var(--c-dark-brown);
    font-weight: 500;
    font-size: var(--s-font-p);

    &:hover .field__span:first-child {
      @include box-shadow(0, 0, 0.5rem, 0, var(--c-light-terracotta));
    }
  }

  &__span {
    display: inline-block;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);

    &:first-child {
      position: relative;
      min-width: 1.125rem;
      width: 1.125rem;
      height: 1.125rem;
      border-radius: 0.1875rem;
      background-color: var(--c-background);
      border: 0.0625rem solid var(--c-primary);
      transition: all 0.2s ease;

      &::before {
        content: '';
        width: 100%;
        height: 100%;
        background: var(--c-primary);
        display: block;
        transform: scale(0);
        opacity: 1;
        border-radius: 50%;
      }
    }

    &:last-child {
      padding-left: 0.5rem;
    }
  }

  &__svg {
    position: absolute;
    top: 0.1875rem;
    fill: none;
    stroke: var(--c-white);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1rem;
    stroke-dashoffset: 1rem;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
  }
  &__checkbox:checked + &__label &__span:first-child {
    background: var(--c-primary);
    border-color: var(--c-primary);
    animation: wave 0.4s ease;
  }

  &__checkbox:checked + &__label &__span:first-child &__svg {
    stroke-dashoffset: 0;
  }

  &__checkbox:checked + &__label &__span:first-child::before {
    transform: scale(3);
    opacity: 0;
    transition: all 0.6s ease;
  }
}

@keyframes wave {
  50% {
    transform: scale(0.9);
  }
}
</style>
