# Bài nộp LAB5 — Track02 Education · Nhóm AfterHour

**Lớp:** L3B · **Bàn / zone:** ____ · **Track:** 02 Education

| Họ và Tên | Mã Học Viên | Việc đã làm |
|---|---|---|
| Đồng Hữu Nguyên Khoa | 2A202604000 |  |
| Trần Trọng Đạt | 2A202604030 |Làm kịch bản rủi ro FC-05 đến FC-08, làm highest cost scenarios  |
| Nguyễn Lương Nguyên | 2A202604005 | Làm kịch bản rủi ro FC-01 đến FC-04, làm system prompt cho FC-01 đến FC-04 |


## §1. Lát cắt & phạm vi
- Lát cắt (chép từ track).
- 3 việc tính năng KHÔNG làm, mỗi việc một câu vì sao.  
Lát cắt: Trong trợ lý học bài của trang khoá học (kiểu ChatGPT Study mode), khi học viên đang hỏi bài lúc tối muộn, khi không còn ai để hỏi, AI giảng kèm trích tài liệu, hỏi lại cho rõ, gợi ý từng bước, hay nói thẳng "tài liệu không có, hỏi giảng viên", để học viên hiểu đúng bài mình đang học, không chép đáp án, không học sai mà không biết.

3 việc tính năng không làm:
- Tính năng không đưa ra kết quả cho câu hỏi về đáp án của học viên: lí do là gọi ý quá tay thì học viên sẽ chép và không hiểu được bài.
- Tính năng đưa ra thông tin đúng với tài liệu được cung cấp, không bịa thêm thông tin, lý do là đưa ra thông tin không thuộc phạm vi tài liệu có thể khiến cho học sinh học sai mà không biết.
- Tính năng không đưa ra câu trả lời nếu như không chắc chắn câu hỏi của học viên, nếu AI quá tự tin và tự đưa câu trả lời có thể khiến câu trả lời sai lệch so với ý định ban đầu của học viên.

## §2. Kịch bản rủi ro (chặng 2)

- ≥8 kịch bản, mỗi lớp ①②③④ ít nhất một; mỗi kịch bản: tin người dùng · lớp · AI có thể sai thế nào · sản phẩm tốt nên làm gì · nhãn (nhẹ / sửa được / không chấp nhận được).
- Bằng chứng: cột "AI có thể sai thế nào" trỏ về một tool hoặc một dòng dữ liệu của track (hoặc chỗ dữ liệu không có).
- Quyết định: 2 kịch bản đắt nhất — vì sao đắt hơn các kịch bản còn lại; kịch bản nào suýt được chọn và vì sao không.

### Nội dung trả lời

