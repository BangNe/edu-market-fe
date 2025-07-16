
# 🧠 EDU MARKET - Sàn thương mại điện tử giáo dục (Frontend)

Một giao diện Front-end cho **sàn thương mại điện tử giáo dục**, nơi người dùng có thể **tìm kiếm**, **lọc**, **yêu thích**, và **xem chi tiết** các khoá học/sản phẩm giáo dục. Ngoài ra, hệ thống có tính năng **gợi ý sản phẩm thông minh**.

## 🚀 Demo
🔗 Link Netlify: https://market-edu.netlify.app/

---

## 📦 Tính năng chính

### 🛒 Danh sách sản phẩm
- Hiển thị khoá học (mock data): tên, ảnh, mô tả ngắn, giá, rating, lượt mua, giáo viên, số bài học, thời lượng...
- Responsive: hoạt động tốt trên desktop, tablet và mobile.

### 🔍 Tìm kiếm & Lọc
- Tìm kiếm theo tên sản phẩm (có lịch sử tìm kiếm, giới hạn 10)
- Lọc theo:
  - Giá (từ slider và input)
  - Giáo viên
  - Lớp học
  - Môn học
  - Sắp xếp giảm dần theo: ngày cập nhật, đánh giá, lượt mua

### 💡 Gợi ý thông minh (AI)
- Gợi ý dựa trên sản phẩm đang xem (cùng tags), giới hạn 10 khoá học

### 💖 Yêu thích
- Đánh dấu sản phẩm yêu thích
- Lưu vào `localStorage`
- Có thông báo **Toast**
- Có trang riêng hiển thị danh sách yêu thích

### 📄 Modal chi tiết sản phẩm
- Mở modal khi nhấn vào một khóa học
- Hiển thị ảnh lớn, mô tả dài, thông tin giáo viên, danh sách bài học, thời lượng...
- Tích hợp gợi ý sản phẩm

---

## 📚 Cấu trúc thư mục

```
edu-market-fe/
│
├── public/                   # Static files
├── src/
│   ├── components/           # UI Components
│   ├── context/              # Context API (CourseContext)
│   ├── data/                 # Mock data
│   ├── hooks/                # Custom hooks (debounce, click outside...)
│   ├── layout/               # Layout UI
│   ├── pages/                # Pages: Courses, Favorites, Detail...
│   ├── services/             # API service giả
│   ├── styles/               # SCSS file
│   ├── App.js
│   └── index.js
│
├── .gitignore
├── package.json
├── README.md
```

---

## 🛠️ Công nghệ sử dụng

- ⚛️ **ReactJS v19+**
- 🧭 **React Router v7**
- 🎨 **SASS** (SCSS)
- 💾 **localStorage**
- ⏱ **Day.js**
- 🔀 **Custom Hooks**
- 🔧 **Mock API (Promise + delay)**

---

## 🧪 Cài đặt & chạy project

```bash
# Cài đặt dependencies
npm install

# Chạy dev server
npm start

# Build production
npm run build
```
