export const boardCategories = [
  { value: 'free', label: '자유' },
  { value: 'question', label: '질문' },
  { value: 'information', label: '정보 공유' },
  { value: 'feedback', label: '프로젝트 피드백' },
] as const

export type BoardCategory = (typeof boardCategories)[number]['value']
export const defaultBoardCategory: BoardCategory = 'information'

export function isBoardCategory(value: unknown): value is BoardCategory {
  return boardCategories.some((category) => category.value === value)
}

export function boardCategoryLabel(value: BoardCategory) {
  return boardCategories.find((category) => category.value === value)?.label ?? '정보 공유'
}