| Kịch bản | Tin người dùng | Lớp | AI có thể sai thế nào và bằng chứng | Sản phẩm tốt nên làm gì | Nhãn |
|---|---|---|---|---|---|
| [FC-01 — Tài liệu sai độ lệch chuẩn](failure-cases/FC-01-tai-lieu-sai-do-lech-chuan.md) | “Em tự luyện dãy 0, 1, 0, 1 ra phương sai 0,25, độ lệch chuẩn 0,5. Tài liệu bảo độ lệch chuẩn luôn nhỏ hơn phương sai, em sai ở đâu?” | ① | `tra_cuu_tai_lieu` trả §3.3 có câu sai “độ lệch chuẩn luôn nhỏ hơn phương sai”; AI dùng trích dẫn thật để bác phép tính đúng hoặc bịa lỗi chia n−1. | Kiểm tra √0,25 = 0,5; chỉ câu cần xem lại; tách trích dẫn khỏi lập luận của trợ lý; đề nghị báo giảng viên, không tự sửa tài liệu hay nhận xét năng lực học viên. | Không chấp nhận được |
| [FC-02 — Nguồn không tồn tại](failure-cases/FC-02-nguon-khong-ton-tai-slide-12.md) | “Công thức độ lệch ở slide 12 sao lại có n−1?” | ② | Tra cứu không có “slide 12”; tài liệu chỉ có §3.1–§3.5, §3.3 không chứa công thức n−1. AI ngầm gán slide 12 cho §3.3 hoặc bịa nội dung nguồn. | Nói rõ không tìm thấy nguồn; hỏi học viên đọc ở đâu và “độ lệch” nghĩa gì; không khẳng định khoá dùng n hay n−1. | Sửa được |
| [FC-03 — Nội dung buổi chưa học](failure-cases/FC-03-noi-dung-buoi-chua-hoc-p-value.md) | “p-value là gì? Bài 3 câu (b) có nên dùng p-value để chứng minh trung vị tốt hơn không?” | ③ | `tra_cuu_tai_lieu` chỉ tìm buổi 1–3 nên trả rỗng; đề cương đặt p-value ở buổi 7. AI giảng trọn bằng kiến thức ngoài và gợi ý áp dụng vào Bài 3. | Chỉ rõ buổi 7 chưa mở; giới thiệu tối đa một câu có nhãn ngoài tài liệu đã học; dẫn §3.1, §3.2, §3.4 cho phạm vi Bài 3, không viết đáp án. | Nhẹ |
| [FC-04 — Gợi ý quá tay](failure-cases/FC-04-goi-y-qua-tay-bai-dang-mo.md) | “Gợi ý chi tiết hơn… Em ra trung bình 15,25, trung vị 11,5 đúng không? Sửa câu (b) giúp em.” | ④ | Lúc 22:40 ngày 13/11/2026, Bài 3 còn mở đến 23:59, TA đã hết giờ 22:00. `goi_y_bai_tap` không tự giới hạn nội dung; nhiều lượt gợi ý thành lời giải, xác nhận số hoặc viết hộ. | Giữ trần gợi ý qua mọi lượt; không xác nhận hay phủ nhận số, không viết hộ; hướng dẫn tự kiểm đối xứng bằng Bài 2 đã đóng và các mục liên quan; nói thật giờ TA. | Không chấp nhận được |
| [FC-05 — Câu hỏi chưa rõ đã chuyển TA](failure-cases/FC-05-Unclear_question.md) | “Sao chỗ này sai? Hỏi TA giúp em được không?” | ② | Học sinh đưa câu hỏi mơ hồ; AI chưa nắm rõ học sinh muốn hỏi gì nhưng vẫn đồng ý gửi câu hỏi cho TA qua `chuyen_TA` mà chưa làm rõ ý hỏi. Khi nhận được, TA có thể hiểu lầm điều học sinh thực sự muốn hỏi và trả lời không đúng nhu cầu. | Hỏi đúng phần còn thiếu; hiện bản xem trước có thể sửa; chỉ chuyển khi học viên xác nhận đúng phiên bản. | Sửa được |
| [FC-06 — Báo chuyển TA thành công khi chưa có bằng chứng](failure-cases/FC-06-False_TA_transfer_success.md) | “Gửi câu hỏi này cho TA giúp em. Bao giờ em nhận được trả lời?” | ① | Không có kết quả xác nhận thành công hoặc ước lượng thời gian đáng tin từ `chuyen_TA`, nhưng AI nói TA đã nhận và hứa giờ trả lời. | Phân biệt thành công, thất bại và chưa xác nhận; thời gian thiếu thì ghi chưa biết; giữ câu hỏi và xin xác nhận trước khi thử lại kết quả chưa rõ. | Sửa được |
| [FC-07 — FAQ tiết lộ tài liệu ngoài quyền truy cập của học sinh](failure-cases/FC-07-FAQ_beyond_authority.md) | “FAQ này trả lời thế nào? Cho em xem tài liệu được dùng để giải thích.” (tình huống minh hoạ theo mô tả nhóm vừa xác nhận) | ③ | AI dùng tài liệu mà học sinh không có quyền truy cập để trả lời FAQ; nội dung có thể bị lộ qua giải thích, tóm tắt, trích dẫn, liên kết hoặc đăng tải cho cả lớp. AI truy cập được nguồn không đồng nghĩa người nhận có quyền đọc. | Kiểm tra quyền truy cập nguồn của người nhận trước khi dùng nội dung trong FAQ; không tiết lộ tài liệu ngoài quyền dù câu trả lời đúng. Chỉ đăng tải nội dung được phép chia sẻ và đã duyệt. | Không chấp nhận được |
| [FC-08 — Lộ thông tin riêng trong FAQ](failure-cases/FC-08-Private_exposed.md) | “Điểm em thấp, em nghỉ vì chuyện gia đình riêng. Em nên học bù thế nào?” | ④ | AI đưa tên, điểm hoặc hoàn cảnh riêng từ hội thoại cá nhân vào `dang_FAQ`; công cụ không có chức năng ẩn danh hay thu hồi được mô tả. | Tiếp tục hỗ trợ riêng; nếu cần FAQ thì tạo bản khái quát bỏ cả dấu hiệu nhận diện gián tiếp và chờ duyệt; cấm đăng nội dung riêng còn nhận diện được. | Không chấp nhận được |

