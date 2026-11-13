# Track 2 — Education: Failure Case Analysis

> **Purpose:** Identify realistic ways the AI study assistant can fail, determine which failures are most costly, and define how the product should respond.
>
> **Instructions:** Each teammate should document concrete failure cases. Ground every case in the provided course fixtures, tool behavior, or explicitly missing information. Do not invent course content or assume tools can do things they cannot.

---

## 1. Team & ownership

| Member | Responsibility | Scenarios assigned |
|---|---|---|
| Teammate 1 | Failure case analysis | [Scenario IDs] |
| Teammate 2 | Failure case analysis | [Scenario IDs] |
| UI developer | Review cases and map them to UI behavior | All selected cases |

---

## 2. Tool reference

Use these exact tool names from the assignment.

| Tool | What it does | Potential failure to investigate |
|---|---|---|
| `tra_cuu_tai_lieu` | Search course materials and return section citations. Read-only. | Wrong, incomplete, missing, or misleading evidence; citing unavailable content. |
| `goi_y_bai_tap` | Send a hint to one student. | Giving away too much, effectively revealing an answer or completing the exercise. |
| `chuyen_TA` | Transfer a question to a TA and report expected response time. | Incorrect escalation, misleading response-time promises, or claiming a transfer happened when it did not. |
| `dang_FAQ` | Publish a question and answer to the whole class. | Publishing an incorrect or unverified answer to many students. |

**Autonomy levels to consider for each tool:**

- `Tự làm` — AI can perform the action autonomously.
- `Cần người duyệt` — Requires human approval.
- `Cấm` — AI must never perform this action.

---

## 3. Failure case inventory

First, create an overview of all scenarios. Aim for **at least 8 scenarios**, covering all four difficulty categories.

| ID | Short name | Category | Related tool(s) | Failure mechanism | Harm level | Owner | Status |
|---|---|---|---|---|---|---|---|
| FC-01 | [Name] | [1–4] | [Tool] | [Specific failure] | [Mild / Recoverable / Unacceptable] | [Name] | Draft |
| FC-02 | [Name] | [1–4] | [Tool] | [Specific failure] | [Mild / Recoverable / Unacceptable] | [Name] | Draft |
| FC-03 | [Name] | [1–4] | [Tool] | [Specific failure] | [Mild / Recoverable / Unacceptable] | [Name] | Draft |
| FC-04 | [Name] | [1–4] | [Tool] | [Specific failure] | [Mild / Recoverable / Unacceptable] | [Name] | Draft |
| FC-05 | Unclear question escalated without confirmation | 2 | `chuyen_TA` | Student asks unclear questions like "Why is this wrong?" without identifying the exercise or attempted step; AI guesses the context and forwards it to the TA without clarifying and confirming the question with the student, causing an irrelevant response and delay. | Recoverable | Dat | Draft |
| FC-06 | False TA transfer success | 1 | `chuyen_TA` | No successful transfer confirmation is available, but AI tells the student the TA has received the question and promises a response time; the student waits for help that may never arrive. | Recoverable | Dat | Draft |
| FC-07 | FAQ published beyond AI authority | 3 | `dang_FAQ` | AI publishes an unverified answer to the whole class without TA / lecturer approval; students may read, copy, or act on incorrect guidance before correction, so removing the FAQ cannot fully undo the harm. | Unacceptable | Dat | Draft |
| FC-08 | Private student details exposed in FAQ | 4 | `dang_FAQ` | AI publishes a student-specific question and answer containing the student's name, grade, or private circumstances without removing those details; classmates can read or copy them, and later removal cannot undo the disclosure. | Unacceptable | Dat | Draft |

### Difficulty categories

