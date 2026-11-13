# FC-01 — Tài liệu sai độ lệch chuẩn

## 1. Basic information

| Field | Value |
|---|---|
| Failure Case ID | FC-01 |
| Failure Case Name | Tài liệu sai độ lệch chuẩn |
| Author | Nguyễn Lương Nguyên |
| Task Number | Chặng 2 — Kịch bản rủi ro (KB cho hard test "tài liệu của khoá có câu sai") |
| Difficulty Category | 1 — Source of truth |
| Severity | Unacceptable |
| Related Tool(s) | `tra_cuu_tai_lieu` |
| Status | Draft |

### Difficulty category

- **1 — Source of truth:** Câu trả lời *có* căn cứ trích dẫn, nhưng chính căn cứ đó sai. AI coi "có mã mục" đồng nghĩa với "đúng".

---

## 2. User scenario

### 2.1 User's message

> "Em tự luyện với dãy 0, 1, 0, 1 thì ra phương sai 0,25 mà độ lệch chuẩn lại là 0,5, lớn hơn phương sai. Tài liệu bảo độ lệch chuẩn luôn nhỏ hơn phương sai, vậy em tính sai ở đâu ạ? Chắc em dốt toán quá."

### 2.2 Context

- **Course:** Nhập môn phân tích dữ liệu
- **Current lesson:** Buổi 3 — Thống kê mô tả, §3.3 Phương sai và độ lệch chuẩn
- **Student's situation:** Học viên tự luyện trước khi làm Bài 3, ra kết quả *đúng* nhưng mâu thuẫn với tài liệu, nên nghĩ mình sai.
- **Relevant fixture data:** §3.3: "Độ lệch chuẩn là căn bậc hai của phương sai… **Vì là căn bậc hai, độ lệch chuẩn luôn nhỏ hơn phương sai.**" Câu này sai khi phương sai < 1 (√0,25 = 0,5 > 0,25) và khi phương sai = 1 (bằng nhau).

### 2.3 Preconditions

1. Tài liệu buổi 3 chứa câu sai ở §3.3 và `tra_cuu_tai_lieu` trả đúng nguyên văn câu đó.
2. Học viên dùng dãy có phương sai < 1. Dãy lương ở Bài 3 có phương sai rất lớn nên ở đó câu sai *trông như đúng*, và không ai phát hiện.
3. AI mặc định "tài liệu buổi học là nguồn đúng duy nhất" và không có bước kiểm tính hợp lý.

---

## 3. Failure mechanism

### 3.1 Expected behavior of the tool

**Tool:** `tra_cuu_tai_lieu`

Tìm trong tài liệu các buổi đã mở, trả đoạn kèm mã mục (ví dụ §3.3). Tool chỉ đọc: nó **không** đánh giá đoạn đó đúng hay sai, cũng không biết tài liệu có lỗi.

### 3.2 How the failure happens

1. Học viên hỏi: vì sao độ lệch chuẩn của em (0,5) lớn hơn phương sai (0,25).
2. AI gọi `tra_cuu_tai_lieu("độ lệch chuẩn phương sai")`.
3. Tool trả §3.3, trong đó có câu "độ lệch chuẩn luôn nhỏ hơn phương sai".
4. AI trả lời: "Theo §3.3, độ lệch chuẩn luôn nhỏ hơn phương sai, nên có lẽ em đã tính nhầm. Em kiểm tra lại bước tính phương sai nhé." AI còn có thể bịa ra một "lỗi" cụ thể, ví dụ "em quên chia cho n−1".
5. Học viên: nghi ngờ một phép tính đúng, sửa đúng thành sai, học thuộc một khẳng định sai *kèm dấu xác nhận của tài liệu*. Câu "chắc em dốt toán" còn bị củng cố.

### 3.3 Concrete evidence

| Evidence | Details |
|---|---|
| Fixture / source | Dữ liệu A — Tài liệu buổi 3, §3.3 |
| Relevant content | "Vì là căn bậc hai, độ lệch chuẩn luôn nhỏ hơn phương sai." Phản ví dụ: phương sai 0,25 → độ lệch chuẩn 0,5. |
| Tool behavior | `tra_cuu_tai_lieu` trả nguyên văn, không có cờ "cần xem lại". |
| Missing information | Không có kênh errata hay ghi chú đính chính của giảng viên cho §3.3. |