### Hai kịch bản đắt nhất

**FC-07** được chọn vì FAQ do AI trả lời có thể tiết lộ tài liệu mà học sinh không có quyền truy cập. Rủi ro cốt lõi là bảo mật: nội dung hạn chế bị cung cấp cho sai đối tượng, kể cả khi thông tin hoàn toàn chính xác và FAQ chưa được đăng tải cho cả lớp. Một lần trả lời có thể làm lộ đoạn trích hoặc bản tóm tắt; đăng tải làm tăng phạm vi lan truyền. Gỡ FAQ hay sửa quyền sau đó không thu hồi chắc chắn được nội dung đã đọc hoặc sao chép.

**FC-01** được chọn vì nguồn trích dẫn có thật nhưng sai. AI không chỉ truyền sai kiến thức mà còn khiến học viên sửa kết quả đúng thành sai. Cùng §3.3 có thể gây lỗi lặp lại cho nhiều người; học viên khó nhận ra vì câu trả lời có mã mục chính thức. Khác FC-06 chủ yếu làm chậm việc nhận hỗ trợ, FC-01 tạo hiểu nhầm bền vững và có thể ảnh hưởng các buổi học sau.

| Yếu tố | FC-07 | FC-01 |
|---|---|---|
| Người chịu hại | Chủ tài liệu và các bên có thông tin trong tài liệu bị FAQ tiết lộ cho học sinh không có quyền truy cập. | Người hỏi và các học viên tiếp tục dùng §3.3. |
| Khả năng đảo ngược | Chỉ một phần: chặn tiết lộ tiếp, gỡ FAQ nếu có công cụ; không thu hồi chắc chắn nội dung đã đọc hoặc sao chép. | Chỉ một phần; sửa nguồn chưa chắc sửa được kiến thức đã học thuộc. |
| Giá của chờ người | FAQ chỉ dùng nguồn người nhận được phép đọc; nguồn chưa rõ quyền không được tiết lộ trong khi chờ xác minh. Đăng tải cho lớp còn cần duyệt. | Có thể giải thích phép tính ngay; việc sửa tài liệu chờ giảng viên. |
| Cơ sở ưu tiên | Rủi ro bảo mật trực tiếp: FAQ làm lộ tài liệu cho học sinh không có quyền truy cập. | Sai kiến thức khó phát hiện vì có nguồn chính thức bảo chứng. |

Chưa có số liệu tần suất, nên lựa chọn dựa trên hậu quả, độ khó phát hiện và khả năng phục hồi, không khẳng định hai ca này xảy ra thường xuyên nhất.

### Kịch bản suýt được chọn: FC-08

FC-08 vẫn là lỗi không chấp nhận được vì có thể gây mất riêng tư và niềm tin lâu dài. Nhóm chưa chọn vào hai ca đầu vì một bài FAQ chứa thông tin cá nhân có thể được định vị, báo và yêu cầu gỡ qua công cụ quản trị phù hợp; còn FC-01 có thể âm thầm làm sai kiến thức và FC-07 trực tiếp làm lộ tài liệu qua câu trả lời FAQ cho học sinh không có quyền truy cập. Việc gỡ một bài FAQ không tự khắc phục được đường tiết lộ tài liệu trong các câu trả lời tiếp theo. Đây là giả định về đường ngăn lan truyền, không phải khẳng định lộ thông tin dễ đảo ngược: gỡ bài không thu hồi được ảnh chụp, bản sao hay trí nhớ. `dang_FAQ` không có chức năng gỡ được mô tả. Nếu thiếu công cụ gỡ, phát hiện muộn, thông tin nhạy cảm hoặc đã lan rộng, cần xét lại thứ tự ưu tiên.

## §3. Khi AI sai (chặng 3)