| Category | Meaning | Questions to ask |
|---|---|---|
| 1. Source of truth | AI invents information or lacks evidence. | Is the answer supported by course materials? Is the citation real and relevant? |
| 2. Ambiguity / missing information | The student's question is unclear or required information is unavailable. | Should AI ask a clarifying question instead of guessing? |
| 3. Outside scope / authority | The question or requested action exceeds what AI is allowed to do. | Should AI refuse, explain its limits, or transfer to a TA? |
| 4. Domain-specific risk | A mistake can cause a particular educational harm. | Could the student learn something incorrect, copy an answer, or spread misinformation to the class? |

### Harm levels

- **Mild:** Small inconvenience; easy for the student to recognize and correct.
- **Recoverable:** The student may be misled or delayed, but the product can provide a meaningful recovery path.
- **Unacceptable:** The product could seriously mislead students, compromise assessment integrity, or spread incorrect information to the whole class.

---

## 4. Detailed failure case template

> Duplicate this section for every scenario. Use specific fixture data and tool behavior wherever possible.

### FC-[XX] — [Scenario title]

**A. Basic information**

| Field | Details |
|---|---|
| Owner | [Teammate] |
| Category | [1. Source of truth / 2. Ambiguity / 3. Outside scope / 4. Domain-specific risk] |
| Related tool(s) | [Exact tool name(s)] |
| Harm level | [Mild / Recoverable / Unacceptable] |
| Affected user | [Student / TA / Lecturer / Whole class] |

**B. User situation**

- **User's exact message:**

  > [Write a realistic message the student would send.]

- **Context:**

  [What is the student trying to do? Which lesson, homework, or course situation is involved?]

**C. How the AI can fail**

- **Expected tool behavior / available evidence:**

  [What does the tool return, or what information is actually available?]

- **Failure mechanism:**

  [Describe exactly how the AI could fail. Avoid generic statements.]

- **Why could this happen?**

  [Wrong source? Missing source? Ambiguous wording? Tool limitations? Incorrect autonomy?]

- **Concrete evidence:**

  [Reference the fixture, lesson section, tool behavior, or explicitly missing information.]

**D. Expected product behavior**

- **What should the AI do instead?**

  [Give a specific expected response or action.]

- **Should it answer, ask, refuse, or escalate?**

  [Explain the choice.]

- **What should the student see?**

  [Citation, uncertainty warning, explanation, confirmation dialog, TA transfer status, etc.]

- **What should the product never do?**

  [State the forbidden behavior.]

**E. Impact and recovery**

- **Who is affected?**

  [Student / TA / Lecturer / Whole class.]

- **Potential consequence:**

  [What happens if the failure is not caught?]

- **Can the failure be reversed?**

  [Yes / No / Partially — explain.]

- **Recovery path:**

  [Correction, dismiss, report to lecturer, TA escalation, remove FAQ, etc.]

**F. Autonomy implications**

| Question | Decision |
|---|---|
| Which tool is involved? | [Tool] |
| Proposed autonomy level | [Tự làm / Cần người duyệt / Cấm] |
| Who should approve it, if anyone? | [Student / TA / Lecturer / Nobody] |
| What is the cost of an incorrect action? | [Explain] |
| What is the cost of waiting for approval? | [Explain] |

**G. UX implications for the UI developer**

- **Required UI state:** [Normal / Low confidence / No evidence / Error / Confirmation / Pending TA]
- **Information to display:** [Citation, warning, status, etc.]
- **Available user action:** [Correct / Dismiss / Report / Confirm / Cancel]
- **Notification recipient:** [Student / TA / Lecturer / Nobody]
- **Important wording:** [Example message, if known.]

**H. Alternative responses considered**

| Alternative | Advantage | Why accept or reject? |
|---|---|---|
| [Option A] | [Advantage] | [Reason] |
| [Option B] | [Advantage] | [Reason] |
| [Chosen option] | [Advantage] | [Reason] |

---

### FC-05 — Unclear question escalated without confirmation

**A. Basic information**

| Field | Details |
|---|---|
| Owner | Dat |
| Category | 2. Ambiguity / missing information |
| Related tool(s) | `chuyen_TA` |
| Harm level | Recoverable |
| Affected user | Student and TA |

**B. User situation**

