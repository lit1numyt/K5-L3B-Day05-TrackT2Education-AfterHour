import type { Citation } from './course-fixtures'
import type { FailurePresentation } from '../features/failure-handling/types'

export type Message = {
  id: string
  role: 'user' | 'assistant'
  text: string
  citations?: Citation[]
  kind?: 'normal' | 'uncertain' | 'hint' | 'ta' | 'tool-error'
  failure?: FailurePresentation
  time?: string
}

export type Conversation = { id: string; title: string; preview: string; messages: Message[] }

export const mockConversations: Conversation[] = [
  {
    id: 'mean-median', title: 'Mean vs. median', preview: 'When should I use the median?', messages: [
      { id: 'm1', role: 'user', text: 'When should I use the median instead of the mean?', time: '9:41 PM' },
      { id: 'm2', role: 'assistant', text: 'Use the median when you want the middle value after ordering the observations, especially when unusually large or small values could pull the mean away from the typical value. The mean uses every value in the calculation, while the median depends on the ordered middle position.', citations: [], time: '9:41 PM' },
    ],
  },
  {
    id: 'standard-deviation', title: 'Standard deviation', preview: 'Can you explain the spread?', messages: [
      { id: 's1', role: 'user', text: 'Can you explain standard deviation in simple terms?', time: 'Yesterday' },
      { id: 's2', role: 'assistant', text: 'Standard deviation describes how far observations tend to be from their mean. A smaller standard deviation means the values are clustered more closely; a larger one means they are more spread out.', citations: [], time: 'Yesterday' },
    ],
  },
  {
    id: 'homework-3', title: 'Homework 3', preview: 'I need a hint for Exercise 3', messages: [
      { id: 'h1', role: 'user', text: 'I need a hint for Exercise 3, but please do not give me the answer.', time: 'Mon' },
      { id: 'h2', role: 'assistant', kind: 'hint', text: 'Start by ordering the values from smallest to largest. Then ask: is the question asking for a typical center, or is it asking you to describe spread? That distinction will point you toward the right measure.', citations: [], time: 'Mon' },
    ],
  },
]
