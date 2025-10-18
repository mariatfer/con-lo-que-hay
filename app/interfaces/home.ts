import type { IngredientCategoryType } from '@/types/home'

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
  title: IngredientCategoryType
  type?: string
  ingredients: BaseField[]
}

export interface Prompt {
  has: string
  hasNot: string
  message: string
  allergies: string
  loading: string
  error: string
  validation: string
}

export interface Home {
  title: string
  textArea: BaseField
  checkBox: Category[]
  prompt: Prompt
  sendButton: string
}