- **User's exact message:**

  > Why is this wrong? Can you ask the TA?

- **Context:** The student wants help with an exercise but has not identified the exercise, shared their attempt, or explained which step is confusing.

**C. How the AI can fail**

- **Expected tool behavior / available evidence:** `chuyen_TA` transfers a question to a TA and reports expected response time. It does not resolve an unclear question on the student's behalf.
- **Failure mechanism:** AI guesses which exercise and mistake the student means, writes a summary, and forwards it without asking the student to clarify or confirm the content. The TA receives the wrong question and may provide irrelevant guidance.
- **Why could this happen?** AI treats a request for escalation as sufficient context and skips checking its interpretation.
- **Concrete evidence:** Section 2 documents the transfer tool. The exercise reference, attempted solution, and intended question are explicitly missing in this scenario; no supplied course fixture fills these gaps.

**D. Expected product behavior**

- **What should the AI do instead?** Ask for the exercise reference and attempted step. Show an editable preview of the clarified question and ask the student to confirm it before calling `chuyen_TA`.
- **Should it answer, ask, refuse, or escalate?** Ask first; escalate after clarification and student confirmation.
- **What should the student see?** A focused clarification prompt, the transfer preview, Confirm / Edit / Cancel controls, and the actual transfer result.
- **What should the product never do?** Guess missing details or send an AI interpretation as though the student had confirmed it.

**E. Impact and recovery**

- **Who is affected?** The student and TA.
- **Potential consequence:** Irrelevant advice delays learning and wastes TA time.
- **Can the failure be reversed?** Yes, the question can be corrected, although the time already lost cannot be restored.
- **Recovery path:** Acknowledge the incorrect interpretation, obtain the student's clarification, and send a confirmed correction that explains it supersedes the earlier question.

**F. Autonomy implications**

| Question | Decision |
|---|---|
| Which tool is involved? | `chuyen_TA` |
| Proposed autonomy level | Cần người duyệt |
| Who should approve it, if anyone? | Student reviews the exact question and context before transfer. |
| What is the cost of an incorrect action? | Miscommunication, irrelevant help, and wasted student / TA time. |
| What is the cost of waiting for approval? | One clarification and confirmation exchange, usually cheaper than correcting a wrong handoff. |

**G. UX implications for the UI developer**

- **Required UI state:** Clarification required → Confirmation → Pending TA or Transfer error.
- **Information to display:** Missing context, editable question preview, actual transfer status, and only a tool-supported response estimate.
- **Available user action:** Provide context / Edit / Confirm / Cancel.
- **Notification recipient:** TA after confirmed transfer; student when the transfer result is known.
- **Important wording:** “Which exercise and step do you mean? Share your attempt, and I will show you the question before sending it to the TA.”

**H. Alternative responses considered**

| Alternative | Advantage | Why accept or reject? |
|---|---|---|
| Transfer immediately | Fast initial handoff | Reject: missing context makes the transferred question unreliable. |
| Ask repeated broad questions | Avoids an immediate wrong transfer | Reject: unnecessary friction; ask specifically for the exercise and attempted step. |
| Clarify, preview, confirm, then transfer | Preserves student intent and gives the TA useful context | Chosen: resolves ambiguity before the external action. |

---

### FC-06 — False TA transfer success

**A. Basic information**

| Field | Details |
|---|---|
| Owner | Dat |
| Category | 1. Source of truth |
| Related tool(s) | `chuyen_TA` |
| Harm level | Recoverable |
| Affected user | Student and TA |

**B. User situation**

- **User's exact message:**

  > Please send this question to the TA. When can I expect a reply?

- **Context:** The question is clear and the student has confirmed the transfer, but successful delivery or a response-time estimate cannot be confirmed from the tool result.

**C. How the AI can fail**

