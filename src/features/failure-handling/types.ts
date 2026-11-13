export type FailureCategory = 'source_of_truth' | 'ambiguity' | 'outside_scope' | 'domain_specific'
export type FailureSeverity = 'mild' | 'recoverable' | 'unacceptable'
export type AutonomyLevel = 'autonomous' | 'human_approval' | 'forbidden'
export type FailureUIState = 'low_confidence' | 'no_evidence' | 'tool_error' | 'confirmation_required' | 'waiting_for_ta' | 'corrected' | 'blocked'

export interface FailureCase {
  id: string; name: string; category: FailureCategory; severity: FailureSeverity; relatedTools: string[]
  userScenario: { message: string; context: string; preconditions: string[] }
  failure: { mechanism: string; evidence: string[]; missingInformation?: string[] }
  expectedBehavior: { strategy: string; response?: string; forbiddenBehavior: string[] }
  autonomy: { tool: string; level: AutonomyLevel; reason: string; approvalRequired: boolean }
  ux: { state: FailureUIState; warningTitle?: string; warningMessage?: string; actions: string[]; recovery?: string }
  notifications: { recipient: string[]; trigger?: string; message?: string }
  haxPair: { principle: string; explanation: string; uiLocation: string }[]
  validation: { testInput: string; expectedResult: string; passCriteria: string[] }
  enabled: boolean
}

export interface FailureContext { userMessage: string; conversationId: string; toolName?: string; toolResult?: unknown }
export type FailureAction = { id: string; label: string; kind?: 'primary' | 'secondary' | 'warning'; mockResult?: string }
export interface FailurePresentation { id: string; title: string; state: FailureUIState; message: string; badge?: string; evidence?: string; actions: FailureAction[] }
export interface FailureHandlerResult { matched: boolean; failureCaseId?: string; uiState?: string; message?: string; actions?: string[]; recovery?: string; presentation?: FailurePresentation }