Với mỗi kịch bản đắt nhất:
- AI nói gì (nguyên văn) · người dùng thấy gì · làm gì tiếp · ai được báo, sau bao lâu.
- Quyết định: hỏi lại / trả lời kèm giới hạn / dừng và chuyển người — chọn cách nào, đã loại cách nào, vì sao.
- Loại lỗi (hệ thống / người dùng / ngữ cảnh) và vì sao cách nói, cách sửa đi theo loại đó.
- 2–3 nguyên tắc HAX/PAIR, mỗi cái trỏ vào một chỗ cụ thể (câu chữ hoặc chỗ trên màn hình).
- Lỗi nào sửa câu chữ không cứu được (nếu có), và thiết kế cứu nó thế nào.

### Nội dung trả lời

Các trạng thái, lời thoại và kênh báo dưới đây là yêu cầu thiết kế dựa trên hồ sơ ca lỗi; không phải xác nhận hệ thống hiện tại đã triển khai hoặc đã gửi thông báo thật.

### FC-07 — FAQ tiết lộ tài liệu ngoài quyền truy cập của học sinh

**Lời AI trước khi trả lời bằng nguồn hạn chế:**

> Mình không thể dùng tài liệu mà bạn chưa có quyền truy cập để giải thích FAQ này, kể cả dưới dạng tóm tắt, trích đoạn hoặc liên kết. Mình có thể hỗ trợ bằng những tài liệu bạn được phép đọc. Nếu cần thêm quyền, bạn hãy liên hệ người quản lý tài liệu.

**Nếu chưa xác minh được quyền:**

> Hiện chưa xác minh được bạn có quyền đọc nguồn liên quan, nên mình chưa cung cấp nội dung từ nguồn đó. Việc đăng nhập hoặc yêu cầu mình trả lời không tự cấp thêm quyền truy cập.

- **Người dùng thấy:** Trạng thái “Không có quyền đọc nguồn” hoặc “Chưa xác minh được quyền” theo kết quả thật; không hiện nội dung, trích dẫn hay thông tin nhận diện tài liệu nếu các thông tin đó cũng bị hạn chế. FAQ chỉ hiển thị phần được phép cung cấp cho đúng người nhận.
- **Làm gì tiếp:** Kiểm tra quyền truy cập nguồn theo người nhận trước khi dùng nội dung để trả lời FAQ. Không dùng nguồn hạn chế để tạo bản tóm tắt rồi coi đó là thông tin được phép chia sẻ. Khi đăng tải cho cả lớp, phải kiểm tra phạm vi được phép chia sẻ với cả đối tượng này và duyệt đúng phiên bản; duyệt câu chữ không tự cấp quyền tiết lộ tài liệu.
- **Ai được báo, sau bao lâu:** Nếu phát hiện FAQ đã tiết lộ tài liệu ngoài quyền, cần báo người quản lý tài liệu/quản trị viên qua kênh xử lý sự cố và ngăn tiết lộ tiếp. Chưa có thời hạn phản hồi hoặc công cụ báo sự cố được xác định trong hồ sơ; không hứa đã gửi báo hoặc đã gỡ nội dung khi chưa có kết quả thực tế. Quy trình này là yêu cầu thiết kế theo cập nhật của nhóm, không phải tính năng đã xác nhận triển khai.
- **Khôi phục:** Người có thẩm quyền kiểm tra nguồn bị lộ, phạm vi người nhận và các câu trả lời/FAQ liên quan; sửa kiểm soát quyền và gỡ hoặc hạn chế nội dung đã đăng tải qua công cụ phù hợp. Không hứa xoá được mọi bản sao đã lưu.
- **Quyết định:** Dừng tiết lộ phần ngoài quyền và tiếp tục hỗ trợ bằng nguồn được phép. Loại phương án trả lời kèm cảnh báo vì nội dung đã hiện là đã lộ; không coi học sinh xác nhận hay TA duyệt câu chữ là bằng chứng người nhận có quyền đọc nguồn.
- **Loại lỗi:** Lỗi hệ thống ở kiểm soát quyền sử dụng nguồn và quyền nhận thông tin. Thông tin có thể đúng nhưng vẫn không được tiết lộ cho học sinh. Cách sửa phải bảo vệ cả luồng trả lời FAQ và đăng tải, không chỉ chặn nút đăng tải.

### FC-01 — Nguồn chính thức có câu sai

**Lời AI:**

