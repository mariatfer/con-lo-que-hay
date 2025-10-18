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

  async function generateRecipe({
    has,
    hasNot,
    allergies,
    message,
    promptTexts,
  }: PromptInputs) {
    const hasMessage = message.trim().length > 0
    const hasSelection = has.length > 0 || hasNot.length > 0

    if (!hasMessage && !hasSelection) {
      htmlRecipe.value = promptTexts.validation
      error.value = true
      return
    }

    loading.value = true
    htmlRecipe.value = promptTexts.loading

    const prompt = `${promptTexts.has} ${has.join(', ')}.\n${promptTexts.hasNot} ${hasNot.join(', ')}.\n${
      allergies.length ? promptTexts.allergies : ''
    } ${allergies.join(', ')}.\n${hasMessage ? promptTexts.message : ''} ${message}`

    try {
      const response = await window.puter.ai.chat(prompt)
      recipe.value = response.message.content
      htmlRecipe.value = await parseMarkdown(recipe.value)
    } catch (e) {
      htmlRecipe.value = promptTexts.error
      error.value = true
      console.error(e)
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
