export {}

declare global {
  interface Window {
    puter: {
      ai: {
        chat: (prompt: string) => Promise<{
          message: {
            content: string
          }
        }>
      }
    }
  }
}