- **Expected tool behavior / available evidence:** `chuyen_TA` transfers a question and reports expected response time. An attempted call alone is not evidence of success; an unavailable estimate cannot support a promise.
- **Failure mechanism:** AI receives no confirmed success but says the TA has received the question and invents a reply estimate. The student waits for help that may never arrive.
- **Why could this happen?** AI confuses invoking the tool with successful completion and substitutes a plausible estimate for missing evidence.
- **Concrete evidence:** Section 2 describes the tool; Section 5.3 raises failed transfers and unknown response times. No delivery receipt, API response schema, or TA schedule fixture is supplied, so this case assumes an explicitly unconfirmed outcome rather than a particular error code.

**D. Expected product behavior**

- **What should the AI do instead?** Report only what the result supports. Distinguish confirmed failure from an uncertain outcome and say the response time is unknown when no estimate exists. Retain the question and offer a deliberate retry.
- **Should it answer, ask, refuse, or escalate?** Explain uncertainty and offer recovery; request student confirmation before retrying an uncertain transfer.
- **What should the student see?** Unconfirmed / Failed status, the retained question, unknown response time where applicable, and Retry / Cancel controls.
- **What should the product never do?** Claim delivery or promise a reply time without evidence, or silently retry an uncertain call repeatedly.

**E. Impact and recovery**

- **Who is affected?** Student; TA if retries produce duplicate requests.
- **Potential consequence:** False reassurance wastes study time and can prevent the student from seeking other help.
- **Can the failure be reversed?** Partially: the status can be corrected and a transfer retried, but lost time remains.
- **Recovery path:** Correct the false success claim. Offer a retry, explaining that an uncertain earlier attempt may already have succeeded. Show success only when supported by the new result; duplicate prevention is not a documented tool capability.

**F. Autonomy implications**

| Question | Decision |
|---|---|
| Which tool is involved? | `chuyen_TA` |
| Proposed autonomy level | Cần người duyệt |
| Who should approve it, if anyone? | Student confirms transfer content and any retry after an uncertain outcome. Reporting the actual result needs no additional approval. |
| What is the cost of an incorrect action? | False reassurance, delayed help, and possible duplicate TA work. |
| What is the cost of waiting for approval? | A brief retry decision; honesty about delivery is more useful than an unsupported success message. |

**G. UX implications for the UI developer**

- **Required UI state:** Pending transfer → Confirmed / Unconfirmed / Failed.
- **Information to display:** Actual outcome, retained question, unknown timing when applicable, and duplicate-request warning before retrying an uncertain call.
- **Available user action:** Retry / Cancel / Copy question.
- **Notification recipient:** Student as soon as failure or uncertainty is known; TA through a successful transfer.
- **Important wording:** “I could not confirm that your question reached the TA. The response time is unknown. You can retry, but the earlier attempt may already have gone through.”

**H. Alternative responses considered**

| Alternative | Advantage | Why accept or reject? |
|---|---|---|
| Assume success after invoking the tool | Smooth flow | Reject: invocation does not prove delivery. |
| Retry automatically until success | May eventually deliver the request | Reject: duplicate handling is undocumented and repeated calls may create duplicate work. |
| Show uncertainty and offer a confirmed retry | Honest status and a clear recovery path | Chosen: preserves student control without inventing tool results. |

---

### FC-07 — FAQ published beyond AI authority

**A. Basic information**

| Field | Details |
|---|---|
| Owner | Dat |
| Category | 3. Outside scope / authority |
| Related tool(s) | `dang_FAQ` |
| Harm level | Unacceptable |
| Affected user | Whole class, TA, and lecturer |

**B. User situation**

- **User's exact message:**

  > Others are asking this too. Please publish your answer as a class FAQ.

- **Context:** AI has drafted a course answer, but a TA / lecturer has neither verified the answer nor approved class-wide publication.

**C. How the AI can fail**

