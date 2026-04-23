import { useSanitizedMarkdown } from '@/composables/useSanitizedMarkdown'

interface PromptInputs {
  has: string[]
  hasNot: string[]
  allergies: string[]
  message: string
  promptTexts: {
    has: string
    hasNot: string
    allergies: string
    message: string
    loading: string
    error: string
    validation: string
  }
}

export function useAiRecipe() {
  const recipe = ref('')
  const htmlRecipe = ref('')
  const loading = ref(false)
  const error = ref(false)

  const { parseMarkdown } = useSanitizedMarkdown()

  async function generateRecipe(payload: PromptInputs) {
    const { has, hasNot, message, promptTexts } = payload
    const hasMessage = message.trim().length > 0
    const hasSelection = has.length > 0 || hasNot.length > 0

    if (!hasMessage && !hasSelection) {
      htmlRecipe.value = promptTexts.validation
      error.value = true
      return
    }

    loading.value = true
    error.value = false
    recipe.value = ''
    htmlRecipe.value = promptTexts.loading

    try {
      const response = await $fetch<{ content: string }>('/api/recipe', {
        method: 'POST',
        body: payload,
      })

      recipe.value = response.content
      htmlRecipe.value = await parseMarkdown(recipe.value)
    } catch (e) {
      console.error(e)
      htmlRecipe.value = promptTexts.error
      error.value = true
    } finally {
      loading.value = false
    }
  }

  return {
    generateRecipe,
    recipe,
    htmlRecipe,
    loading,
    error,
  }
}
