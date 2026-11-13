import { useMemo, useRef, useState } from 'react'
import type { Conversation, Message } from '../data/mock-conversations'
import { mockConversations } from '../data/mock-conversations'
import { course, type Citation } from '../data/course-fixtures'
import { MockStudyAssistantAdapter } from '../services/mock-adapter'

const adapter = new MockStudyAssistantAdapter()
const Icon = ({ name, size = 18 }: { name: string; size?: number }) => {
  const paths: Record<string, string> = { plus: 'M12 5v14M5 12h14', menu: 'M4 6h16M4 12h16M4 18h16', send: 'M22 2 11 13M22 2l-7 20-4-9-9-4Z', copy: 'M9 9h10v10H9zM5 5h10v4', check: 'M5 12l4 4L19 6', alert: 'M12 9v4M12 17h.01M10.3 4.5 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.5a2 2 0 0 0-3.4 0Z', book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22zM4 5.5V22', search: 'm21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z', x: 'M6 6l12 12M18 6 6 18', chev: 'm6 9 6 6 6-6' }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.plus} /></svg>
}

function CitationCard({ citation }: { citation: Citation }) { return <button className="citation" onClick={() => alert(`${citation.section} — ${citation.title}\n\n${citation.detail}`)}><span className="citation-icon"><Icon name="book" size={15} /></span><span><b>{citation.section} · {citation.title}</b><small>Lesson 3 · View source</small></span><Icon name="chev" size={15} /></button> }

function MessageBubble({ message, onCopy, onFailureAction }: { message: Message; onCopy: (text: string) => void; onFailureAction: (id: string) => void }) {
  const isUser = message.role === 'user'
  return <div className={`message-row ${isUser ? 'user-row' : ''}`}><div className={`avatar ${isUser ? 'user-avatar' : 'assistant-avatar'}`}>{isUser ? 'Y' : <span className="spark">✦</span>}</div><div className="message-content"><div className="message-meta"><strong>{isUser ? 'You' : 'Study Assistant'}</strong><span>{message.time}</span></div><div className={`bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}><p>{message.text}</p>{message.failure && <div className={`failure-panel failure-${message.failure.state}`}><div className="failure-heading"><Icon name="alert" size={15} /><strong>{message.failure.title}</strong></div>{message.failure.badge && <div className="failure-badge">{message.failure.badge}</div>}{message.failure.evidence && <div className="failure-evidence">{message.failure.evidence}</div>}<div className="failure-actions">{message.failure.actions.map((action) => <button key={action.id} className={`failure-action ${action.kind || 'secondary'}`} onClick={() => onFailureAction(action.id)}>{action.label}</button>)}</div></div>}{message.kind === 'hint' && <div className="integrity-note"><span><Icon name="check" size={14} /></span> Hint mode · answer protection on</div>}{message.citations && message.citations.length > 0 && <div className="sources"><div className="sources-label">Sources <span>Evidence from opened course materials</span></div>{message.citations.map((citation) => <CitationCard key={citation.section} citation={citation} />)}</div>}</div>{!isUser && <div className="message-actions"><button onClick={() => onCopy(message.text)}><Icon name="copy" size={14} /> Copy</button><button>Helpful</button><button>Not quite</button></div>}</div></div>
}

export default function App() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [activeId, setActiveId] = useState('mean-median')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [composer, setComposer] = useState('')
  const [loading, setLoading] = useState(false)
  const [toolStatus, setToolStatus] = useState('')
  const [notice, setNotice] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const active = useMemo(() => conversations.find((item) => item.id === activeId) || conversations[0], [conversations, activeId])

  const send = async () => {
    const text = composer.trim()
    if (!text || loading) return
    const user: Message = { id: crypto.randomUUID(), role: 'user', text, time: 'Now' }
    setComposer(''); setLoading(true); setToolStatus(text.toLowerCase().includes('hint') ? 'Preparing a step-by-step hint...' : 'Searching course materials...')
    setConversations((items) => items.map((item) => item.id === active.id ? { ...item, messages: [...item.messages, user] } : item))
    const response = await adapter.sendMessage(text)
    const assistant: Message = { id: crypto.randomUUID(), role: 'assistant', text: response.text, citations: response.citations, kind: response.kind, failure: response.failure, time: 'Now' }
    setConversations((items) => items.map((item) => item.id === active.id ? { ...item, preview: text, messages: [...item.messages, assistant] } : item))
    setLoading(false); setToolStatus('')
  }
  const newChat = () => { const id = crypto.randomUUID(); setConversations((items) => [{ id, title: 'New conversation', preview: 'Start a new study session', messages: [] }, ...items]); setActiveId(id); setComposer('') }
  const copy = (text: string) => { navigator.clipboard?.writeText(text); setNotice('Copied to clipboard'); window.setTimeout(() => setNotice(''), 1800) }
  const addActionResult = (text: string, kind: Message['kind'] = 'normal') => {
    const assistant: Message = { id: crypto.randomUUID(), role: 'assistant', text, kind, time: 'Now' }
    setConversations((items) => items.map((item) => item.id === active.id ? { ...item, messages: [...item.messages, assistant] } : item))
  }
  const handleFailureAction = async (actionId: string) => {
    const failureMessage = [...active.messages].reverse().find((message) => message.failure?.actions.some((action) => action.id === actionId))
    const action = failureMessage?.failure?.actions.find((item) => item.id === actionId)
    if (actionId === 'transfer-ta' || actionId === 'ask-ta-n') {
      if (!window.confirm('TA trực 08:00–22:00. Câu hỏi sẽ được xem sớm nhất từ 08:00 ngày 14/11, sau hạn nộp. Vẫn chuyển?')) return
      setToolStatus('Preparing a request for your TA...');
      const result = await adapter.transferToTA(active.messages[active.messages.length - 1]?.text || '')
      setToolStatus('');
      addActionResult(action?.mockResult ? `${action.mockResult}\n\nTool result: ${result.message}` : result.message, result.ok ? 'ta' : 'tool-error')
      setNotice(result.ok ? 'Mock TA request submitted' : 'TA request was not submitted'); window.setTimeout(() => setNotice(''), 2600)
      return
    }
    if (actionId === 'retry-transfer') {
      if (!window.confirm('The earlier transfer is still unconfirmed. Retry anyway?')) return
      setToolStatus('Retrying TA transfer in mock mode...')
      const result = await adapter.transferToTA(active.messages[active.messages.length - 1]?.text || '')
      setToolStatus('')
      addActionResult(action?.mockResult ? `${action.mockResult}\n\nTool result: ${result.message}` : result.message, result.ok ? 'ta' : 'tool-error')
      return
    }
    if (actionId === 'copy-question') {
      const question = [...active.messages].reverse().find((message) => message.role === 'user')?.text || ''
      copy(question); addActionResult(action?.mockResult || 'Mock result: the question was copied.')
      return
    }
    if (action?.mockResult) { addActionResult(action.mockResult, action.kind === 'warning' ? 'uncertain' : 'normal'); setNotice('Mock outcome shown in chat'); window.setTimeout(() => setNotice(''), 1800); return }
    setNotice('Action available in the course materials'); window.setTimeout(() => setNotice(''), 1800)
  }
  const handleKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void send() } }

  return <div className="app-shell"><aside className={`sidebar ${sidebarOpen ? '' : 'closed'}`}><div className="brand"><div className="brand-mark"><span>✦</span></div><div><strong>Study Assistant</strong><small>Course companion</small></div><button className="icon-button mobile-only" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><Icon name="x" /></button></div><button className="new-chat" onClick={newChat}><Icon name="plus" size={17} /> New chat <span>⌘ K</span></button><div className="sidebar-label">Recent conversations</div><nav className="history">{conversations.slice(0, 5).map((item) => <button key={item.id} className={`history-item ${item.id === active.id ? 'selected' : ''}`} onClick={() => setActiveId(item.id)}><span className="history-icon">{item.id === active.id ? '✦' : '○'}</span><span><b>{item.title}</b><small>{item.preview}</small></span></button>)}</nav><div className="sidebar-bottom"><div className="sidebar-label">Your course</div><div className="course-card"><div className="course-icon"><Icon name="book" size={17} /></div><div><strong>{course.name}</strong><span>{course.lesson} · {course.lessonTitle}</span></div><Icon name="chev" size={16} /></div><div className="sidebar-footer"><button>Help & feedback</button><button>Settings</button><div className="profile"><span>TN</span><div><b>Student</b><small>Study mode</small></div><span className="dot"></span></div></div></div></aside><main className="main"><header className="topbar"><button className="icon-button" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle navigation"><Icon name="menu" /></button><div className="topbar-title"><span className="mobile-title">Study Assistant</span><span className="desktop-title">{course.lesson} <i>·</i> {course.lessonTitle}</span></div><div className="topbar-right"><span className="live-dot"></span><span className="topbar-status">Mock study mode</span><button className="icon-button">•••</button></div></header><section className="chat"><div className="chat-inner">{active.messages.length === 0 ? <div className="empty-state"><div className="empty-mark">✦</div><h1>What are you studying?</h1><p>Ask a question about <b>{course.lessonTitle}</b> and I’ll explain it using the opened course materials.</p><div className="prompt-grid"><button onClick={() => setComposer('When should I use the median instead of the mean?')}>When should I use the median?</button><button onClick={() => setComposer('I need a hint for Exercise 3')}>Give me a hint for Exercise 3</button><button onClick={() => setComposer('Can you explain standard deviation?')}>Explain standard deviation</button></div></div> : <>{active.messages.map((message) => <MessageBubble key={message.id} message={message} onCopy={copy} onFailureAction={handleFailureAction} />)}{loading && <div className="loading-row"><div className="avatar assistant-avatar"><span className="spark">✦</span></div><div><div className="message-meta"><strong>Study Assistant</strong></div><div className="typing"><span></span><span></span><span></span><em>{toolStatus}</em></div></div></div>}</>} </div></section><div className="composer-wrap"><div className="composer"><textarea ref={textareaRef} value={composer} onChange={(event) => setComposer(event.target.value)} onKeyDown={handleKey} placeholder="Ask anything about Lesson 3..." rows={1} aria-label="Message Study Assistant" /><div className="composer-footer"><span><Icon name="book" size={14} /> Answers use opened course materials</span><button className="send-button" onClick={() => void send()} disabled={!composer.trim() || loading} aria-label="Send message"><Icon name="send" size={16} /></button></div></div><p className="disclaimer">Study Assistant can make mistakes. Check important information against your course materials.</p></div></main>{notice && <div className="toast"><Icon name="check" size={15} /> {notice}</div>}</div>
}
