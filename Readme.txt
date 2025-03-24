------------Yêu cầu------------
1. Cài đặt môi trường
Node.js (phiên bản >= 14.x)
NPM (được cài đặt cùng với Node.js)
Cài đặt các thư viện phụ thuộc = npm install

2. Chạy server (server.js)
Trước khi sử dụng ứng dụng, cần khởi động server ở file server.js.

Cấu trúc dữ liệu:
- users.json: Lưu trữ thông tin người dùng khi đăng kí/đăng nhập (username, email, password).
- data.json: Lưu trữ thông tin liên hệ qua form thuộc trang contact.html (name, email, message).
- orders.json: Lưu trữ đơn hàng qua form ở chitietsp.html (productName, pricePerItem, quantity, total, customerName, customerPhone, customerAddress, customerNote).

3.Các tính năng chính của ứng dụng:
- Giỏ hàng: Cho phép người dùng thêm, giảm, xóa sản phẩm trong giỏ hàng và xem tổng giá trị.
- Tìm kiếm sản phẩm: Cho phép người dùng tìm kiếm sản phẩm dựa trên tên.
- Đăng nhập và đăng ký: Cho phép người dùng đăng nhập và đăng ký tài khoản mới.
- Chạy ứng dụng:
*** Mở file index.html (hoặc file HTML chính của giao diện web) trong trình duyệt. Bạn có thể mở trực tiếp bằng cách nhấp đúp vào file hoặc sử dụng đường dẫn tương đối của file.

4. Đăng ký và Đăng nhập
- Ứng dụng hỗ trợ chức năng đăng ký và đăng nhập qua các form:

*** Đăng ký:
- Điền thông tin (tên, email, mật khẩu) vào form đăng ký và nhấn Đăng ký.
- Thông tin đăng ký sẽ được gửi đến server thông qua API POST /register.
*** Đăng nhập:
- Điền email và mật khẩu vào form đăng nhập và nhấn Đăng nhập.
- Thông tin đăng nhập sẽ được gửi đến server thông qua API POST /login.
*** Lưu ý:
Các API POST /register và POST /login được xử lý ở server tại localhost:3000

5. Các tính năng giao diện
*** Giỏ hàng:
- Hiển thị sản phẩm: Khi người dùng nhấn nút "Mua", sản phẩm sẽ được thêm vào giỏ hàng.
- Tăng/giảm số lượng: Người dùng có thể thay đổi số lượng sản phẩm trong giỏ hàng.
- Thu nhỏ giỏ hàng: Người dùng có thể thu nhỏ giỏ hàng bằng biểu tượng giỏ hàng ở góc dưới màn hình.
*** Tìm kiếm sản phẩm:
- Tìm kiếm theo từ khóa: Người dùng có thể tìm kiếm sản phẩm bằng cách nhập từ khóa vào hộp tìm kiếm.
*** Đăng nhập/Đăng ký:
Chuyển đổi giữa Đăng nhập và Đăng ký: Người dùng có thể chuyển đổi giữa tab đăng nhập và đăng ký khi nhấn vào các tab tương ứng.

------------Lưu Ý------------
- Đảm bảo rằng server luôn được khởi động trước khi truy cập vào các tính năng đăng ký, đăng nhập, giỏ hàng, hoặc lưu đơn hàng.
- Các file dữ liệu (như users.json, orders.json, data.json) sẽ được tạo tự động khi server chạy lần đầu tiên nếu chưa tồn tại.