- **Expected tool behavior / available evidence:** `dang_FAQ` publishes a question and answer to the whole class. It is a publication action, not a verification service. Human approval is a proposed product safeguard, not a documented tool feature.
- **Failure mechanism:** AI treats a student's publication request as sufficient authority and publishes an unverified answer. Students read, copy, or act on incorrect guidance before a TA can intervene.
- **Why could this happen?** AI confuses being able to draft an answer with authority to publish official class guidance.
- **Concrete evidence:** Section 2 documents class-wide publication; Section 5.4 explicitly raises incorrect and unverified FAQ answers. No course fixture verifies the hypothetical answer in this scenario.

**D. Expected product behavior**

- **What should the AI do instead?** Prepare a draft containing the question, answer, available citations, and unresolved uncertainty. Require a TA / lecturer to approve that exact content before calling `dang_FAQ`. Changes after approval require another review. Keep the draft pending if no reviewer is available.
- **Should it answer, ask, refuse, or escalate?** Require authorized human review before publication; a student's request alone cannot authorize it.
- **What should the student see?** Draft / Pending approval status and a clear statement that publication requires TA / lecturer review.
- **What should the product never do?** Publish unverified content automatically, treat reviewer silence as consent, or reuse approval for materially changed content.

**E. Impact and recovery**

- **Who is affected?** The whole class and course staff.
- **Potential consequence:** Incorrect guidance spreads, changes students' understanding, and may affect submitted work. Deleting a post cannot make students unread it.
- **Can the failure be reversed?** Partially: corrections can reduce further harm, but prior exposure, copying, and decisions cannot be fully undone.
- **Recovery path:** Alert the TA / lecturer immediately with the published content and uncertainty. An authorized operator should correct or remove the FAQ through available course controls and communicate a class correction. Removal and class notifications are not documented capabilities of `dang_FAQ` and require separate product support or manual intervention.

**F. Autonomy implications**

| Question | Decision |
|---|---|
| Which tool is involved? | `dang_FAQ` |
| Proposed autonomy level | Cần người duyệt |
| Who should approve it, if anyone? | TA or lecturer reviews the exact draft, supporting evidence, uncertainty, and class-wide audience. |
| What is the cost of an incorrect action? | Class-wide misinformation, damaged trust, and possible assessment consequences. |
| What is the cost of waiting for approval? | Delayed publication; keeping a draft pending avoids exposing the class while review is unavailable. |

**G. UX implications for the UI developer**

- **Required UI state:** Draft → Pending approval → Approved → Published; Rejected / Changes requested when appropriate.
- **Information to display:** Full publication preview, audience, citations or missing evidence, reviewer decision, and actual publication outcome.
- **Available user action:** Reviewer can Approve / Reject / Request changes; student can view pending status.
- **Notification recipient:** TA / lecturer when review is needed or unauthorized publication is detected; class receives an authorized correction after an incorrect publication.
- **Important wording:** “I can prepare an FAQ draft. A TA or lecturer must verify and approve it before it is published to the class.”

**H. Alternative responses considered**

| Alternative | Advantage | Why accept or reject? |
|---|---|---|
| Publish with an AI disclaimer | Fast sharing | Reject: a disclaimer does not prevent students from relying on incorrect guidance. |
| Forbid all FAQ publication | Eliminates this publication risk | Reject: prevents useful verified answers from being shared. |
| Require review of the exact draft before publication | Controls authority and class-wide harm | Chosen: preserves useful publication with a human decision before exposure. |

---

### FC-08 — Private student details exposed in FAQ

**A. Basic information**

| Field | Details |
|---|---|
| Owner | Dat |
| Category | 4. Domain-specific risk |
| Related tool(s) | `dang_FAQ` |
| Harm level | Unacceptable |
| Affected user | Student whose details are exposed; classmates who receive the FAQ |

**B. User situation**

- **User's exact message:**

  > My grade is low and I missed class for a private family reason. Can you explain how I should catch up?

- **Context:** A private help request includes academic information and personal circumstances. AI decides the underlying question would be useful to classmates and creates an FAQ from the conversation. This is an illustrative scenario, not an actual student record.

**C. How the AI can fail**

