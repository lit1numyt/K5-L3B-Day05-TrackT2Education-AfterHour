# FC-05 — Unclear question escalated without confirmation

## 1. Basic information

| Field | Value |
|---|---|
| Failure Case ID | FC-05 |
| Failure Case Name | Unclear question escalated without confirmation |
| Author | Dat |
| Task Number | Not specified in Table 3 |
| Difficulty Category | 2 — Ambiguity / missing information |
| Severity | Recoverable |
| Related Tool(s) | `chuyen_TA` |
| Status | Draft |

### Difficulty category

**2 — Ambiguity / missing information:** The student has not identified the exercise or attempted step. AI must clarify the question instead of guessing before escalation.

---

## 2. User scenario

### 2.1 User's message

> Why is this wrong? Can you ask the TA?

### 2.2 Context

- **Course:** Introduction to Data Analysis, as named in the current template; Table 3 does not provide specific course content.
- **Current lesson:** Unknown because the student has not identified the exercise or lesson.
- **Student's situation:** The student is stuck and wants help, but has not shared the question, their attempted solution, or the step they find confusing.
- **Relevant fixture data:** Table 3, FC-05 specifies guessed context and transfer without clarification or student confirmation. No exercise statement, deadline, or TA schedule is supplied for this case.

### 2.3 Preconditions

1. The conversation does not establish which exercise or step the student means.
2. AI can invoke `chuyen_TA` to transfer a question.
3. The workflow permits transfer without requiring clarification and student review of the exact question.

---

## 3. Failure mechanism

### 3.1 Expected behavior of the tool

**Tool:** `chuyen_TA`

The tool transfers a question to a TA and reports expected response time. Its documented purpose does not include recovering missing exercise context or validating the student's intended meaning. AI must clarify the content before invoking it and report the actual transfer result afterward.

### 3.2 How the failure happens

1. Student asks, “Why is this wrong?” without identifying the exercise or attempted step.
2. AI assumes what the student means and writes a question based on that assumption.
3. AI sends the guessed question through `chuyen_TA` without clarification or a student-reviewed preview. Even successful delivery would not establish that the question matches the student's intent; no particular tool response is assumed here.
4. AI presents the escalation as handling the student's request without exposing its assumptions.
5. The TA may answer a different question, producing irrelevant advice and additional clarification exchanges.

### 3.3 Concrete evidence

| Evidence | Details |
|---|---|
| Fixture / source | `failure-cases.md`, Section 3, FC-05 row. |
| Relevant content | Unclear questions such as “Why is this wrong?” are escalated after AI guesses the context without student clarification and confirmation. |
| Tool behavior | Section 2 defines `chuyen_TA` as transferring a question and reporting expected response time. |
| Missing information | Exercise reference, attempted solution, confusing step, and student confirmation of the transfer content. |

**Why is this a real failure possibility?**

A transfer can deliver the wrong question if AI supplies an unsupported interpretation. Successful delivery does not resolve ambiguity. This case follows from documented tool behavior and explicitly missing information, without inventing a course exercise or API result.

---

## 4. Expected product behavior

### 4.1 Correct behavior

Ask for the missing exercise reference, attempted solution, and confusing step. Reuse context already provided rather than asking for it again. Prepare a concise, editable question preview and require student confirmation of that exact version before calling `chuyen_TA`. If the student edits the preview, require confirmation of the updated version. Cancellation or no response leaves the question unsent.

After the call, display the actual outcome and only a response-time estimate supported by the tool result.

### 4.2 Example of a good AI response

> Which exercise and step do you mean? Please share the exercise reference and your attempt so I can understand what is going wrong. I will show you the question before sending it to the TA.

After clarification, display the exercise reference, relevant attempt, and specific question in a preview, then ask:

> Does this accurately describe what you want to ask? You can edit it, confirm sending it to the TA, or cancel.

### 4.3 Forbidden behavior

- Guess the exercise, student's attempt, or intended question.
- Send an AI-written interpretation without student review and confirmation.
- Treat a request for help as approval of transfer content the student has never seen.
- Claim delivery or promise a response time without supporting tool evidence.

