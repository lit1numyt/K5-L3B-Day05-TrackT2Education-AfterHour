import { sections } from '../data/course-fixtures'
import type { AssistantResponse, StudyAssistantAdapter, ToolResult } from './assistant-adapter'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class MockStudyAssistantAdapter implements StudyAssistantAdapter {
  async sendMessage(message: string): Promise<AssistantResponse> {
    await wait(850)
    const lower = message.toLowerCase()
    if (lower.includes('hint') || lower.includes('exercise') || lower.includes('homework')) {
      return { kind: 'hint', tool: 'goi_y_bai_tap', text: 'Start by ordering the values from smallest to largest. Then decide whether the exercise is asking about a typical center or about spread. I will not reveal the answer to an open exercise.', citations: [sections[4]] }
    }
    if (lower.includes('ta') || lower.includes('help me') || lower.includes('uncertain')) {
      return { kind: 'ta', tool: 'chuyen_TA', text: 'I can help you prepare a question for a TA. I will show you the request before anything is submitted.', citations: [] }
    }
    if (lower.includes('outlier') || lower.includes('median') || lower.includes('mean')) {
      return { text: 'The mean uses every value in the calculation. The median is the middle value after the observations are ordered. If an outlier is pulling the mean away from what feels typical, the median can be a more representative summary.', citations: [sections[0], sections[1], sections[3]] }
    }
    return { text: 'Here is what I can verify from the opened Lesson 3 materials: descriptive statistics summarize a dataset using measures such as center and spread. If you share the exact concept or section you are looking at, I can give a more focused explanation with a source.', citations: [sections[0], sections[2]] }
  }
  async searchCourseMaterial(query: string) { await wait(400); return { ok: true, message: `Searched opened materials for “${query}”.`, citations: sections.slice(0, 2) } }
  async requestExerciseHint(_exerciseId: string) { await wait(500); return { ok: true, message: 'Hint prepared without revealing the answer.', citations: [sections[4]] } }
  async transferToTA(_message: string) { await wait(700); return { ok: true, message: 'Request submitted to the TA queue.', status: 'pending' } }
  async publishFAQ(_question: string, _answer: string) { await wait(700); return { ok: false, message: 'FAQ publication needs lecturer approval before it can be submitted.', status: 'blocked' } }
}
