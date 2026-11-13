import type { AssistantResponse, StudyAssistantAdapter, ToolResult } from './assistant-adapter'

// Replace these methods with authenticated API calls when the course platform is available.
// Keeping this adapter separate means the UI remains unchanged.
export class ApiStudyAssistantAdapter implements StudyAssistantAdapter {
  async sendMessage(_message: string): Promise<AssistantResponse> { throw new Error('API adapter is not configured') }
  async searchCourseMaterial(_query: string): Promise<ToolResult> { throw new Error('API adapter is not configured') }
  async requestExerciseHint(_exerciseId: string): Promise<ToolResult> { throw new Error('API adapter is not configured') }
  async transferToTA(_message: string): Promise<ToolResult> { throw new Error('API adapter is not configured') }
  async publishFAQ(_question: string, _answer: string): Promise<ToolResult> { throw new Error('API adapter is not configured') }
}