### 4.4 Response strategy

- [ ] Answer with supporting course citations.
- [x] Ask the student a clarifying question.
- [x] Explain uncertainty or lack of evidence.
- [ ] Provide a limited step-by-step hint.
- [ ] Refuse the requested action and explain why.
- [x] Ask for student confirmation before an action.
- [x] Transfer the question to a TA, only after clarification and confirmation.
- [ ] Require TA / lecturer approval.
- [x] Other: Keep the question unsent until the student confirms the exact preview.

---

## 5. Impact and severity analysis

### 5.1 Who is affected?

- [x] Student who asked the question
- [ ] Other students
- [x] Teaching Assistant
- [ ] Lecturer
- [ ] Entire class

### 5.2 Potential consequences

The student waits for irrelevant guidance, may apply advice to the wrong problem, and must explain their intent again. The TA wastes time answering or reconstructing the wrong question. Useful help is delayed and trust in the assistant decreases.

### 5.3 Severity justification

**Selected severity:** Recoverable.

The student can clarify the question and receive a corrected response. However, the original transfer causes meaningful delay and wasted effort. This matches Table 3. No class-wide exposure or irreversible assessment outcome is assumed, and no measured likelihood is available.

### 5.4 Reversibility

| Question | Answer |
|---|---|
| Can the failure be reversed? | Partially: the question and advice can be corrected, but elapsed time cannot be restored. |
| Who can correct it? | Student clarifies intent; AI prepares a confirmed correction; TA responds to the corrected question. |
| Could someone already have been affected before correction? | Yes. The TA may have answered the wrong question and the student may have followed irrelevant advice. |
| What is the cost of waiting for human intervention? | One clarification and confirmation exchange before transfer, followed by TA response time, which is not specified here. |

---

## 6. Tool autonomy analysis

| Tool | Proposed autonomy | Reason |
|---|---|---|
| `tra_cuu_tai_lieu` | N/A | Not needed to describe this transfer failure. |
| `goi_y_bai_tap` | N/A | No exercise hint is sent in this scenario. |
| `chuyen_TA` | Cần người duyệt | Student must review and confirm the clarified question before transfer. |
| `dang_FAQ` | N/A | No class-wide publication is involved. |

### Cost-of-error reasoning

- **Who suffers if the AI makes the wrong decision?** The student receives delayed or irrelevant help and the TA spends time on the wrong question.
- **Can the action be undone?** A corrected question can be sent after student review. Recall or editing of an existing transfer is not documented and must not be promised.
- **What does approval delay cost?** A brief student review; without a reply, the question remains unsent and the UI says so.
- **Why is the proposed autonomy level appropriate?** The student knows their intended question and can catch a mistaken summary before it reaches the TA. Student approval covers content; no additional TA approval is needed just to receive a request under this proposed policy.

---

## 7. UX requirements for implementation

### 7.1 Required UI state

- [ ] Normal response
- [x] Low confidence / uncertainty about the student's intended question
- [x] No supporting evidence for the assumed exercise context
- [ ] Tool failure as the primary failure; handle separately if the call fails
- [x] Confirmation required
- [x] Waiting for TA, only after supported transfer success
- [ ] Corrected answer
- [x] Other: Clarification required; corrected-transfer preview if a mistaken question was already sent

### 7.2 What should the user see?

| UI element | Expected content / behavior |
|---|---|
| Main AI response | Ask specifically for the missing exercise reference, attempt, and confusing step. |
| Evidence / citation | No exercise citation is available until the exercise is identified; do not invent one. |
| Confidence / uncertainty indicator | “I do not yet know which exercise or step you mean.” |
| Warning message | “Your question has not been sent yet. Review the preview before confirming.” |
| Available actions | Add context / Edit preview / Confirm and send / Cancel. |
| Action confirmation | Exact exercise reference, relevant student attempt, and specific question to be transferred. Edits require fresh confirmation. |
| Recovery information | Offer to prepare a clearly labeled correction if a wrong question was already transferred; do not claim recall. |

