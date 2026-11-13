# FC-[XX] — [Failure Case Name]

> **Instructions:** Create one copy of this template for each failure case. Fill in every relevant section with concrete details from the Track 2 fixtures and tools. Avoid vague descriptions such as "AI gives a wrong answer." Explain exactly how and why the failure happens.

## 1. Basic information

| Field | Value |
|---|---|
| Failure Case ID | FC-[XX] |
| Failure Case Name | [Short descriptive name] |
| Author | [Your name] |
| Task Number | [Task number] |
| Difficulty Category | [1 / 2 / 3 / 4] |
| Severity | [Mild / Recoverable / Unacceptable] |
| Related Tool(s) | [Exact tool name(s)] |
| Status | [Draft / Under Review / Approved] |

### Difficulty category

- **1 — Source of truth:** AI invents information, uses unsupported claims, or lacks evidence.
- **2 — Ambiguity / missing information:** Student's question is unclear or necessary information is unavailable.
- **3 — Outside scope / authority:** AI is asked to do something outside its permitted scope or authority.
- **4 — Domain-specific risk:** AI behavior could cause educational harm, compromise assessment integrity, or spread misinformation.

---

## 2. User scenario

### 2.1 User's message

Write the exact message the student sends to the AI.

> "[Insert realistic student message here]"

### 2.2 Context

- **Course:** Introduction to Data Analysis
- **Current lesson:** [Lesson number and title]
- **Student's situation:** [What is the student trying to achieve?]
- **Relevant fixture data:** [Relevant course content, homework, deadline, TA hours, etc.]

### 2.3 Preconditions

What must be true before this failure can happen?

1. [Precondition 1]
2. [Precondition 2]
3. [Precondition 3]

---

## 3. Failure mechanism

### 3.1 Expected behavior of the tool

**Tool:** `[Exact tool name]`

Describe what the tool is supposed to do and what information it can actually access.

[Your explanation]

### 3.2 How the failure happens

Describe the failure step by step.

1. Student asks: [Question or request]
2. AI attempts to: [Action or reasoning]
3. Tool returns / fails to return: [Actual result or limitation]
4. AI responds by: [Incorrect behavior]
5. Student experiences: [Consequence]

### 3.3 Concrete evidence

Ground the failure in the assignment fixtures or tool behavior.

| Evidence | Details |
|---|---|
| Fixture / source | [Name of fixture or course section] |
| Relevant content | [Exact relevant information] |
| Tool behavior | [What the tool returns or cannot do] |
| Missing information | [What is unavailable, if applicable] |

**Why is this a real failure possibility?**

[Explain why the failure follows from the provided materials or tool limitations.]

---

## 4. Expected product behavior

### 4.1 Correct behavior

What should the AI do instead?

[Describe the desired behavior.]

### 4.2 Example of a good AI response

> [Write an example response in Vietnamese or English.]

### 4.3 Forbidden behavior

What must the AI never do in this situation?

- [Forbidden behavior 1]
- [Forbidden behavior 2]
- [Forbidden behavior 3]

### 4.4 Response strategy

Choose the most appropriate strategy:

- [ ] Answer with supporting course citations.
- [ ] Ask the student a clarifying question.
- [ ] Explain uncertainty or lack of evidence.
- [ ] Provide a limited step-by-step hint.
- [ ] Refuse the requested action and explain why.
- [ ] Ask for student confirmation before an action.
- [ ] Transfer the question to a TA.
- [ ] Require TA / lecturer approval.
- [ ] Other: [Explain]

---

## 5. Impact and severity analysis

### 5.1 Who is affected?

- [ ] Student who asked the question
- [ ] Other students
- [ ] Teaching Assistant
- [ ] Lecturer
- [ ] Entire class

### 5.2 Potential consequences

[Explain what could happen if the failure is not detected.]

### 5.3 Severity justification

**Selected severity:** [Mild / Recoverable / Unacceptable]

Why does this failure deserve this severity?

[Explain the impact, likelihood, and potential educational consequences.]

### 5.4 Reversibility

| Question | Answer |
|---|---|
| Can the failure be reversed? | [Yes / No / Partially] |
| Who can correct it? | [Student / TA / Lecturer / System] |
| Could someone already have been affected before correction? | [Explain] |
| What is the cost of waiting for human intervention? | [Explain] |

---

## 6. Tool autonomy analysis

For each involved tool, recommend an autonomy level.

