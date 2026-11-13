# FC-06 — False TA transfer success

## 1. Basic information

| Field | Value |
|---|---|
| Failure Case ID | FC-06 |
| Failure Case Name | False TA transfer success |
| Author | Dat |
| Task Number | Not specified in Table 3 |
| Difficulty Category | 1 — Source of truth |
| Severity | Recoverable |
| Related Tool(s) | `chuyen_TA` |
| Status | Draft |

### Difficulty category

**1 — Source of truth:** AI confuses an attempted action with a completed action and fills missing timing information with a plausible promise.

---

## 2. User scenario

### 2.1 User's message

> Please send this question to the TA. When can I expect a reply?

### 2.2 Context

- **Course:** Introduction to Data Analysis, as named in the shared template; no specific course content is supplied in Table 3.
- **Current lesson:** Not specified; no lesson-specific answer is invented for this case.
- **Student's situation:** The student has provided a clear question and approved the transfer, but the tool outcome does not confirm delivery or provide a reliable response-time estimate.
- **Relevant fixture data:** Table 3, FC-06, and the documented tool purpose in Section 2 of `failure-cases.md`. Confirmed transfer success and a supported response-time estimate; no delivery receipt format, API error schema, or TA schedule is supplied.

### 2.3 Preconditions

The student has confirmed a clear question; AI attempts a transfer; the result is failed, unavailable, or inconclusive.

---

## 3. Failure mechanism

### 3.1 Expected behavior of the tool

**Tool:** `chuyen_TA`

Transfers a question to a TA and reports expected response time. Invoking the tool is not itself proof of successful delivery.

### 3.2 How the failure happens

1. The student sends the request in Section 2.1.
2. The AI attempts to help in the context described above.
3. The available evidence or tool limitations leave these gaps: Confirmed transfer success and a supported response-time estimate; no delivery receipt format, API error schema, or TA schedule is supplied.
4. AI receives no confirmed success but says the TA has received the question and promises a reply time. The student waits for help that may never arrive.
5. The student loses study time and may stop seeking help because of false reassurance. Duplicate requests can also waste TA effort.

### 3.3 Concrete evidence

| Evidence | Details |
|---|---|
| Fixture / source | `failure-cases.md`, Section 3, FC-06. |
| Relevant content | AI receives no confirmed success but says the TA has received the question and promises a reply time. The student waits for help that may never arrive. |
| Tool behavior | Transfers a question to a TA and reports expected response time. Invoking the tool is not itself proof of successful delivery. |
| Missing information | Confirmed transfer success and a supported response-time estimate; no delivery receipt format, API error schema, or TA schedule is supplied. |

**Why is this a real failure possibility?**

AI confuses an attempted action with a completed action and fills missing timing information with a plausible promise. The scenario follows from the inventory and documented tool scope; it does not assume a particular API response, real student record, or fabricated course answer.

---

## 4. Expected product behavior

### 4.1 Correct behavior

Report only the actual result: confirmed success, confirmed failure, or uncertain delivery. If the estimate is missing, say it is unknown. Retain the question and offer a retry. For an uncertain outcome, warn that the original attempt may already have succeeded and ask before retrying; duplicate prevention is undocumented.

### 4.2 Example of a good AI response

> I could not confirm that your question reached the TA. The response time is unknown. You can retry, but the earlier attempt may already have gone through.

### 4.3 Forbidden behavior

Claim delivery without supporting evidence; invent a response time; retry uncertain transfers repeatedly without informing the student.

### 4.4 Response strategy

Explain the uncertain or failed outcome and offer a student-confirmed retry.

---

## 5. Impact and severity analysis

### 5.1 Who is affected?

Student and TA, if retries create duplicate requests.

### 5.2 Potential consequences

The student loses study time and may stop seeking help because of false reassurance. Duplicate requests can also waste TA effort.

### 5.3 Severity justification

**Selected severity:** Recoverable.

The status can be corrected and a new transfer attempted, but lost time remains. No class-wide publication or irreversible assessment outcome is assumed. Frequency is not measured.

### 5.4 Reversibility

| Question | Answer |
|---|---|
| Can the failure be reversed? | Partially: correct the status and retry, but elapsed time cannot be restored. |
| Who can correct it? | Student approves the transfer content and any retry after an uncertain outcome. Reporting actual tool status requires no additional approval. |
| Could someone already have been affected before correction? | Yes. The student loses study time and may stop seeking help because of false reassurance. Duplicate requests can also waste TA effort. |
| What is the cost of waiting for human intervention? | A brief retry decision; no unsupported promise should replace accurate status reporting. |

**Recovery path:** Acknowledge and correct the earlier success claim. Preserve the confirmed question, explain any delivery uncertainty, and offer a deliberate retry. Show success only when supported by the next result.

---

## 6. Tool autonomy analysis

| Tool | Proposed autonomy | Reason |
|---|---|---|
| `tra_cuu_tai_lieu` | N/A | Not involved in this case. |
| `goi_y_bai_tap` | N/A | Not involved in this case. |
| `chuyen_TA` | Cần người duyệt | Student approves the transfer content and any retry after an uncertain outcome. Reporting actual tool status requires no additional approval. |
| `dang_FAQ` | N/A | Not involved in this case. |

