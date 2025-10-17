export interface BaseField {
  id: number | string
  name: string
  label: string
  ariaLabel: string
  type?: string
  placeholder?: string
  autoComplete?: string
  disabled?: boolean
  required?: boolean
}

export interface Category {
  id: number
  title: string
  ingredients: BaseField[]
}

export interface Prompt {
  has: string
  hasNot: string
  message: string
}

export interface Home {
  title: string
  textArea: BaseField
  checkBox: Category[]
  prompt: Prompt
  sendButton: string
}
