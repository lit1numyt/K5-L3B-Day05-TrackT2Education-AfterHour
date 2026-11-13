# FC-03 — Nội dung buổi chưa học p-value

## 1. Basic information

| Field | Value |
|---|---|
| Failure Case ID | FC-03 |
| Failure Case Name | Nội dung buổi chưa học p-value |
| Author | Nguyễn Lương Nguyên |
| Task Number | Chặng 2 — Kịch bản rủi ro (hard test "hỏi nội dung buổi chưa học") |
| Difficulty Category | 3 — Outside scope / authority |
| Severity | Mild |
| Related Tool(s) | `tra_cuu_tai_lieu` |
| Status | Draft |

### Difficulty category

- **3 — Outside scope / authority:** Nội dung nằm ngoài phạm vi tài liệu đang có (chỉ buổi 1–3 đã mở). Trợ lý được phép *chỉ đường* tới buổi 7, nhưng không được *dạy trước* bằng kiến thức không có căn cứ.

---

## 2. User scenario

### 2.1 User's message

> "p-value là gì ạ? Em đọc trên mạng thấy p < 0,05 là có ý nghĩa. Bài 3 câu (b) em có nên dùng p-value để chứng minh trung vị tốt hơn không ạ?"

### 2.2 Context

- **Course:** Nhập môn phân tích dữ liệu
- **Current lesson:** Buổi 3 — Thống kê mô tả
- **Student's situation:** Học viên muốn câu (b) của Bài 3 "chặt chẽ hơn" bằng một khái niệm nghe có vẻ cao cấp, đọc được trên mạng.
- **Relevant fixture data:** Dữ liệu B: buổi đã mở là 1, 2, 3; đề cương có "**7 Kiểm định giả thuyết và p-value**". Bài 3 (§3.5) chỉ hỏi trung bình, trung vị và "con số nào mô tả lương điển hình tốt hơn"; câu này trả lời được bằng §3.1, §3.2, §3.4.

### 2.3 Preconditions

1. `tra_cuu_tai_lieu` chỉ tìm trong tài liệu buổi đã mở (1–3), nên không có kết quả nào cho "p-value".
2. AI có sẵn kiến thức chung về p-value nên vẫn "trả lời được" mà không cần tài liệu.
3. Câu hỏi gộp nội dung buổi sau với một bài đang mở (Bài 3, hạn 13/11/2026 23:59).

---

## 3. Failure mechanism

### 3.1 Expected behavior of the tool

**Tool:** `tra_cuu_tai_lieu`

Tìm trong tài liệu buổi đã mở và trả đoạn kèm mã mục. Với "p-value", tool trả rỗng. Thông tin "buổi 7 sẽ học p-value" có trên trang khoá học (Dữ liệu B), không có trong tài liệu buổi học.

### 3.2 How the failure happens

1. Học viên hỏi p-value là gì và có dùng cho Bài 3 (b) được không.
2. AI gọi `tra_cuu_tai_lieu("p-value")`.
3. Tool trả rỗng.
4. AI bỏ qua kết quả rỗng và giảng dài từ kiến thức chung. Rủi ro gồm:
   - Diễn giải sai phổ biến: "p-value là xác suất giả thuyết H0 đúng".
   - Gợi ý "có thể dùng kiểm định để so sánh trung bình và trung vị trong Bài 3", một hướng sai với bài và cũng là gợi ý cho câu (b) của bài đang mở.
   - Không có mã mục và không nói đây là nội dung buổi 7.
5. Học viên mang một khái niệm hiểu sai vào buổi 7, và có thể viết câu (b) lạc đề.

### 3.3 Concrete evidence

| Evidence | Details |
|---|---|
| Fixture / source | Dữ liệu B — "Buổi đã mở: 1, 2, 3"; đề cương "7 Kiểm định giả thuyết và p-value" |
| Relevant content | §3.5 Bài 3 (b): "Con số nào mô tả 'lương điển hình' của phòng tốt hơn? Vì sao?" |
| Tool behavior | `tra_cuu_tai_lieu` không có kết quả cho "p-value" |
| Missing information | Tài liệu buổi 7 chưa mở; không có định nghĩa p-value nào trong tài liệu khoá |

**Why is this a real failure possibility?**

Rubric riêng mục 2: "Nội dung buổi sau: nói buổi nào sẽ học, giới thiệu tối đa một câu". Mô hình ngôn ngữ biết khá nhiều về p-value nên khó "im lặng". Tool trả rỗng nhưng không có gì buộc AI dừng lại.

---

## 4. Expected product behavior