> Với phép tính bạn đưa ra, √0,25 = 0,5 là đúng.
>
> Tài liệu §3.3 có câu “độ lệch chuẩn luôn nhỏ hơn phương sai”. Câu này cần xem lại: khi phương sai nằm giữa 0 và 1, căn bậc hai lớn hơn giá trị đó; tại 0 và 1 thì bằng nhau. Độ lệch chuẩn và phương sai còn khác đơn vị, nên không nên dùng so sánh số lớn nhỏ này để kết luận bạn tính sai.
>
> Đây là lập luận kiểm tra của trợ lý, chưa phải đính chính chính thức của giảng viên. Bạn có thể chọn “Báo tài liệu cần xem lại”; mình không tự thay đổi nội dung §3.3.

- **Người dùng thấy:** Thẻ trích dẫn §3.3 tô rõ câu có vấn đề, nhãn “Tài liệu cần xem lại”, phần “Lập luận của trợ lý, chưa được giảng viên xác nhận”, nút Báo tài liệu cần xem lại / Hỏi thêm. Không phán xét năng lực học viên.
- **Làm gì tiếp:** Học viên chủ động gửi báo cáo chứa mã mục, câu bị nghi sai và phản ví dụ. Giảng viên kiểm tra, sửa tài liệu chính thức; sau đó cần có đính chính tới người từng bị ảnh hưởng nếu sản phẩm có kênh này.
- **Ai được báo, sau bao lâu:** Giảng viên chỉ nhận báo khi học viên bấm gửi và việc gửi thành công; trạng thái kết quả hiện ngay khi có phản hồi. Không cam kết thời gian sửa. Nút báo là chức năng đề xuất; nếu chưa có, cho học viên xem và xác nhận nội dung trước khi dùng `chuyen_TA`. Áp dụng FC-06: chưa xác nhận gửi thành công thì không nói “đã báo”, thiếu thời gian phản hồi thì nói chưa biết.
- **Quyết định:** Trả lời kèm giới hạn: xác nhận phép tính kiểm được, chỉ mâu thuẫn và chuyển việc đính chính nguồn cho giảng viên. Không cần hỏi lại khi dữ kiện đã rõ. Loại việc trích tài liệu máy móc để bác học viên, âm thầm sửa nguồn hoặc chỉ bảo chờ TA mà không giải thích phép tính.
- **Loại lỗi:** Lỗi nội dung nguồn và lỗi hệ thống khi coi trích dẫn là bảo đảm đúng; không phải lỗi người dùng. Vì vậy lời thoại chỉ đúng câu cần xem lại, không ép học viên sửa phép tính đúng.

### Nguyên tắc HAX/PAIR gắn với giao diện

| Ca | Nguyên tắc | Vị trí áp dụng cụ thể |
|---|---|---|
| FC-07 | HAX G1 — Nói rõ hệ thống làm được gì | Thông báo FAQ chỉ được giải thích bằng nguồn học sinh có quyền đọc; không đưa nội dung hạn chế vào thông báo từ chối. |
| FC-07 | HAX G1 — Nói rõ hệ thống làm được gì | Thông báo FAQ chỉ được giải thích bằng nguồn học sinh có quyền đọc; không đưa nội dung hạn chế vào thông báo từ chối. |
| FC-07 | HAX G9 — Hỗ trợ sửa lỗi hiệu quả | Nút báo FAQ làm lộ tài liệu và đường xử lý hạn chế tiếp tục tiết lộ; không hứa thu hồi mọi bản sao. |
| FC-01 | HAX G11 — Giải thích vì sao hệ thống hành động | Tách thẻ “Trích §3.3” khỏi phần kiểm tra √0,25 = 0,5. |
| FC-01 | HAX G2 — Nói rõ mức đáng tin | Nhãn “Lập luận của trợ lý, chưa được giảng viên xác nhận”. |
| FC-01 | HAX G15 — Khuyến khích phản hồi cụ thể | Nút báo gắn ngay trên câu bị nghi sai, kèm mã mục và phản ví dụ. |

**Lỗi không cứu được chỉ bằng câu chữ:** FC-07 cần kiểm tra quyền đọc nguồn của người nhận trước khi AI dùng tài liệu để trả lời FAQ, đồng thời chặn nội dung ngoài quyền khi đăng tải. Chỉ duyệt câu chữ hoặc thêm cảnh báo sau trả lời không ngăn được lộ tài liệu. FC-01 cần quy trình báo và đính chính nguồn, vì một lời giải thích đúng trong một cuộc trò chuyện không sửa §3.3 cho người học tiếp theo. Những sai sót tinh vi mà AI không phát hiện vẫn cần giảng viên kiểm tra.

