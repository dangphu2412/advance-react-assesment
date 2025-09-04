# Lazy Load là gì?

Lazy load là một kỹ thuật tối ưu hóa hiệu suất trong phát triển web, đặc biệt là với các ứng dụng lớn hoặc có nhiều trang/tài nguyên. Thay vì tải toàn bộ các trang hoặc module ngay từ đầu, lazy load chỉ tải những phần cần thiết khi người dùng thực sự truy cập đến chúng.

## Lợi ích của lazy load

- **Tăng tốc độ tải trang ban đầu:** Chỉ tải những compoent cần thiết giúp trang hiển thị nhanh hơn.
- **Cải thiện trải nghiệm người dùng:** Ứng dụng phản hồi nhanh hơn, giảm thời gian chờ đợi.
- **Giảm tải cho trình duyệt:** Trình duyệt không phải xử lý quá nhiều mã nguồn cùng lúc, giúp hoạt động mượt mà hơn.

## Ứng dụng trong React

Trong React, lazy load thường được sử dụng để tải các trang (route) hoặc component lớn khi người dùng truy cập, sử dụng `React.lazy` và `Suspense` để thực hiện việc này.