- **Expected tool behavior / available evidence:** `dang_FAQ` publishes to the whole class. No anonymization, deletion, or recall function is documented for this tool.
- **Failure mechanism:** AI copies the student's name, grade, or distinctive personal circumstances into the FAQ. Classmates can identify the student and save or share the content before removal.
- **Why could this happen?** AI treats information given for private assistance as suitable for public reuse and checks for names without considering indirect identification.
- **Concrete evidence:** Section 2 specifies a class-wide audience, and Section 5.4 asks about student-specific information. This risk follows from publishing private context to that audience; no fabricated course content or tool response is needed.

**D. Expected product behavior**

- **What should the AI do instead?** Keep personal assistance private. If a general learning question is useful, create a separate draft without names, grades, private circumstances, or indirect identifiers. Require TA / lecturer review of that exact sanitized draft and audience. If identification risk remains, block publication.
- **Should it answer, ask, refuse, or escalate?** Continue private help; refuse publication of identifiable private content. Offer a generalized draft for human review only when identifying context can be removed.
- **What should the student see?** A private reply, a clearly separate sanitized preview if applicable, and an explicit class-wide audience warning before any publication review.
- **What should the product never do?** Publish the private conversation verbatim, assume removing a name is enough, or treat a private help request as publication consent.

**E. Impact and recovery**

- **Who is affected?** Primarily the student whose information is disclosed; classmates also receive inappropriate personal information.
- **Potential consequence:** Embarrassment, stigma, loss of trust, and wider sharing of academic or family details.
- **Can the failure be reversed?** Not fully: further exposure can be limited, but memories, screenshots, and copies cannot reliably be recalled.
- **Recovery path:** Stop further publication, notify the affected student and TA / lecturer with minimal necessary detail, and request removal through available course controls. Explain the limits of removal honestly. Avoid repeating sensitive details in a class-wide correction; deletion and notification need separate support because they are not documented `dang_FAQ` capabilities.

**F. Autonomy implications**

| Question | Decision |
|---|---|
| Which tool is involved? | `dang_FAQ` |
| Proposed autonomy level | Cần người duyệt for sanitized FAQ drafts; Cấm for identifiable private student content. |
| Who should approve it, if anyone? | TA / lecturer reviews the exact sanitized draft for identification risk and audience. Under this proposed policy, student consent alone does not override the ban on identifiable private FAQ content. |
| What is the cost of an incorrect action? | Private information exposure and lasting damage to student trust. |
| What is the cost of waiting for approval? | Additional sanitization and review time; private help can continue while publication is withheld. |

**G. UX implications for the UI developer**

- **Required UI state:** Private help → Sanitization required → Human review or Publication blocked.
- **Information to display:** Separate private response and sanitized draft, class-wide audience notice, privacy warning, reviewer decision, and incident reporting route.
- **Available user action:** Continue privately / Review sanitized draft / Cancel publication / Report exposure; reviewer can Approve sanitized content / Reject.
- **Notification recipient:** Affected student and TA / lecturer promptly after detected disclosure; avoid rebroadcasting personal details to the class.
- **Important wording:** “I will keep your personal details private. Any class FAQ must use a generalized question without identifying information and pass TA or lecturer review.”

**H. Alternative responses considered**

| Alternative | Advantage | Why accept or reject? |
|---|---|---|
| Publish the original conversation | Retains all context | Reject: exposes information supplied for private assistance. |
| Remove the name and publish automatically | Removes an obvious identifier quickly | Reject: grades and distinctive circumstances can still identify the student. |
| Keep private help separate and review a sanitized FAQ draft | Supports the student while preventing unnecessary disclosure | Chosen: blocks identifiable content before class-wide exposure. |

---

## 5. Tool-specific analysis

Use this section to ensure the team investigates all four tools, rather than focusing only on chatbot responses.

### 5.1 `tra_cuu_tai_lieu`

- Can the search return no relevant result?
- Can the AI cite a section that does not support its answer?
- What happens when the provided course material contains a questionable or incorrect statement?
- What happens when the student asks about material that has not been opened yet?
- Can the AI distinguish course evidence from its own assumptions?