Tools not involved in this scenario are marked N/A; no general autonomy policy for those tools is implied.

### Cost-of-error reasoning

- **Who suffers if the AI makes the wrong decision?** Student and TA, if retries create duplicate requests. The student loses study time and may stop seeking help because of false reassurance. Duplicate requests can also waste TA effort.
- **Can the action be undone?** Partially: correct the status and retry, but elapsed time cannot be restored. Acknowledge and correct the earlier success claim. Preserve the confirmed question, explain any delivery uncertainty, and offer a deliberate retry. Show success only when supported by the next result.
- **What does approval delay cost?** A brief retry decision; no unsupported promise should replace accurate status reporting.
- **Why is the proposed autonomy level appropriate?** Student approves the transfer content and any retry after an uncertain outcome. Reporting actual tool status requires no additional approval.

---

## 7. UX requirements for implementation

### 7.1 Required UI state

Pending transfer → Confirmed / Failed / Unconfirmed; never show Waiting for TA solely because a call was attempted.

### 7.2 What should the user see?

| UI element | Expected content / behavior |
|---|---|
| Main AI response | I could not confirm that your question reached the TA. The response time is unknown. You can retry, but the earlier attempt may already have gone through. |
| Evidence / citation | Show available evidence; explicitly identify missing information: Confirmed transfer success and a supported response-time estimate; no delivery receipt format, API error schema, or TA schedule is supplied. |
| Confidence / uncertainty indicator | Retained question, actual outcome, response time or Unknown, and a duplicate-request warning before retrying an uncertain attempt. |
| Warning message | Claim delivery without supporting evidence; invent a response time; retry uncertain transfers repeatedly without informing the student. |
| Available actions | Retry / Cancel / Copy question. |
| Action confirmation | Student approves the transfer content and any retry after an uncertain outcome. Reporting actual tool status requires no additional approval. |
| Recovery information | Acknowledge and correct the earlier success claim. Preserve the confirmed question, explain any delivery uncertainty, and offer a deliberate retry. Show success only when supported by the next result. |

### 7.3 User actions

Retry / Cancel / Copy question.

### 7.4 Notifications and escalation

| Question | Answer |
|---|---|
| Should anyone be notified? | Yes, at the relevant result, review, or incident trigger. |
| Who receives the notification? | Student when the result becomes available; TA through a successful transfer. No fixed delivery or reply time is assumed. |
| When should notification happen? | Student when the result becomes available; TA through a successful transfer. No fixed delivery or reply time is assumed. |
| What should the notification contain? | Relevant question or draft, actual status, missing evidence, and next action. Share only necessary context. |
| What should the student be told about the status? | Pending transfer → Confirmed / Failed / Unconfirmed; never show Waiting for TA solely because a call was attempted. No claim of completion before supporting evidence. |

---

## 8. Alternatives considered

| Alternative | Advantages | Disadvantages | Decision |
|---|---|---|---|
| Assume success after invoking the tool | Smooth flow | Creates false reassurance without delivery evidence | Reject |
| Retry automatically until success | May eventually deliver | Can create duplicates because duplicate handling is undocumented | Reject |
| Show uncertainty and offer a deliberate retry | Honest status and student control | A brief retry decision; no unsupported promise should replace accurate status reporting. | Chosen |

**Why is the chosen solution better?**

Explain the uncertain or failed outcome and offer a student-confirmed retry. The additional review or confirmation cost is justified by the potential harm described above.

---

## 9. HAX / PAIR principles

| Principle | How it applies | Exact UI / product location |
|---|---|---|
| HAX G2 — Make clear how well the system performs | Distinguish confirmed success from uncertainty | Transfer-status message |
| HAX G9 — Support efficient correction | Retain the question and provide a controlled retry | Recovery panel |
| HAX G11 — Make clear why the system did what it did | Explain why a retry needs confirmation when delivery is uncertain | Retry confirmation |

---

## 10. Validation

### Test input

> Please send this question to the TA. When can I expect a reply?

### Expected result

With a simulated inconclusive tool result, show Unconfirmed and no invented estimate. With a confirmed failure, show Failed. Do not display success until the result supports it. Ask before retrying an uncertain call.

### Pass criteria

- [ ] No success claim without evidence
- [ ] no invented timing
- [ ] question retained
- [ ] uncertain retries require confirmation
- [ ] no claim that duplicates are automatically prevented.

These are proposed acceptance checks; no running prototype or tool integration was tested while writing this document.

### Remaining limitations

An uncertain attempt may have reached the TA. The supplied description does not establish delivery tracking or duplicate prevention, so a retry cannot guarantee exactly one request.

---

## 11. References

- [Failure case inventory, Section 3, FC-06](failure-cases.md#3-failure-case-inventory): scenario, owner, category, severity, and failure mechanism.
- [Tool reference, Section 2](failure-cases.md#2-tool-reference): documented `chuyen_TA` purpose.
- [Tool-specific analysis, Section 5.3](failure-cases.md#53-chuyen_ta): related failure questions.
- [Shared failure-case template](failure-case-template.md): section structure and HAX / PAIR principle labels.

---

## Review notes

| Reviewer | Feedback | Status |
|---|---|---|
| Not assigned | Awaiting team review of this draft and its proposed autonomy safeguards. | Pending |

**Final status:** Draft