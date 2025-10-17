<script setup lang="ts">
import type { BaseField, Home } from '@/interfaces/home'

const { data: homeLocales } = await useLocales<Home>('home')

const message = ref('')
const selectedIngredients = ref<Set<string>>(new Set())
const ingredientCategories = homeLocales.checkBox.map((category) => ({
  id: category.id,
  title: category.title,
  type: category.type,
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

const recipe = ref('')
const loading = ref(false)
const error = ref(false)

const { parseMarkdown } = useSanitizedMarkdown()
const htmlRecipe = ref('')

async function generateRecipe() {
  const hasMessage = message.value.trim().length > 0
  const hasSelection = selectedIngredients.value.size > 0

  if (!hasMessage && !hasSelection) {
    htmlRecipe.value = homeLocales.prompt.validation
    error.value = true
    return
  }

  loading.value = true
  htmlRecipe.value = homeLocales.prompt.loading

  const { has, hasNot } = getIngredientSummary()

  const allergyCategory = ingredientCategories.find((cat) => cat.type === 'allergy')

  const allergies = allergyCategory
    ? allergyCategory.ingredients
        .filter((item) => selectedIngredients.value.has(item.name))
        .map((item) => item.name)
    : []

  const prompt = `${homeLocales.prompt.has} ${has.join(', ')}.\n${homeLocales.prompt.hasNot} ${hasNot.join(', ')}.\n${
    allergies.length ? homeLocales.prompt.allergies : ''
  } ${allergies.join(', ')}.\n${hasMessage ? homeLocales.prompt.message : ''} ${message.value}`

  try {
    const response = await window.puter.ai.chat(prompt)
    recipe.value = response.message.content
    htmlRecipe.value = await parseMarkdown(recipe.value)
  } catch (e) {
    htmlRecipe.value = homeLocales.prompt.error
    error.value = true
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="home">
    <h2 class="home__title">{{ homeLocales.title }}</h2>
    <form class="home__form" @submit.prevent="generateRecipe">
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
      <UiMainButton type="submit" :disabled="loading">{{
        homeLocales.sendButton
      }}</UiMainButton>
    </form>
    <Transition name="fade-slide">
      <div
        v-if="htmlRecipe"
        class="home__recipe"
        :class="{
          'home__recipe--status': error || loading,
        }"
        v-html="htmlRecipe"
      />
    </Transition>
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

  &__recipe {
    margin: 3rem auto;
    width: fit-content;
    max-width: 60rem;
    padding: 1rem;
    background-color: var(--c-background);
    border: 0.0625rem solid var(--c-primary);
    border-radius: var(--s-border-radius);
    @include box-shadow($blur: 1rem, $color: var(--c-primary));
    @include markdown();
    &--status {
      text-align: center;
    }
    @include responsive(51.25rem) {
      width: 85%;
    }
    @include responsive(37.5rem) {
      width: 100%;
    }
  }
}
</style>