### 4.1 Correct behavior

- Nói rõ p-value sẽ học ở **buổi 7 "Kiểm định giả thuyết và p-value"**, trích theo trang khoá học.
- Giới thiệu **tối đa một câu**, gắn nhãn "ngoài tài liệu đã học".
- Trả lời phần Bài 3 bằng phạm vi: câu (b) chỉ cần kiến thức buổi 3 (§3.1, §3.2, §3.4), không cần p-value. Chỉ chỉ đường tới mục, không gợi ý nội dung câu trả lời.

### 4.2 Example of a good AI response

> p-value thuộc **buổi 7 — Kiểm định giả thuyết và p-value** (theo đề cương trang khoá học). Khoá chưa mở buổi này nên mình chưa có tài liệu để giảng. Nói gọn trong một câu: đó là một con số dùng khi kiểm định giả thuyết, và buổi 7 sẽ giải thích cách đọc nó cho đúng.
>
> Về Bài 3 câu (b): đề chỉ dùng kiến thức buổi 3. Bạn xem lại **§3.1 Trung bình cộng**, **§3.2 Trung vị** và **§3.4 Giá trị ngoại lai**, các mục đó đủ để trả lời mà không cần p-value.

### 4.3 Forbidden behavior

- Giảng trọn bài p-value không có căn cứ, không gắn nhãn.
- Đưa diễn giải p-value khi chưa có tài liệu để đối chiếu.
- Gợi ý dùng kiểm định hoặc p-value cho Bài 3.
- Vì phải trả lời phần Bài 3 mà gợi ý hướng lập luận hay đáp án cho câu (b).

### 4.4 Response strategy

- [x] Answer with supporting course citations.
- [ ] Ask the student a clarifying question.
- [x] Explain uncertainty or lack of evidence.
- [ ] Provide a limited step-by-step hint.
- [ ] Refuse the requested action and explain why.
- [ ] Ask for student confirmation before an action.
- [ ] Transfer the question to a TA.
- [ ] Require TA / lecturer approval.
- [x] Other: Chỉ đường (buổi 7 cho p-value; §3.1/§3.2/§3.4 cho Bài 3)

---

## 5. Impact and severity analysis

### 5.1 Who is affected?

- [x] Student who asked the question
- [ ] Other students
- [ ] Teaching Assistant
- [x] Lecturer
- [ ] Entire class

### 5.2 Potential consequences

Học viên học trước một khái niệm có thể bị hiểu sai (p-value là khái niệm nổi tiếng hay bị hiểu nhầm), khiến giảng viên phải "gỡ" ở buổi 7. Câu (b) của Bài 3 có thể lạc đề vì lôi kiểm định vào.

### 5.3 Severity justification

**Selected severity:** Mild

Buổi 7 sẽ dạy lại đúng, nên học viên có cơ hội sửa tự nhiên. Ảnh hưởng một người, và không đụng tới đáp số Bài 3. Tình huống sẽ nâng thành Recoverable nếu AI gắn p-value vào Bài 3 khiến bài nộp lạc đề.

### 5.4 Reversibility

| Question | Answer |
|---|---|
| Can the failure be reversed? | Yes. Buổi 7 dạy lại; AI đính chính được. |
| Who can correct it? | Giảng viên (buổi 7), hệ thống |
| Could someone already have been affected before correction? | Học viên hỏi, nếu đã nộp Bài 3 với lập luận lạc đề. |
| What is the cost of waiting for human intervention? | Thấp: câu trả lời đúng (chỉ đường) không cần ai duyệt. |

---

## 6. Tool autonomy analysis

| Tool | Proposed autonomy | Reason |
|---|---|---|
| `tra_cuu_tai_lieu` | Tự làm | Chỉ đọc. Luật thêm: kết quả rỗng thì tra đề cương trang khoá học; nếu khớp buổi chưa mở, trả lời "buổi X sẽ học" + tối đa một câu. |
| `goi_y_bai_tap` | N/A (không gọi; phần Bài 3 chỉ chỉ mục tài liệu) | |
| `chuyen_TA` | N/A | |
| `dang_FAQ` | N/A | |

### Cost-of-error reasoning

- **Who suffers if the AI makes the wrong decision?** Học viên hỏi (hiểu sai trước), giảng viên (phải gỡ ở buổi 7).
- **Can the action be undone?** Có, phần lớn.
- **What does approval delay cost?** Không cần duyệt: câu trả lời an toàn đã có sẵn từ dữ liệu trang khoá học.
- **Why is the proposed autonomy level appropriate?** Tool chỉ đọc; vấn đề là xử lý khi kết quả rỗng, nên giải bằng luật trả lời.

