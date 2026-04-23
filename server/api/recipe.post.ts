function clean(list: string[]) {
  return list.map((item) => {
    const parts = item.split(':')
    return parts.length > 1 ? parts[1] : parts[0]
  })
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const cleanHas = clean(body.has)
  const cleanHasNot = clean(body.hasNot)
  const cleanAllergies = clean(body.allergies)

  const prompt = `
${body.promptTexts.has} ${cleanHas.join(', ')}.
${body.promptTexts.hasNot} ${cleanHasNot.join(', ')}.
${cleanAllergies.length ? `${body.promptTexts.allergies} ${cleanAllergies.join(', ')}.` : ''}
${body.message.trim().length ? body.promptTexts.message : ''} ${body.message}
`.trim()

  const MODELS = [
    'google/gemma-4-31b-it:free',
    'google/gemma-4-26b-a4b-it:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'meta-llama/llama-3.2-3b-instruct:free',
    'tencent/hy3-preview:free',
    'nvidia/nemotron-3-super-120b-a12b:free',
    'openai/gpt-oss-120b:free',
    'openai/gpt-oss-20b:free',
    'google/gemma-3n-e2b-it:free',
    'google/gemma-3n-e4b-it:free',
    'google/gemma-3-4b-it:free',
    'google/gemma-3-12b-it:free',
    'google/gemma-3-27b-it:free',
    'nousresearch/hermes-3-llama-3.1-405b:free',
  ]

  async function callWithFallback(prompt: string, apiKey: string): Promise<string> {
    for (const model of MODELS) {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Con lo que hay',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      const result = await response.json()

      if (response.ok && result.choices?.[0]?.message?.content) {
        console.log('Model used:', model)
        return result.choices[0].message.content
      }

      console.warn(`Model ${model} failed (${response.status}):`, result.error?.message)
    }

    throw createError({ statusCode: 503, message: 'All models unavailable' })
  }

  const content = await callWithFallback(prompt, config.openrouterKey)

  return { content }
})