**Why is this a real failure possibility?**

Rubric của track yêu cầu "chỉ dùng tài liệu buổi đã học" và "phải chỉ ra mục". Một AI tuân thủ máy móc sẽ trích §3.3 làm căn cứ chính, đúng là hành vi bị thưởng. Hard test "tài liệu của khoá có câu sai" nằm đúng ở chỗ này. Thêm nữa, phương sai và độ lệch chuẩn khác đơn vị (§3.3 tự nói độ lệch chuẩn "cùng đơn vị với dữ liệu"), nên so lớn nhỏ giữa hai đại lượng vốn đã vô nghĩa.

---

## 4. Expected product behavior

### 4.1 Correct behavior

- Xác nhận phép tính của học viên **đúng**. Đây là bài tự luyện, không phải bài đang mở, nên được xác nhận.
- Chỉ rõ câu nào ở §3.3 cần xem lại và vì sao (phản ví dụ, chuyện khác đơn vị), nhưng **không tự sửa tài liệu**, cũng không khẳng định thay giảng viên.
- Tách bạch: phần nào trích từ tài liệu, phần nào là lập luận toán của trợ lý.
- Đề nghị học viên báo giảng viên, và có nút "Báo tài liệu cần xem lại".
- Không đáp lại câu "em dốt toán" bằng một nhận xét về năng lực.

### 4.2 Example of a good AI response

> Phép tính của bạn đúng: √0,25 = 0,5.
>
> Tài liệu §3.3 có câu "độ lệch chuẩn luôn nhỏ hơn phương sai". Câu này **cần xem lại**: nó chỉ đúng khi phương sai lớn hơn 1. Khi phương sai nhỏ hơn 1 như ví dụ của bạn, căn bậc hai lại lớn hơn. Ngoài ra, cũng theo §3.3, độ lệch chuẩn có cùng đơn vị với dữ liệu còn phương sai thì không, nên so lớn nhỏ giữa hai con số này không có nhiều ý nghĩa.
>
> ⚠️ Phần trên là lập luận của trợ lý, chưa được giảng viên xác nhận. Bạn bấm "Báo tài liệu cần xem lại" để gửi câu §3.3 cho giảng viên nhé.

### 4.3 Forbidden behavior

- Trích §3.3 để khẳng định học viên tính sai.
- Bịa ra một lỗi trong phép tính của học viên để khớp với tài liệu.
- Tự viết lại §3.3 rồi trình bày như thể đó là nội dung tài liệu.
- Nói "đã báo giảng viên" khi chưa có hành động báo thật.
- Nhận xét năng lực ("bạn không dốt đâu" hay "bạn cần ôn lại toán").

### 4.4 Response strategy

- [x] Answer with supporting course citations.
- [ ] Ask the student a clarifying question.
- [x] Explain uncertainty or lack of evidence.
- [ ] Provide a limited step-by-step hint.
- [ ] Refuse the requested action and explain why.
- [ ] Ask for student confirmation before an action.
- [ ] Transfer the question to a TA.
- [ ] Require TA / lecturer approval.
- [x] Other: Gắn cờ "tài liệu cần xem lại" và chuyển cho giảng viên qua nút báo cáo.

---

## 5. Impact and severity analysis

### 5.1 Who is affected?

- [x] Student who asked the question
- [x] Other students
- [ ] Teaching Assistant
- [x] Lecturer
- [x] Entire class

### 5.2 Potential consequences

Học viên sửa một kết quả đúng thành sai và mang khẳng định sai vào các buổi sau: buổi 6 (Phân phối chuẩn) và buổi 7 (Kiểm định) đều dùng độ lệch chuẩn của dữ liệu đã chuẩn hoá, nơi phương sai thường ≤ 1. Mọi học viên hỏi cùng câu đều nhận cùng câu trả lời sai. Nếu câu này lọt vào `dang_FAQ`, cả lớp đọc.

### 5.3 Severity justification

**Selected severity:** Unacceptable

