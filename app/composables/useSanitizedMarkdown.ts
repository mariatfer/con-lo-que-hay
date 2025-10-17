import { marked } from 'marked'
import DOMPurify from 'dompurify'

export function useSanitizedMarkdown() {
  const parseMarkdown = async (markdown: string): Promise<string> => {
    const rawHtml = await marked.parse(markdown || '')
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ['title'],
    })
    return cleanHtml
  }

  return { parseMarkdown }
}