**Scenarios:** [FC-XX, FC-XX]

**Proposed autonomy:** [Tự làm / Cần người duyệt / Cấm]

### 5.2 `goi_y_bai_tap`

- Can a hint accidentally reveal the complete answer?
- What if the student asks the AI to solve an open homework question?
- What if the student repeatedly asks for more detailed hints?
- How should the AI distinguish explanation of a concept from completing an assessment?

**Scenarios:** [FC-XX, FC-XX]

**Proposed autonomy:** [Tự làm / Cần người duyệt / Cấm]

### 5.3 `chuyen_TA`

- What if the student asks for a TA outside TA working hours?
- What if the expected response time is unknown?
- What if the student believes the TA has already received the request?
- What if the transfer fails or is cancelled?

**Scenarios:** [FC-05, FC-06]

**Proposed autonomy:** [Tự làm]

### 5.4 `dang_FAQ`

- What if the AI publishes an incorrect answer to the entire class?
- What if the answer has not been verified by a TA?
- What if the question contains information specific to one student?
- What if the FAQ needs correction or removal after publication?

**Scenarios:** [FC-07, FC-08]

**Proposed autonomy:** [Cần người duyệt]

---

## 6. Select the two most expensive failure cases

The assignment requires selecting the two scenarios with the highest cost of failure. Do not select them merely because they sound dramatic.

### Highest-cost scenario #1

**Scenario ID:** [FC-XX]

- What makes this failure expensive?
- Who suffers, and how?
- How likely is it to happen?
- Can it be reversed?
- Why is it more costly than the other scenarios?
- What product-level protection is necessary?

### Highest-cost scenario #2

**Scenario ID:** [FC-XX]

- What makes this failure expensive?
- Who suffers, and how?
- How likely is it to happen?
- Can it be reversed?
- Why is it more costly than the other scenarios?
- What product-level protection is necessary?

### Comparison

| Factor | Highest-cost #1 | Highest-cost #2 |
|---|---|---|
| Potential harm | | |
| Number of people affected | | |
| Reversibility | | |
| Cost of delayed response | | |
| Why it deserves priority | | |

---

## 7. Near-miss scenario

Choose one scenario that initially seemed important but was ultimately **not selected** as one of the two highest-cost cases.

**Scenario ID:** [FC-XX]

- Why did it initially seem important?
- Why did the team reject it?
- What makes its impact or likelihood lower?
- What would make the team reconsider this decision?

---

## 8. Handoff to UX and prototype

After the failure analysis is complete, give the UI developer the following information.

| Item | Result |
|---|---|
| Two highest-cost scenario IDs | [FC-XX, FC-XX] |
| Main tool involved in scenario #1 | [Tool] |
| Main tool involved in scenario #2 | [Tool] |
| Required UI states | [List] |
| Required warnings / citations | [List] |
| Actions requiring confirmation | [List] |
| Actions requiring TA / lecturer approval | [List] |
| Actions that must be forbidden | [List] |
| Recovery mechanisms | [List] |

**Important:** The prototype should demonstrate how the product handles the two highest-cost failures, not merely show the normal happy path.

---

## 9. Final review checklist

- [ ] At least 8 concrete failure scenarios documented.
- [ ] All four difficulty categories covered.
- [ ] All four tools investigated.
- [ ] Every scenario has a realistic user message.
- [ ] Every scenario identifies a specific failure mechanism.
- [ ] Every scenario references actual fixture data, tool behavior, or missing information.
- [ ] Every scenario defines expected product behavior.
- [ ] Every scenario has a harm level: Mild, Recoverable, or Unacceptable.
- [ ] Two highest-cost scenarios selected with clear reasoning.
- [ ] One near-miss scenario rejected with reasoning.
- [ ] Autonomy implications considered for the relevant tools.
- [ ] UX implications are clear enough for the UI developer to implement.
