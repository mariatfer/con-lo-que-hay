export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const prompt = `
${body.promptTexts.has} ${body.has.join(', ')}.
${body.promptTexts.hasNot} ${body.hasNot.join(', ')}.
${body.allergies.length ? body.promptTexts.allergies : ''} ${body.allergies.join(', ')}.
${body.message.trim().length ? body.promptTexts.message : ''} ${body.message}
  `.trim()
  console.log('Prompt sent to API:', prompt)
  const MODELS = ['google/gemma-4-31b-it:free']

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
