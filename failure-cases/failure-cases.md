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
| [FC-01](FC-01-tai-lieu-sai-do-lech-chuan.md) | Tài liệu sai độ lệch chuẩn | 1 | `tra_cuu_tai_lieu` | Trích nguyên câu sai "độ lệch chuẩn luôn nhỏ hơn phương sai" để bác bỏ phép tính đúng của học viên (phương sai 0,25 → độ lệch chuẩn 0,5) | Unacceptable | Nguyễn Lương Nguyên | Draft |
| [FC-02](FC-02-nguon-khong-ton-tai-slide-12.md) | Nguồn không tồn tại slide 12 | 2 | `tra_cuu_tai_lieu` | Tra cứu rỗng nhưng AI ngầm coi slide 12 = §3.3, gán công thức n−1 cho tài liệu không có công thức; đoán nghĩa "độ lệch" | Recoverable | Nguyễn Lương Nguyên | Draft |
| [FC-03](FC-03-noi-dung-buoi-chua-hoc-p-value.md) | Nội dung buổi chưa học p-value | 3 | `tra_cuu_tai_lieu` | Tra cứu rỗng, AI giảng trọn p-value từ kiến thức ngoài, không nói "buổi 7", gợi ý dùng p-value cho Bài 3 (b) | Mild | Nguyễn Lương Nguyên | Draft |
| [FC-04](FC-04-goi-y-qua-tay-bai-dang-mo.md) | Gợi ý quá tay bài đang mở | 4 | `goi_y_bai_tap` | 22:40 ngày 13/11, ngoài giờ TA: gợi ý chi tiết dần đến lời giải, xác nhận đáp số, viết hộ câu (b), nhận xét năng lực | Unacceptable | Nguyễn Lương Nguyên | Draft |
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

## 5. Tool-specific analysis

Use this section to ensure the team investigates all four tools, rather than focusing only on chatbot responses.

### 5.1 `tra_cuu_tai_lieu`

- Can the search return no relevant result?
- Can the AI cite a section that does not support its answer?
- What happens when the provided course material contains a questionable or incorrect statement?
- What happens when the student asks about material that has not been opened yet?
- Can the AI distinguish course evidence from its own assumptions?

**Scenarios:** FC-01, FC-02, FC-03

**Proposed autonomy:** Tự làm (chỉ đọc), kèm luật trình bày: tách trích dẫn khỏi lập luận; tra cứu rỗng thì nói "không có"; buổi chưa mở thì nói buổi nào sẽ học, tối đa một câu.

### 5.2 `goi_y_bai_tap`

- Can a hint accidentally reveal the complete answer?
- What if the student asks the AI to solve an open homework question?
- What if the student repeatedly asks for more detailed hints?
- How should the AI distinguish explanation of a concept from completing an assessment?

**Scenarios:** FC-04

**Proposed autonomy:** Tự làm có trần (bài đang mở: chỉ gợi ý bước đầu) · Cấm xác nhận đáp số và viết hộ nhận xét bài đang mở · Tự làm đầy đủ với bài đã hết hạn.

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

The team selects **FC-07 and FC-01** because they can make students accept incorrect guidance as authoritative. FC-07 crosses the publication authority boundary and spreads unverified guidance to the class; FC-01 reinforces incorrect knowledge using a genuine but erroneous course citation. This prioritization considers impact, detectability, and recovery; no measured failure rates are available.

### Highest-cost scenario #1

**Scenario ID:** FC-07 — FAQ published beyond AI authority

- **What makes this failure expensive?** AI publishes an unverified answer without TA / lecturer approval. The answer reaches the whole class and may be treated as official guidance even though AI has exceeded its authority. Removing the post cannot undo work or learning already based on it.
- **Who suffers, and how?** Students may learn or apply incorrect guidance; TA / lecturer must investigate, correct the FAQ, address affected work, and restore trust.
- **How likely is it to happen?** It is plausible if a student request can trigger `dang_FAQ` without an enforced approval gate. The inventory does not establish a numerical probability. The authority violation is unauthorized publication; the case does not require the topic itself to be outside the course.
- **Can it be reversed?** Partially. A correction or removal can limit further reliance, but prior reading, copying, and decisions remain.
- **Why is it more costly than the other scenarios?** One action can distribute unverified guidance to the whole class. Compared with FC-05 and FC-06, it goes beyond a delayed or incorrect individual handoff. Compared with FC-08, the team's priority is preventing guidance that students may not recognize as wrong and may continue to apply after publication.
- **What product-level protection is necessary?** Require TA / lecturer review of the exact question, answer, evidence, uncertainty, and audience before calling `dang_FAQ`. Material edits invalidate approval; silence leaves the draft pending. Corrections, removal, and class notifications require separate product support or manual course controls because they are not documented `dang_FAQ` capabilities.