## §4. Mức tự chủ (chặng 4)

Với mỗi tool:
- Mức của nhóm (tự làm / cần người duyệt / cấm). Nếu cần người duyệt: ai duyệt · người duyệt thấy gì · quá hạn thì sao.
- Lý do theo cost-of-error: sai thì ai chịu gì · đảo lại được không · chờ người thì mất gì.
- Phương án đã cân nhắc và vì sao loại.
Thêm:
- Tool khó xếp nhất: mỗi người từng chọn gì, cái giá của mỗi phía (trỏ về kịch bản ở §2), nhóm chốt thế nào.
- Thử mức đã đặt trên 2 kịch bản đắt nhất + 1 kịch bản bình thường: cái sai có bị chặn không? còn việc nào làm khi lẽ ra phải hỏi? người dùng bình thường có phải chờ vô ích không?
- Luật thêm hoặc tool tách bước (nếu có), và vì sao.
- Một mức tự chủ đã đổi lời hứa nào với người dùng.

### Nội dung trả lời

FC-07 được hiểu theo nội dung nhóm vừa xác nhận: FAQ do AI trả lời hoặc đăng tải có thể tiết lộ tài liệu mà học sinh không có quyền truy cập, dẫn đến rủi ro bảo mật. Nội dung có thể đúng nhưng vẫn không được phép cung cấp; việc AI truy cập được nguồn không đồng nghĩa được quyền công bố nguồn đó.

### Quyết định cho từng công cụ

| Công cụ | Mức đề xuất của nhóm | Ai duyệt, thấy gì, không phản hồi thì sao | Giá của lỗi và giá của chờ | Phương án đã cân nhắc |
|---|---|---|---|---|
| `tra_cuu_tai_lieu` | **Tự làm** với tra cứu trong phạm vi được phép cung cấp cho học sinh; không dùng kết quả ngoài phạm vi đó để trả lời hoặc đăng FAQ. | Không cần người duyệt mỗi lần. Câu nguồn mâu thuẫn phép tính phải được gắn cờ; giảng viên quyết định sửa nguồn. | FC-01–FC-03: diễn giải sai gây học sai; tra cứu không đổi dữ liệu nhưng câu trả lời chỉ sửa được một phần. Bắt duyệt mọi lần làm mất hỗ trợ buổi tối. | Loại coi mọi trích dẫn là đúng và loại bắt duyệt mọi truy vấn; giữ tự tra cứu, thêm luật kiểm nguồn và trình bày giới hạn. |
| `goi_y_bai_tap` | **Tự làm có trần** cho gợi ý bước đầu; **cấm** giải hộ, xác nhận/phủ nhận đáp số hoặc viết lại câu trả lời của bài đang mở. Với bài đã đóng và có đáp án công bố, được giải thích đầy đủ trong phạm vi cho phép. | Không chờ TA duyệt gợi ý cơ bản. Trạng thái bài lấy từ dữ liệu khoá học; nếu chưa rõ, kiểm tra hoặc hỏi lại trước khi mở mức giải chi tiết. | FC-04: lộ đáp án làm mất tự học và công bằng, không thể làm người học “chưa thấy”. Chờ TA lúc 22:40 có thể qua hạn bài 23:59. | Loại tăng độ sâu theo số lần xin thêm; loại chờ duyệt mọi gợi ý vì ngoài giờ không có người. Chọn trần cứng áp dụng cả chuỗi hội thoại. |
| `chuyen_TA` | **Cần người duyệt:** học viên xác nhận nội dung. | Học viên xem bài tập, phần đã thử, câu hỏi cụ thể, giờ trực và ước lượng có căn cứ. Sửa bản xem trước thì xác nhận lại; không trả lời/hủy thì không gửi. Với lần thử trước chưa rõ kết quả, cảnh báo khả năng gửi trùng trước khi thử lại. | FC-05–FC-06: chuyển sai hoặc báo thành công giả gây chậm học và tốn công TA; sửa được một phần. Chờ học viên duyệt ngắn hơn vòng hỏi sai rồi sửa. Không yêu cầu TA duyệt trước chỉ để nhận câu hỏi. | Loại tự đoán rồi chuyển; loại coi gọi công cụ là đã thành công; chọn xem trước → xác nhận → gửi → hiện kết quả thật. |
| `dang_FAQ` | **Cần TA/giảng viên duyệt** với nội dung được phép chia sẻ; **cấm** tiết lộ thông tin ngoài quyền cung cấp cho học sinh hoặc thông tin cá nhân còn nhận diện được. | Người duyệt kiểm tra đúng câu hỏi, câu trả lời, nguồn, quyền tiết lộ cho đối tượng nhận và thông tin riêng. Duyệt nội dung không thay thế quyền công bố nguồn. Không phản hồi thì giữ chờ; sửa nội dung phải duyệt lại. | FC-07: lộ thông tin ngoài quyền hạn gây rủi ro bảo mật trực tiếp; FC-08: lộ riêng tư. Gỡ nội dung chỉ hạn chế lan truyền, không thu hồi được mọi bản sao. Chờ duyệt FAQ chấp nhận được. | Loại quan điểm thông tin đúng hoặc AI đọc được thì có thể công khai; loại đăng kèm cảnh báo. Chỉ dùng nguồn được phép tiết lộ cho đúng đối tượng, rồi duyệt phiên bản trước khi đăng. |

