<br />
<div align="center">
  <h3 align="center">EzQuiz Mobile - Frontend README</h3>

  <h2 align="center">
    Quizzes là công cụ hữu ích cải thiện hiệu quả học tập và mang lại sự hứng thú cho quá trình giảng dạy và học tập.
  </h2>
</div>

![EzQuiz Mobile](https://raw.githubusercontent.com/LeDuy0806/EzQuiz-mobile/main/src/assets/images/logo.png)

Quizzes là một ứng dụng học tập trực tuyến nhằm tạo ra một môi trường học tập tương tác và thú vị cho giáo viên và học sinh, sinh viên. Với Quizzes, giáo viên có thể tạo ra các bài kiểm tra đang dạng. Học sinh tham gia vào các trò chơi trực tuyến và trả lời câu hỏi trong thời gian thực. Ứng dụng giúp đánh giá kiến thức của người dùng, tăng cường sự tham gia và động lực học tập. Việc tự động chấm điểm giúp giáo viên tiết kiệm thời gian và tập trung vào hỗ trợ học sinh.

## Getting Started

Đây là tài liệu hướng dẫn cài đặt và sử dụng Frontend của ứng dụng EzQuiz Mobile. EzQuiz Mobile là một ứng dụng di động cho phép người dùng tham gia các trò chơi câu hỏi trực tuyến và thử thách kiến thức của mình. Ứng dụng này được xây dựng bằng React Native, Redux và Redux Toolkit.

## Yêu cầu hệ thống

-   [Node.js](https://nodejs.org/en/) (phiên bản 18 trở lên)
-   [npm](https://www.npmjs.com/) (phiên bản mới nhất)

### Installation

1. Clone repository:

```
git clone https://github.com/LeDuy0806/EzQuiz-mobile.git
```

2. Move to EzQuiz-mobile:

```
cd EzQuiz-mobile
```

3. Install package:

```
npm install
```

4. Change API in constants/api.js by your IP (để có Api cần clone Backend của Ezquiz tại https://github.com/LeDuy0806/EzQuizz_server)

## Directory structure

-   **src**: Thư mục chứa mã nguồn chính của ứng dụng.
    -   **assets**: Chứa các tài nguyên như hình ảnh, biểu tượng, vv.
    -   **components**: Chứa các thành phần React Native có thể sử dụng lại trong ứng dụng.
    -   **constants**: Chứa các thành phần dùng chung trong hệ thống.
    -   **layouts**: Chứa các layout tạo sẵn.
    -   **navigation**: Cấu hình định tuyến và điều hướng trong ứng dụng.
    -   **slices**: Chứa các tệp tin liên quan đến Redux và quản lý trạng thái ứng dụng.
    -   **styles**: Chứa các tệp tin liên quan đến giao diện.
    -   **screens**: Chứa các màn hình chính của ứng dụng.
    -   **services**: Chứa các dịch vụ cho ứng dụng, chẳng hạn như API.
    -   **utils**: Các tiện ích và hàm hỗ trợ cho ứng dụng.
-   **App.js**: Tệp tin gốc của ứng dụng.

## Cấu hình

## Sử dụng

1. Khởi động dự án bằng ứng dụng Expo go trên điện thoại (làm 1 trong 2 bước 1 và 2):

```
npm start
```

sau đó quét Qr để chạy. 2. Khởi động ứng dụng trên iOS Simulator hoặc an Android Virtual Device:

```
npm run android
```

hoặc

```
npm run ios
```

3. Để có thể đăng nhập vào ứng dụng cần sử dụng Backend tại: https://github.com/LeDuy0806/EzQuizz_server

## Đóng góp

Nếu bạn muốn đóng góp cho dự án EzQuiz Mobile, bạn có thể làm theo các bước sau:

1. Fork dự án này (bằng cách nhấp vào nút "Fork" ở góc phải trên cùng của trang)
2. Clone forked repository của bạn về máy tính của bạn
3. Tạo một nhánh mới từ nhánh `main`
4. Tiến hành thực hiện các thay đổi, sửa lỗi hoặc tính năng mới
5. Commit và push các thay đổi lên repository của bạn
6. Tạo một Pull Request (PR) từ nhánh của bạn vào nhánh `main` của dự án chính

Chúng tôi sẽ xem xét và xem xét các đóng góp của bạn. Xin cảm ơn!

## Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào, hãy liên hệ với chúng tôi qua email: levanduy08062003@gmail.com hoặc FaceBook: https://www.facebook.com/profile.php?id=100024539650227 và https://www.facebook.com/imyady86/.

---

Đây là tài liệu README cho Frontend của ứng dụng EzQuiz Mobile. Nếu bạn có bất kỳ câu hỏi hoặc gặp khó khăn trong quá trình cài đặt hoặc sử dụng ứng dụng, hãy đừng ngần ngại liên hệ với chúng tôi. Chúc bạn có trải nghiệm tuyệt vời với EzQuiz Mobile!
