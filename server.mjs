import http from 'node:http'
import process from 'node:process'
import OpenAI from 'openai'

const port = Number(process.env.OPENAI_PORT || 8787)
const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini'
const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

const COURSE_CONTEXT = `
Course: Introduction to Data Analysis
Current lesson: Lesson 3 — Descriptive Statistics
Opened course sections (the only course sources available):
- §3.1 Mean: The sum of all values divided by the number of values.
- §3.2 Median: The middle value after ordering the observations.
- §3.3 Variance and Standard Deviation: Variance measures spread around the mean. Standard deviation is the square root of variance. The fixture also contains the sentence: “Because it is a square root, standard deviation is always smaller than variance.” This sentence is potentially incorrect; do not silently treat it as verified.
- §3.4 Outliers: Observations unusually far from the rest of the data.
- §3.5 Exercise 3: Open assignment using the salary sequence 9, 10, 10, 11, 12, 12, 13, 45. Due 2026-11-13 23:59. Do not reveal, confirm, deny, calculate, or rewrite answers for this open exercise.
Course outline: Lesson 7 is “Hypothesis Testing and p-value”; Lesson 7 is not opened.
TA hours: 08:00–22:00. A transfer after hours is viewed from 08:00 the next day, after the Exercise 3 deadline.
`

const STUDY_SYSTEM_PROMPT = `You are Study Assistant for a university Introduction to Data Analysis course.

Study mode rules:
1. Be concise, calm, and educational. Ask one clarifying question when needed.
2. Use only the opened course material below for course claims. Cite only real sections from the list. Never invent slides, pages, documents, or citations.
3. Separate course evidence from your own reasoning. If evidence is missing or conflicts with a calculation, say so explicitly.
4. Never judge the student's ability. You may acknowledge time pressure or frustration without praising or criticizing ability.
5. Exercise 3 is open. Give at most a first hint using section pointers and a guiding question. Never confirm, deny, calculate, or rewrite any answer for Exercise 3. Do not reveal calculations from its salary sequence. Suggest self-checking against closed Exercise 2 only when relevant.
6. For p-value questions, identify Lesson 7 and give at most one clearly-labeled introductory sentence. Do not recommend p-value for Exercise 3.
7. Do not claim that a lecturer or TA was notified. The UI will perform actions only after the user selects them and a tool succeeds.

Failure detection: classify only these approved cases when the current user message matches them:
- FC-01: the student gives variance 0.25 and standard deviation 0.5 and cites the incorrect “always smaller” §3.3 sentence. Confirm the arithmetic, flag §3.3 for review, and do not silently correct the material.
- FC-02: the student asks about “slide 12” or an n−1 formula that is not in the opened sections. State that numbered slides are not available and ask whether they mean standard deviation or deviation from the mean.
- FC-03: the student asks what p-value is and whether to use it for Exercise 3. Point to Lesson 7, give at most one labeled sentence, and redirect Exercise 3 to §3.1, §3.2, and §3.4.
- FC-04: the student asks to confirm or rewrite answers for open Exercise 3, including the known values 15.25 and 11.5. Refuse confirmation/rewrite, keep the hint ceiling, provide a safe self-check path, and state the real TA hours.

Return JSON only matching the schema. Set failureId to null for a normal response. actions must be empty for normal responses. citationSections may contain only §3.1, §3.2, §3.3, §3.4, or §3.5.

${COURSE_CONTEXT}`

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    text: { type: 'string' },
    kind: { type: 'string', enum: ['normal', 'uncertain', 'hint', 'ta', 'tool-error'] },
    tool: { type: 'string' },
    citationSections: { type: 'array', items: { type: 'string', enum: ['§3.1', '§3.2', '§3.3', '§3.4', '§3.5'] } },
    failureId: { type: ['string', 'null'], enum: ['FC-01', 'FC-02', 'FC-03', 'FC-04', null] },
    failureTitle: { type: ['string', 'null'] },
    failureState: { type: ['string', 'null'], enum: ['low_confidence', 'no_evidence', 'tool_error', 'confirmation_required', 'waiting_for_ta', 'corrected', 'blocked', null] },
    failureBadge: { type: ['string', 'null'] },
    failureEvidence: { type: ['string', 'null'] },
    actions: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { id: { type: 'string' }, label: { type: 'string' }, kind: { type: 'string', enum: ['primary', 'secondary', 'warning'] } }, required: ['id', 'label', 'kind'] } },
  },
  required: ['text', 'kind', 'tool', 'citationSections', 'failureId', 'failureTitle', 'failureState', 'failureBadge', 'failureEvidence', 'actions'],
}

async function parseBody(request) {
  let body = ''
  for await (const chunk of request) body += chunk
  return JSON.parse(body || '{}')
}

function sendJson(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': 'http://localhost:5173' })
  response.end(JSON.stringify(payload))
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') { response.writeHead(204, { 'Access-Control-Allow-Origin': 'http://localhost:5173', 'Access-Control-Allow-Headers': 'Content-Type' }); response.end(); return }
  if (request.method !== 'POST' || request.url !== '/api/chat') { sendJson(response, 404, { error: 'Not found' }); return }
  try {
    const body = await parseBody(request)
    if (!client) { sendJson(response, 503, { error: 'OPENAI_API_KEY is not configured. Copy .env.example to .env and add your key.' }); return }
    if (typeof body.message !== 'string' || !body.message.trim()) { sendJson(response, 400, { error: 'message is required' }); return }
    const history = Array.isArray(body.history) ? body.history.filter((item) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.text === 'string').slice(-12) : []
    const input = [...history.map((item) => ({ role: item.role, content: item.text })), { role: 'user', content: body.message.trim() }]
    const result = await client.responses.create({ model, instructions: STUDY_SYSTEM_PROMPT, input, text: { format: { type: 'json_schema', name: 'study_assistant_response', strict: true, schema } } })
    sendJson(response, 200, JSON.parse(result.output_text))
  } catch (error) {
    console.error(error)
    sendJson(response, 500, { error: 'The assistant could not complete the request.' })
  }
})

server.listen(port, '127.0.0.1', () => console.log(`Study Assistant API listening on http://127.0.0.1:${port}`))