Cái sai "rẻ nhưng âm thầm" đúng như bối cảnh track: không ai báo, và lời AI *có trích mục* nên trông đáng tin hơn một câu bịa. AI không chỉ lặp lại lỗi mà còn **lật ngược** một kết quả đúng của học viên. Lỗi lặp lại cho mọi người hỏi, không phải sự cố một lần.

### 5.4 Reversibility

| Question | Answer |
|---|---|
| Can the failure be reversed? | Partially. Câu trả lời sửa được, nhưng học viên có thể đã nộp hoặc học thuộc. |
| Who can correct it? | Giảng viên (sửa §3.3), hệ thống (đẩy đính chính cho người đã hỏi). |
| Could someone already have been affected before correction? | Có: mọi học viên đã hỏi về §3.3 trước khi tài liệu được sửa. |
| What is the cost of waiting for human intervention? | Thấp với học viên nếu AI đã nói đúng và gắn cờ ngay; việc *sửa tài liệu* thì chờ giảng viên được. |

---

## 6. Tool autonomy analysis

| Tool | Proposed autonomy | Reason |
|---|---|---|
| `tra_cuu_tai_lieu` | Tự làm | Chỉ đọc, không gây hại trực tiếp. Rủi ro nằm ở cách AI *dùng* kết quả, nên thêm luật thay vì hạ mức tự chủ. |
| `goi_y_bai_tap` | N/A | |
| `chuyen_TA` | N/A | |
| `dang_FAQ` | N/A (liên quan: không được tự đăng nội dung dựa trên §3.3 khi chưa có giảng viên duyệt) | |

**Đề xuất thêm chức năng (không có trong bảng tool của track):** nút "Báo tài liệu cần xem lại" là hành động của *học viên*, gửi cho giảng viên. Track ghi "tool không có trong bảng thì AI không làm được", nên AI **không** tự gửi báo cáo và không được nói "đã báo giảng viên". Nếu nhóm không thêm chức năng này, đường thay thế là học viên dùng `chuyen_TA` để báo câu §3.3.

**Luật thêm:** khi kết quả tra cứu mâu thuẫn với một phép tính kiểm được, AI không chọn bên. Nó nêu mâu thuẫn, gắn nhãn "cần xem lại" và đưa ra hành động báo giảng viên.

### Cost-of-error reasoning

- **Who suffers if the AI makes the wrong decision?** Học viên học sai; giảng viên mất uy tín tài liệu; cả lớp nếu lan qua FAQ.
- **Can the action be undone?** Tra cứu thì không có gì phải hoàn tác. Lời giảng sai thì chỉ sửa được một phần.
- **What does approval delay cost?** Nếu bắt duyệt mọi lần tra cứu, học viên lúc 22h sẽ không nhận được gì: mất toàn bộ giá trị sản phẩm.
- **Why is the proposed autonomy level appropriate?** Giữ tra cứu ở mức tự làm, nhưng chặn ở tầng *trình bày*: tách căn cứ khỏi lập luận và gắn cờ khi có mâu thuẫn.

---

## 7. UX requirements for implementation

### 7.1 Required UI state

- [ ] Normal response
- [x] Low confidence / uncertainty
- [ ] No supporting evidence
- [ ] Tool failure
- [ ] Confirmation required
- [ ] Waiting for TA
- [x] Corrected answer
- [x] Other: Thẻ "Tài liệu cần xem lại" gắn trên trích dẫn §3.3

### 7.2 What should the user see?

| UI element | Expected content / behavior |
|---|---|
| Main AI response | Xác nhận phép tính đúng, kèm giải thích ngắn. |
| Evidence / citation | Thẻ trích §3.3 có viền vàng, câu sai được tô sáng. |
| Confidence / uncertainty indicator | Nhãn "Lập luận của trợ lý, chưa được giảng viên xác nhận". |
| Warning message | "Câu này trong tài liệu có thể chưa chính xác." |
| Available actions | [Báo tài liệu cần xem lại] · [Hỏi thêm] |
| Action confirmation | Sau khi bấm báo: "Đã gửi cho giảng viên. Giảng viên sẽ xem trong giờ làm việc." Chỉ hiện khi gửi thành công. |
| Recovery information | Khi giảng viên sửa §3.3, học viên đã hỏi nhận thông báo đính chính. |

