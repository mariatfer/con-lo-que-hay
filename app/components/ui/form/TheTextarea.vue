<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string | number
    name: string
    label: string
    ariaLabel: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
  }>(),
  {
    placeholder: '',
    disabled: false,
    required: false,
  },
)

const inputValue = ref('')
const emit = defineEmits<{
  (e: 'update:modelValue' | 'blur', value: string): void
}>()

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(inputValue, (newValue) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('update:modelValue', newValue)
  }, 300)
})

const isFocused = ref(false)
const showPlaceholder = ref(false)

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

function handleFocus() {
  isFocused.value = true
  showPlaceholder.value = true
}

function handleBlur(e: FocusEvent) {
  isFocused.value = false
  showPlaceholder.value = false
  const value = (e.target as HTMLInputElement).value
  emit('blur', value)
}
</script>

<template>
  <div class="field">
    <label :for="`${id}-${name}`" class="field__label">
      {{ label }}
    </label>
    <textarea
      :id="`${id}-${name}`"
      v-model="inputValue"
      :name="name"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      :disabled="disabled"
      :required="required"
      class="field__textarea"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="onInput"
    ></textarea>
  </div>
</template>

<style lang="scss" scoped>
.field {
  width: 100%;
  margin: 3rem 0 2rem 0;
  height: fit-content;
  @include flex(column, $gap: 1.5rem);

  &__label {
    font-family: var(--f-font-title);
    font-weight: 300;
    font-size: clamp(var(--s-font-h3-mobile), 2.8vw, var(--s-font-h3));
    line-height: 1.35em;
    text-align: center;
  }

  &__textarea {
    width: 60%;
    max-width: 60rem;
    display: block;
    border: 0.0625rem solid var(--c-primary);
    border-radius: var(--s-border-radius);
    background-color: var(--c-background);
    transition: var(--t-transition);
    padding: 0.5rem;
    @include responsive(51.25rem) {
      width: 85%;
    }
    @include responsive(30rem) {
      width: 100%;
    }

    &::placeholder {
      padding: 0 0 0 0.1rem;
    }

    &:hover {
      @include box-shadow(0, 0.625rem, 1.25rem, -0.9375rem, var(--c-light-terracotta));
    }

    &:focus {
      outline: none;
      border-color: var(--c-dark-terracotta);
    }

    &:disabled {
      background-color: #eeeeee;
      cursor: not-allowed;
    }
  }
}
</style>