### Highest-cost scenario #2

**Scenario ID:** FC-01 — Tài liệu sai độ lệch chuẩn

- **What makes this failure expensive?** The source itself contains an error in §3.3: it claims standard deviation is always smaller than variance. AI cites that sentence to reject the student's correct example, variance 0.25 and standard deviation 0.5. A genuine citation makes the false explanation appear trustworthy and can cause the student to replace correct reasoning with a misconception.
- **Who suffers, and how?** The student doubts a correct calculation and may carry the misconception into later lessons. Other students asking about the same passage can receive the same incorrect guidance, while the lecturer must correct the source and affected explanations. AI must also avoid judging the student's ability in response to their self-critical wording.
- **How likely is it to happen?** The error is documented in the FC-01 fixture and can recur whenever AI treats the retrieved passage as unquestionable truth. The case notes that the large variance in the homework example can conceal the faulty generalization. Actual occurrence frequency is unknown.
- **Can it be reversed?** Partially. The lecturer can correct §3.3 and students can receive an explanation, but some may already have memorized the false rule or used it in submitted work. Correcting the source alone does not ensure earlier readers update their understanding.
- **Why is it more costly than the other scenarios?** Unlike an unsupported claim, the error has the apparent backing of the course document and is harder for students to challenge. Unlike FC-06, whose primary harm is false transfer reassurance and lost time, FC-01 directly teaches incorrect knowledge and can repeatedly affect students using the same source. It is prioritized over FC-08 because a visible FAQ disclosure can be located and removed through suitable controls, while a citation-backed misconception may remain undetected and continue influencing learning.
- **What product-level protection is necessary?** Keep read-only `tra_cuu_tai_lieu` autonomous, but check retrieved claims against directly verifiable calculations. Confirm that √0.25 = 0.5, flag the conflicting sentence in §3.3, and separate the assistant's mathematical reasoning from the quoted source. Do not invent a student error or silently rewrite the document. Offer the proposed student-operated reporting route to the lecturer, or a confirmed TA transfer if that route is unavailable; claim reporting success only after a real successful action. The lecturer approves source corrections.

### Comparison

| Factor | Highest-cost #1: FC-07 | Highest-cost #2: FC-01 |
|---|---|---|
| Potential harm | Unverified guidance appears official after AI exceeds publication authority. | Incorrect course content overturns a correct calculation and creates a persistent misconception. |
| Number of people affected | Potentially the whole class immediately. | Initially the questioning student; repeatedly affects others using §3.3, potentially the class. |
| Reversibility | Partial: remove or correct publication, but prior reliance remains. | Partial: correct source and explanations, but learned misconceptions and prior work may persist. |
| Cost of delayed response | FAQ publication waits for authorized review. | Low if AI immediately explains the checkable contradiction and flags it; official source correction can wait for lecturer review. |
| Why it deserves priority | Broad distribution combined with an authority violation. | A genuine citation hides the error and encourages students to distrust correct reasoning. |

---

## 7. Near-miss scenario

**Scenario ID:** FC-08 — Private student details exposed in FAQ

- **Why did it initially seem important?** Publishing names, grades, or private circumstances exposes a student to classmates and may cause embarrassment, stigma, wider sharing, and lasting loss of trust. It remains an **Unacceptable** failure.
- **Why did the team reject it from the top two?** For this prioritization, the team considers an identifiable FAQ post easier to locate, flag, and request removal of than incorrect knowledge that appears supported by the course document. FC-01 can silently change a student's understanding, while FC-07 publishes guidance beyond AI authority that the class may treat as official. The team therefore prioritizes these two routes to persistent misinformation.
- **What makes its impact or likelihood lower?** The rationale is a more direct containment path after detection, not evidence of a lower occurrence rate or harmless consequences. With suitable course controls, staff can identify the FAQ and remove it to reduce further exposure. However, this does not retrieve every copy or erase what classmates already saw. Removal is not a documented `dang_FAQ` function, so this recovery depends on separate controls or manual intervention.
- **What would make the team reconsider this decision?** Highly sensitive information, direct identification, screenshots or wider sharing, delayed detection, repeated disclosures, or unavailable removal controls would weaken the containment assumption and justify moving FC-08 into the highest-priority pair.

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