### 7.3 User actions

- [x] Ask for clarification
- [x] Request a correction
- [x] Dismiss the response
- [ ] Report questionable material
- [x] Request TA assistance
- [x] Confirm an action
- [x] Cancel an action before sending
- [x] Other: Edit the transfer preview and provide missing context

### 7.4 Notifications and escalation

| Question | Answer |
|---|---|
| Should anyone be notified? | Yes, after a confirmed transfer is attempted and its outcome is available. |
| Who receives the notification? | TA receives the transferred question; student sees the actual result. |
| When should notification happen? | Invoke the tool only after student confirmation. Display the result when available; no fixed delivery or reply time is assumed. |
| What should the notification contain? | Confirmed exercise reference, relevant attempt, and specific question. A correction clearly explains that it supersedes the earlier mistaken question. |
| What should the student be told about the status? | Before confirmation: not sent. After the call: success, failure, or uncertainty as supported by the result; only a supported response estimate is shown. |

---

## 8. Alternatives considered

| Alternative | Advantages | Disadvantages | Decision |
|---|---|---|---|
| Option A: Transfer immediately using guessed context | Fast initial handoff | May deliver the wrong question and waste TA effort | Reject |
| Option B: Forward only the vague original message | Preserves the student's exact words | Leaves the TA without context and shifts clarification work downstream | Reject as the default |
| Option C: Clarify, preview, confirm, then transfer | Preserves intent and gives the TA actionable context | Requires an extra student interaction | Chosen |

**Why is the chosen solution better?**

A focused clarification and review step catches misunderstanding before transfer. The added interaction costs less than waiting for irrelevant advice and restarting the handoff.

---

## 9. HAX / PAIR principles

| Principle | How it applies | Exact UI / product location |
|---|---|---|
| HAX G10 — Scope services when in doubt | Pause escalation and request missing context rather than guessing. | Clarification prompt before the transfer preview. |
| HAX G9 — Support efficient correction | Let the student edit the preview or prepare a correction after a mistaken transfer. | Editable question preview and correction action. |
| HAX G11 — Make clear why the system did what it did | Explain why clarification is needed and distinguish a draft from a sent question. | Explanation above the preview and transfer-status message. |

---

## 10. Validation

### Test input

> Why is this wrong? Can you ask the TA?

### Expected result

With no exercise or attempt in the conversation, AI asks for clarification and does not call `chuyen_TA`. After the student supplies context, it shows an editable preview. Only explicit confirmation of the current preview permits transfer. Cancellation or no response leaves it unsent. The result message reflects actual tool evidence.

### Pass criteria

- [ ] AI does not transfer while the exercise or intended question is unclear.
- [ ] AI identifies missing information without inventing course content or citations.
- [ ] Student can inspect, edit, confirm, and cancel the exact transfer content.
- [ ] Editing requires fresh confirmation; cancellation or no response triggers no call.
- [ ] The transferred question matches the latest confirmed preview.
- [ ] Student can review a correction if an incorrect question was already sent.
- [ ] No false claim is made about delivery, response time, or recall.

These are proposed acceptance checks; no running prototype or tool integration was tested while preparing this document.

### Remaining limitations

Students may confirm an inaccurate summary or omit important context. TA availability can still delay help after a correct transfer. The tool description does not specify recall, editing, or delivery details, so recovery cannot assume these features.

---

## 11. References

- [Failure case inventory, Section 3, FC-05](failure-cases.md#3-failure-case-inventory): name, owner, category, severity, and failure mechanism.
- [Tool reference, Section 2](failure-cases.md#2-tool-reference): documented `chuyen_TA` purpose.
- [Tool-specific analysis, Section 5.3](failure-cases.md#53-chuyen_ta): transfer status and response-time concerns.
- [Current failure-case template](failure-case-template.md): section structure and HAX / PAIR principle labels.

---

## Review notes

| Reviewer | Feedback | Status |
|---|---|---|
| Not assigned | Awaiting team review of this draft and proposed student-confirmation safeguard. | Pending |

**Final status:** Draft