| Tool | Proposed autonomy | Reason |
|---|---|---|
| `tra_cuu_tai_lieu` | [Tự làm / Cần người duyệt / Cấm] | [Reason] |
| `goi_y_bai_tap` | [Tự làm / Cần người duyệt / Cấm] | [Reason] |
| `chuyen_TA` | [Tự làm / Cần người duyệt / Cấm] | [Reason] |
| `dang_FAQ` | [Tự làm / Cần người duyệt / Cấm] | [Reason] |

Only fill in the tools relevant to this case. Leave the others blank or mark them N/A.

### Cost-of-error reasoning

- **Who suffers if the AI makes the wrong decision?** [Explain]
- **Can the action be undone?** [Explain]
- **What does approval delay cost?** [Explain]
- **Why is the proposed autonomy level appropriate?** [Explain]

---

## 7. UX requirements for implementation

This section is especially important because the UI developer will use it to build the prototype.

### 7.1 Required UI state

- [ ] Normal response
- [ ] Low confidence / uncertainty
- [ ] No supporting evidence
- [ ] Tool failure
- [ ] Confirmation required
- [ ] Waiting for TA
- [ ] Corrected answer
- [ ] Other: [Explain]

### 7.2 What should the user see?

| UI element | Expected content / behavior |
|---|---|
| Main AI response | [Description] |
| Evidence / citation | [Section reference or unavailable] |
| Confidence / uncertainty indicator | [Description] |
| Warning message | [Description] |
| Available actions | [Buttons / controls] |
| Action confirmation | [If applicable] |
| Recovery information | [Description] |

### 7.3 User actions

What should the student be able to do?

- [ ] Ask for clarification
- [ ] Request a correction
- [ ] Dismiss the response
- [ ] Report questionable material
- [ ] Request TA assistance
- [ ] Confirm an action
- [ ] Cancel an action
- [ ] Other: [Explain]

### 7.4 Notifications and escalation

| Question | Answer |
|---|---|
| Should anyone be notified? | [Yes / No] |
| Who receives the notification? | [Student / TA / Lecturer] |
| When should notification happen? | [Trigger] |
| What should the notification contain? | [Relevant information] |
| What should the student be told about the status? | [Honest status message] |

---

## 8. Alternatives considered

List alternative product responses and explain why they were accepted or rejected.

| Alternative | Advantages | Disadvantages | Decision |
|---|---|---|---|
| Option A: [Description] | [Advantages] | [Disadvantages] | [Accept / Reject] |
| Option B: [Description] | [Advantages] | [Disadvantages] | [Accept / Reject] |
| Option C: [Chosen solution] | [Advantages] | [Disadvantages] | [Chosen] |

**Why is the chosen solution better?**

[Explain the trade-offs.]

---

## 9. HAX / PAIR principles

Identify 2–3 principles relevant to this failure and map them to specific product behavior or UI elements.

| Principle | How it applies | Exact UI / product location |
|---|---|---|
| [HAX / PAIR principle] | [Explanation] | [Where the user sees it] |
| [HAX / PAIR principle] | [Explanation] | [Where the user sees it] |
| [Optional third principle] | [Explanation] | [Where the user sees it] |

Possible principles include:

- HAX G1 — Make clear what the system can do.
- HAX G2 — Make clear how well the system performs.
- HAX G8 — Support efficient dismissal.
- HAX G9 — Support efficient correction.
- HAX G10 — Scope services when in doubt.
- HAX G11 — Make clear why the system did what it did.
- HAX G15 — Encourage granular feedback.
- PAIR — Explainability and Trust.
- PAIR — Errors and Graceful Failure.

---

## 10. Validation

How will the team know the product handles this failure correctly?

### Test input

> [Exact student message]

### Expected result

[Expected AI behavior and UI state.]

### Pass criteria

- [ ] AI does not perform the identified failure.
- [ ] AI provides appropriate evidence or explains why evidence is unavailable.
- [ ] AI follows the selected autonomy policy.
- [ ] Student receives an appropriate recovery path.
- [ ] No false claim is made about an action being completed.

### Remaining limitations

[What could still go wrong, even with this design?]

---

## 11. References

- [Assignment guide section / fixture reference]
- [Relevant tool documentation]
- [Relevant team discussion or design decision]

---

## Review notes

| Reviewer | Feedback | Status |
|---|---|---|
| [Name] | [Feedback] | [Pending / Resolved] |

**Final status:** [Draft / Approved / Needs revision]