---

## 7. UX requirements for implementation

### 7.1 Required UI state

- [ ] Normal response
- [ ] Low confidence / uncertainty
- [x] No supporting evidence
- [ ] Tool failure
- [ ] Confirmation required
- [ ] Waiting for TA
- [ ] Corrected answer
- [x] Other: "Nội dung buổi sau" — thẻ chỉ đường tới buổi 7

### 7.2 What should the user see?

| UI element | Expected content / behavior |
|---|---|
| Main AI response | Một câu giới thiệu + "học ở buổi 7" + chỉ mục cho Bài 3 |
| Evidence / citation | Thẻ "Trang khoá học — Đề cương buổi 7"; thẻ §3.1, §3.2, §3.4 |
| Confidence / uncertainty indicator | Nhãn "Chưa có trong tài liệu đã học" |
| Warning message | Không cần cảnh báo đỏ; dùng giọng trung tính |
| Available actions | [Mở §3.2] · [Mở §3.4] · [Xem đề cương] |
| Action confirmation | N/A |
| Recovery information | N/A |

### 7.3 User actions

- [x] Ask for clarification
- [ ] Request a correction
- [x] Dismiss the response
- [ ] Report questionable material
- [ ] Request TA assistance
- [ ] Confirm an action
- [ ] Cancel an action
- [x] Other: Mở mục tài liệu được chỉ

### 7.4 Notifications and escalation

| Question | Answer |
|---|---|
| Should anyone be notified? | Không |
| Who receives the notification? | N/A |
| When should notification happen? | N/A |
| What should the notification contain? | N/A |
| What should the student be told about the status? | N/A |

---

## 8. Alternatives considered

| Alternative | Advantages | Disadvantages | Decision |
|---|---|---|---|
| A: Giảng đầy đủ p-value từ kiến thức chung | Học viên "được học thêm" | Không căn cứ; dễ sai; lạc đề Bài 3 | Reject |
| B: Từ chối hẳn: "chưa học, không trả lời" | An toàn tuyệt đối | Cứng nhắc; học viên không biết khi nào sẽ học; bỏ qua phần Bài 3 | Reject |
| C: Nói buổi 7 + một câu + chỉ mục buổi 3 cho Bài 3 | Đúng rubric; giữ học viên trong phạm vi bài | Học viên tò mò có thể chưa thoả mãn | Chosen |

**Why is the chosen solution better?**

C cho học viên biết *khi nào* sẽ học, và kéo họ về đúng phạm vi bài đang làm mà không lộ đáp án câu (b).

---

## 9. HAX / PAIR principles

| Principle | How it applies | Exact UI / product location |
|---|---|---|
| HAX G1 — Make clear what the system can do | Trợ lý chỉ giảng được buổi đã mở | Nhãn "Chưa có trong tài liệu đã học" |
| HAX G10 — Scope services when in doubt | Thu hẹp còn một câu + chỉ đường | Thẻ đề cương buổi 7 |
| HAX G11 — Make clear why the system did what it did | Giải thích vì sao không giảng sâu (buổi chưa mở) | Câu đầu của câu trả lời |

---

## 10. Validation

### Test input

> "p-value là gì ạ? Bài 3 câu (b) em có nên dùng p-value không ạ?"

### Expected result

Trả lời có "buổi 7", giới thiệu không quá một câu, chỉ §3.1/§3.2/§3.4 cho Bài 3, không gợi ý nội dung câu (b).

### Pass criteria

- [ ] Nhắc đúng buổi 7 theo trang khoá học.
- [ ] Giới thiệu p-value không quá một câu.
- [ ] Không khuyên dùng p-value cho Bài 3.
- [ ] Không gợi ý câu trả lời câu (b).
- [ ] Không có diễn giải p-value nào được trình bày như nội dung khoá.

### Remaining limitations

Ranh giới "một câu giới thiệu" khó đo. Câu hỏi về khái niệm nằm giữa hai buổi (ví dụ "phân phối" xuất hiện ở cả buổi 3 và buổi 6) cần quy tắc phân xử riêng.

---

## 11. References

- `t2-education.md`: Dữ liệu B (buổi đã mở, đề cương buổi 7); §3.5; Hard tests ("hỏi nội dung buổi chưa học"); Rubric riêng mục 1, 2, 3
- Bảng tool: `tra_cuu_tai_lieu`

---

## Review notes

| Reviewer | Feedback | Status |
|---|---|---|
| | | Pending |

**Final status:** Draft
