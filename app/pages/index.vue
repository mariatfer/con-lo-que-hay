<script setup lang="ts">
import type { BaseField, Home } from '@/interfaces/home'

const { data: homeLocales } = await useLocales<Home>('home')

const message = ref('')
const selectedIngredients = ref<Set<string>>(new Set())
const ingredientCategories = homeLocales.checkBox.map((category) => ({
  id: category.id,
  title: category.title,
  ingredients: (category.ingredients as BaseField[]).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
  ),
}))
function toggleIngredient(name: string, checked?: boolean) {
  if (checked) {
    selectedIngredients.value.add(name)
  } else {
    selectedIngredients.value.delete(name)
  }
}
function getIngredientSummary() {
  const allNames = ingredientCategories.flatMap((category) =>
    category.ingredients.map((item) => item.name),
  )

  const has = allNames.filter((name) => selectedIngredients.value.has(name))
  const hasNot = allNames.filter((name) => !selectedIngredients.value.has(name))

  return {
    has,
    hasNot,
  }
}
function handleSubmit() {
  const { has, hasNot } = getIngredientSummary()

  console.log('Tiene:', has)
  console.log('No tiene:', hasNot)
  console.log('Mensaje:', message.value)

  const prompt = `${homeLocales.prompt.has} ${has.join(', ')}.\n${homeLocales.prompt.hasNot} ${hasNot.join(', ')}.\n${message.value ? homeLocales.prompt.message : ''} ${message.value}`
  console.log('Prompt para la IA:', prompt)
}
</script>

<template>
  <div class="home">
    <h2 class="home__title">{{ homeLocales.title }}</h2>
    <form class="home__form" @submit.prevent="handleSubmit">
      <div v-if="ingredientCategories.length" class="home__categories">
        <article
          v-for="category in ingredientCategories"
          :key="category.id"
          class="home__category"
        >
          <h3>{{ category.title }}</h3>
          <div class="home__ingredients">
            <UiFormTheCheckbox
              v-for="item in category.ingredients"
              :key="item.id"
              v-bind="item"
              :model-value="selectedIngredients.has(item.name)"
              @update:model-value="(checked) => toggleIngredient(item.name, checked)"
            />
          </div>
        </article>
      </div>
      <UiFormTheTextarea v-bind="homeLocales.textArea" v-model="message" />
      <UiMainButton type="submit">{{ homeLocales.sendButton }}</UiMainButton>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding: 0 var(--s-padding);
  margin: var(--s-margin-mobile) 0;
  @include responsive() {
    padding: 0 var(--s-padding-mobile);
  }

  &__title {
    text-align: center;
    margin: 0 0 3rem 0;
  }
  &__form {
    @include flex(column, $gap: 1rem);
  }

  &__categories {
    @include flex($align: baseline, $wrap: wrap, $gap: 4rem);
  }

  &__category {
    @include flex(column, $justify: flex-start, $wrap: wrap, $gap: 1.5rem);
    max-width: 18.75rem;
    text-align: center;
  }

  &__ingredients {
    @include flex($wrap: wrap, $gap: 2rem);
  }
}
</style>