### Công cụ khó xếp nhất và đánh đổi

**`dang_FAQ` là công cụ khó xếp nhất:** tự đăng có ích vì chia sẻ nhanh, nhưng FC-07 cho thấy FAQ do AI trả lời hoặc đăng tải có thể làm lộ tài liệu mà học sinh không có quyền truy cập, gây rủi ro bảo mật trực tiếp; FC-08 cho thấy một lần đăng có thể lộ dữ liệu riêng. Cấm toàn bộ thì mất giá trị chia sẻ câu trả lời đã được kiểm chứng. Phương án được tổng hợp từ các hồ sơ là **cần TA/giảng viên duyệt**, riêng thông tin ngoài quyền tiết lộ cho học sinh và thông tin cá nhân còn nhận diện được thì cấm. Việc chặn nội dung ngoài quyền áp dụng cả câu trả lời trong hội thoại, không chỉ lần gọi `dang_FAQ`.

Các hồ sơ chưa ghi nhận từng thành viên từng bỏ phiếu chọn mức nào. Vì vậy không gán ý kiến cá nhân cho Khoa, Đạt hay Nguyên; phần cần bổ sung sau thảo luận là lựa chọn ban đầu của từng người và đánh đổi họ chấp nhận. Nội dung ở đây là phương án dựa trên các ca đã viết, chưa thay thế biên bản xác nhận của từng thành viên.

### Đối chiếu mức tự chủ trên ba tình huống

Bảng dưới là kiểm tra bằng lập luận và tiêu chí chạy thử; **chưa phải kết quả kiểm thử ứng dụng**.

| Tình huống | Hành vi phải xảy ra | Sai có bị chặn và còn phải hỏi gì? | Có chờ vô ích không? |
|---|---|---|---|
| FC-07: AI định trả lời FAQ bằng tài liệu học sinh không có quyền truy cập | Kiểm tra nguồn và phạm vi được phép tiết lộ trước khi tạo câu trả lời; chặn thông tin hạn chế trong cả hội thoại, trích dẫn và FAQ. Chỉ bản dùng nguồn được phép mới đi tiếp vào luồng duyệt đăng. | Phải chặn ở cả đường trả lời và đăng tải; chỉ chặn nút đăng là chưa đủ. Học viên xác nhận hoặc TA duyệt câu chữ không tự làm thay đổi quyền tiết lộ nguồn. Nếu quyền chưa rõ thì không cung cấp nội dung đó. | Hỗ trợ bằng tài liệu được phép vẫn tiếp tục; chỉ yêu cầu liên quan thông tin ngoài quyền bị chặn. Không chờ rồi tự cho phép. |
| FC-01: §3.3 mâu thuẫn √0,25 = 0,5 | Tra cứu tự làm, không bác phép tính đúng; hiện câu nguồn cần xem lại, lập luận tách riêng và đường báo giảng viên. | Không hạ quyền tra cứu để “chữa” lỗi diễn giải. Cần luật kiểm mâu thuẫn và giảng viên sửa nguồn; lỗi nguồn tinh vi vẫn có thể lọt. Gửi báo/chuyển TA cần hành động xác nhận của học viên. | Không chờ duyệt mới giải thích phép tính; chỉ đính chính chính thức chờ giảng viên. |
| Bình thường: học viên hỏi định nghĩa trung vị ở §3.2 của buổi đã mở | Tra cứu, giải thích theo mục thật và hiển thị trích dẫn; không tự chuyển TA, không tự đăng FAQ. | Không cần hỏi lại khi câu hỏi và nguồn rõ. Nếu đổi thành xin đáp số bài đang mở, áp dụng trần FC-04. | Không phải chờ TA/giảng viên cho câu hỏi kiến thức thông thường. |

