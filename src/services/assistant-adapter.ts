import type { Citation } from '../data/course-fixtures'
import type { FailurePresentation } from '../features/failure-handling/types'

export type ToolResult = { ok: boolean; message: string; citations?: Citation[]; status?: string }
export type AssistantResponse = { text: string; citations: Citation[]; kind?: 'normal' | 'uncertain' | 'hint' | 'ta' | 'tool-error'; tool?: string; failure?: FailurePresentation }
export type ChatHistoryItem = { role: 'user' | 'assistant'; text: string }

export interface StudyAssistantAdapter {
  sendMessage(message: string, history?: ChatHistoryItem[]): Promise<AssistantResponse>
  searchCourseMaterial(query: string): Promise<ToolResult>
  requestExerciseHint(exerciseId: string): Promise<ToolResult>
  transferToTA(message: string): Promise<ToolResult>
  publishFAQ(question: string, answer: string): Promise<ToolResult>
}
