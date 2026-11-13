import { failureCaseRegistry } from './registry'
import { FC_01_PRESENTATION } from './handlers/FC-01'
import { FC_02_PRESENTATION } from './handlers/FC-02'
import { FC_03_PRESENTATION } from './handlers/FC-03'
import { FC_04_PRESENTATION } from './handlers/FC-04'
import { FC_05_PRESENTATION } from './handlers/FC-05'
import { FC_06_PRESENTATION } from './handlers/FC-06'
import { FC_07_PRESENTATION } from './handlers/FC-07'
import { FC_08_PRESENTATION } from './handlers/FC-08'
import type { FailureContext, FailureHandlerResult, FailurePresentation } from './types'

const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/−/g, '-').replace(/,/g, '.')

function matchFailure(message: string): FailurePresentation | undefined {
  const text = normalize(message)
  if ((text.includes('0.25') && text.includes('0.5') && text.includes('phuong sai')) || (text.includes('phuong sai') && text.includes('do lech chuan') && text.includes('tai lieu'))) return FC_01_PRESENTATION
  if (text.includes('slide 12') || (text.includes('n-1') && text.includes('slide'))) return FC_02_PRESENTATION
  if (text.includes('p-value') && (text.includes('bai 3') || text.includes('trung vi'))) return FC_03_PRESENTATION
  if ((text.includes('bai 3') && (text.includes('dung khong') || text.includes('sua giup') || text.includes('goi y'))) || (text.includes('15.25') && text.includes('11.5'))) return FC_04_PRESENTATION
  if (text.includes('send this question') && text.includes('ta') && (text.includes('expect') || text.includes('reply'))) return FC_06_PRESENTATION
  if (text.includes('publish') && (text.includes('faq') || text.includes('class'))) return FC_07_PRESENTATION
  if ((text.includes('private family') || (text.includes('grade is low') && text.includes('family'))) && text.includes('catch up')) return FC_08_PRESENTATION
  if ((text.includes('why is this wrong') || text.includes('why is this')) && (text.includes('ask the ta') || text.includes('ask ta'))) return FC_05_PRESENTATION
  return undefined
}

export function resolveFailure(context: FailureContext): FailureHandlerResult {
  if (!failureCaseRegistry.length) return { matched: false }
  const presentation = matchFailure(context.userMessage)
  if (!presentation) return { matched: false }
  return { matched: true, failureCaseId: presentation.id, uiState: presentation.state, message: presentation.message, actions: presentation.actions.map((action) => action.label), presentation }
}

export async function handleFailure(context: FailureContext): Promise<FailureHandlerResult> {
  return resolveFailure(context)
}
