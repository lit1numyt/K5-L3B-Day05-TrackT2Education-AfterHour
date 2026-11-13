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
| FC-05 | [Name] | [1–4] | [Tool] | [Specific failure] | [Mild / Recoverable / Unacceptable] | [Name] | Draft |
| FC-06 | [Name] | [1–4] | [Tool] | [Specific failure] | [Mild / Recoverable / Unacceptable] | [Name] | Draft |
| FC-07 | [Name] | [1–4] | [Tool] | [Specific failure] | [Mild / Recoverable / Unacceptable] | [Name] | Draft |
| FC-08 | [Name] | [1–4] | [Tool] | [Specific failure] | [Mild / Recoverable / Unacceptable] | [Name] | Draft |

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

**Scenarios:** [FC-XX, FC-XX]

**Proposed autonomy:** [Tự làm / Cần người duyệt / Cấm]

### 5.4 `dang_FAQ`

- What if the AI publishes an incorrect answer to the entire class?
- What if the answer has not been verified by a TA?
- What if the question contains information specific to one student?
- What if the FAQ needs correction or removal after publication?

**Scenarios:** [FC-XX, FC-XX]

**Proposed autonomy:** [Tự làm / Cần người duyệt / Cấm]

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