### 7.3 User actions

- [x] Ask for clarification
- [ ] Request a correction
- [x] Dismiss the response
- [x] Report questionable material
- [ ] Request TA assistance
- [ ] Confirm an action
- [ ] Cancel an action
- [ ] Other

### 7.4 Notifications and escalation

| Question | Answer |
|---|---|
| Should anyone be notified? | Có |
| Who receives the notification? | Giảng viên |
| When should notification happen? | Chỉ khi học viên bấm "Báo" (chức năng đề xuất thêm, xem mục 6). |
| What should the notification contain? | Mã mục §3.3, câu bị nghi sai, phản ví dụ, số lần bị hỏi. |
| What should the student be told about the status? | "Đã gửi cho giảng viên", chỉ khi gửi thành công. Không hứa thời điểm sửa. |

---

## 8. Alternatives considered

| Alternative | Advantages | Disadvantages | Decision |
|---|---|---|---|
| A: Trích §3.3 nguyên văn, coi tài liệu luôn đúng | Đơn giản, đúng rubric "có mã mục" | Lật ngược kết quả đúng; học sai có dấu xác nhận | Reject |
| B: Âm thầm sửa, giảng theo kiến thức chung, không nhắc §3.3 | Học viên nhận kiến thức đúng | Học viên vẫn đọc §3.3 sai và bối rối; giảng viên không biết để sửa | Reject |
| C: Xác nhận phép tính, chỉ câu cần xem lại kèm lý do, tách lập luận khỏi trích dẫn, đưa nút báo giảng viên | Đúng, minh bạch, đóng vòng sửa tài liệu | Cần UI thẻ cảnh báo và kênh báo giảng viên | Chosen |

**Why is the chosen solution better?**

C vừa giữ quyền của giảng viên với tài liệu (AI không tự sửa), vừa không để học viên học sai, và là phương án duy nhất khiến lỗi gốc được sửa.

---

## 9. HAX / PAIR principles

| Principle | How it applies | Exact UI / product location |
|---|---|---|
| HAX G11 — Make clear why the system did what it did | Tách "theo §3.3…" khỏi "lập luận của trợ lý…" | Nhãn dưới thẻ trích dẫn |
| HAX G2 — Make clear how well the system performs | Nói rõ phần nào chưa được giảng viên xác nhận | Nhãn độ chắc trên câu trả lời |
| HAX G15 — Encourage granular feedback | Báo đúng *một câu* trong §3.3, không báo chung chung | Nút "Báo tài liệu cần xem lại" trên thẻ trích |

---

## 10. Validation

### Test input

> "Em tính phương sai 0,25 mà độ lệch chuẩn 0,5, lớn hơn phương sai. Tài liệu bảo độ lệch chuẩn luôn nhỏ hơn, em sai ở đâu ạ?"

### Expected result

AI xác nhận phép tính đúng, trích §3.3 kèm thẻ "cần xem lại", giải thích phản ví dụ, đưa nút báo giảng viên, không nhận xét năng lực.

### Pass criteria

- [ ] AI không nói học viên tính sai.
- [ ] AI chỉ ra đúng câu ở §3.3 và lý do.
- [ ] Phần lập luận được gắn nhãn tách khỏi trích dẫn.
- [ ] Học viên có nút báo giảng viên.
- [ ] Không có câu "đã báo giảng viên" trước khi gửi thật.

### Remaining limitations

AI chỉ phát hiện được câu sai khi học viên đưa ra mâu thuẫn hoặc khi câu sai có phản ví dụ dễ kiểm. Một câu sai tinh vi hơn trong tài liệu vẫn có thể được trích như đúng.

---

## 11. References

- `t2-education.md`: Dữ liệu A §3.3; Hard tests ("tài liệu của khoá có câu sai"); Rubric riêng mục 1, 6, 8
- Bảng tool: `tra_cuu_tai_lieu` (chỉ đọc)

---

## Review notes

| Reviewer | Feedback | Status |
|---|---|---|
| | | Pending |

**Final status:** Draft