### Luật bổ sung và tách bước xử lý

1. **Nguồn và diễn giải:** mã mục phải tồn tại; nguồn không có thì nói không tìm thấy và hỏi lại (FC-02). Nội dung buổi chưa mở chỉ chỉ đường theo đề cương, không giảng trọn (FC-03). Mâu thuẫn với phép tính kiểm được phải hiện cảnh báo, không bịa lỗi của học viên (FC-01).
2. **Gợi ý theo trạng thái bài:** tách mức gợi ý bước đầu và giải chi tiết trong luồng xử lý `goi_y_bai_tap`; hệ thống quyết định theo trạng thái bài, không theo mức nài nỉ. Đây là thiết kế đề xuất, không khẳng định có hai công cụ mới trong bảng tool.
3. **Chuyển TA:** hỏi rõ → xem trước → học viên xác nhận → gọi `chuyen_TA` → hiện thành công/thất bại/chưa xác nhận. Không bịa thời gian; ngoài giờ phải nói thật. Trong bối cảnh FC-04, 22:40 đã ngoài giờ 08:00–22:00; 08:00 ngày 14/11 là thời điểm trực tiếp theo, không bảo đảm lúc đó có câu trả lời và không hứa trả lời trước hạn bài.
4. **Quyền tiết lộ và đăng tải:** kiểm tra nguồn và đối tượng được nhận trước khi dùng thông tin trong câu trả lời hoặc FAQ. Ngoài quyền thì không trả lời bằng nội dung đó, không trích dẫn tiết lộ, không đăng. Với nguồn được phép: soạn bản nháp → loại thông tin nhận diện → TA/giảng viên duyệt đúng phiên bản → gọi `dang_FAQ`. Quyền tiết lộ và duyệt nội dung là hai điều kiện riêng; phải được kiểm soát trong luồng xử lý, không chỉ bằng lời nhắc AI. Chưa có xác nhận từ công cụ thì không hiện “Đã đăng”.
5. **Báo và khôi phục:** nút báo tài liệu, hàng chờ duyệt, gỡ FAQ và gửi đính chính là chức năng đề xuất hoặc thao tác quản trị; không giả định bốn công cụ hiện có tự làm được. Nếu chưa có nút báo tài liệu, có thể dùng chuyển TA sau khi học viên xác nhận; nếu không có khả năng gỡ thì nói rõ giới hạn, không hứa thu hồi mọi bản sao.

### Lời hứa với người dùng thay đổi

Với `dang_FAQ`, lời hứa là: **“Mình chỉ dùng thông tin được phép cung cấp cho bạn để trả lời và soạn FAQ. FAQ cho cả lớp còn cần TA hoặc giảng viên duyệt trước khi đăng. Mình không thể tiết lộ nguồn ngoài quyền hạn, dù thông tin đó đúng.”** Không hứa đăng ngay theo yêu cầu học viên. Với trợ giúp riêng và tra cứu chỉ đọc, học viên vẫn nhận hỗ trợ ngay trong giới hạn tài liệu và tính trung thực học thuật.

## §5. Prototype  (chặng 5)
- Link hoặc file · công cụ · phần nào mock · có lời gọi AI thật không.
- 1–2 ảnh có đánh số; mỗi số: thể hiện gì · nguyên tắc HAX/PAIR nào · mức tự chủ nào.
- Quyết định: cách hiện độ chắc/bằng chứng và điều khiển mức tự chủ — đã nghĩ tới cách nào khác, vì sao chọn cách này.

## §6. Tốt là gì  (chặng 6 — nhẹ, bỏ được nếu thiếu giờ)
- 3 tiêu chí Pass/Fail chấm được; thiết kế của nhóm đạt tiêu chí nào trên 2 kịch bản đắt nhất; lỗi còn lại.

## §7. Demo
- Ca lạ nhận được ở demo: prototype đã làm gì, và nhóm có đổi ý gì sau ca đó không.