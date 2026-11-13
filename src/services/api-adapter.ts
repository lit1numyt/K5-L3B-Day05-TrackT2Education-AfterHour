import { sections } from '../data/course-fixtures'
import type { AssistantResponse, ChatHistoryItem, StudyAssistantAdapter, ToolResult } from './assistant-adapter'
import type { FailureUIState } from '../features/failure-handling/types'

type ApiResponse = {
  text: string
  kind: NonNullable<AssistantResponse['kind']>
  tool: string
  citationSections: string[]
  failureId: string | null
  failureTitle: string | null
  failureState: FailureUIState | null
  failureBadge: string | null
  failureEvidence: string | null
  actions: { id: string; label: string; kind: 'primary' | 'secondary' | 'warning' }[]
}

export class ApiStudyAssistantAdapter implements StudyAssistantAdapter {
  async sendMessage(message: string, history: ChatHistoryItem[] = []): Promise<AssistantResponse> {
    const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, history }) })
    const data = await response.json() as ApiResponse & { error?: string }
    if (!response.ok || 'error' in data) throw new Error(('error' in data && data.error) || 'The assistant could not complete the request.')
    const citations = data.citationSections.map((section) => sections.find((item) => item.section === section)).filter((item): item is (typeof sections)[number] => Boolean(item))
    const failure = data.failureId ? { id: data.failureId, title: data.failureTitle || 'Study mode notice', state: data.failureState || 'no_evidence', message: data.text, badge: data.failureBadge || undefined, evidence: data.failureEvidence || undefined, actions: data.actions } : undefined
    return { text: data.text, citations, kind: data.kind, tool: data.tool || undefined, failure }
  }
  async searchCourseMaterial(_query: string): Promise<ToolResult> { throw new Error('API course search is not configured') }
  async requestExerciseHint(_exerciseId: string): Promise<ToolResult> { throw new Error('API exercise hint tool is not configured') }
  async transferToTA(_message: string): Promise<ToolResult> { throw new Error('API TA transfer tool is not configured') }
  async publishFAQ(_question: string, _answer: string): Promise<ToolResult> { throw new Error('API FAQ tool is not configured') }
}
