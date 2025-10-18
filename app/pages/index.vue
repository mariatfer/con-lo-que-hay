<script setup lang="ts">
import type { BaseField, Home } from '@/interfaces/home'
import type { IngredientCategoryType } from '~/types/home'

const { data: homeLocales } = useLocales<Home>('home')

const message = ref('')
const selectedIngredients = ref<Set<string>>(new Set())
const ingredientCategories = computed(() => {
  const categories = homeLocales.value?.checkBox ?? []
  return categories.map((category) => ({
    id: category.id,
    title: category.title,
    type: category.type as IngredientCategoryType,
    ingredients: (category.ingredients as BaseField[]).sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
    ),
  }))
})

const hasCategories = computed(() => ingredientCategories.value.length > 0)

function getIngredientKey(type: IngredientCategoryType, name: string): string {
  return `${type}:${name}`
}

function toggleIngredient(type: IngredientCategoryType, name: string, checked?: boolean) {
  const key = getIngredientKey(type, name)
  if (checked) {
    selectedIngredients.value.add(key)
  } else {
    selectedIngredients.value.delete(key)
  }
}

function getIngredientSummary() {
  const allKeys = ingredientCategories.value.flatMap((category) =>
    category.ingredients.map((item) => getIngredientKey(category.type, item.name)),
  )

  const has = Array.from(selectedIngredients.value)
  const hasNot = allKeys.filter((key) => !selectedIngredients.value.has(key))

  return {
    has,
    hasNot,
  }
}

const { generateRecipe, htmlRecipe, loading, error } = useAiRecipe()

async function handleSubmit() {
  const { has, hasNot } = getIngredientSummary()
  const allergyCategory = ingredientCategories.value.find((cat) => cat.type === 'allergy')
  const allergies = allergyCategory
    ? allergyCategory.ingredients
        .filter((item) =>
          selectedIngredients.value.has(getIngredientKey('allergy', item.name)),
        )
        .map((item) => item.name)
    : []

  await generateRecipe({
    has,
    hasNot,
    allergies,
    message: message.value,
    promptTexts: homeLocales.value.prompt,
  })
}
</script>

<template>
  <div class="home">
    <h2 v-if="homeLocales?.title" class="home__title">{{ homeLocales.title }}</h2>
    <form class="home__form" @submit.prevent="handleSubmit">
      <div v-if="hasCategories" class="home__categories">
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
              @update:model-value="
                (checked) => toggleIngredient(category.type, item.name, checked)
              "
            />
          </div>
        </article>
      </div>
      <UiFormTheTextarea
        v-if="homeLocales?.textArea"
        v-bind="homeLocales.textArea"
        v-model="message"
      />
      <UiMainButton v-if="homeLocales?.sendButton" type="submit" :disabled="loading">
        {{ homeLocales.sendButton }}
      </UiMainButton>
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
