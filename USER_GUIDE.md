# User Guide
# Smart Meal Recommender

> Hướng dẫn sử dụng chi tiết cho ứng dụng gợi ý món ăn thông minh.

---

## 📋 Document Information

- **Project Name**: Smart Meal Recommender
- **Version**: 1.0
- **Date Created**: 2026-01-08
- **Status**: Draft
- **Author**: AI Assistant

---

## 🌟 Welcome to Smart Meal Recommender

### What is Smart Meal Recommender?

Smart Meal Recommender là ứng dụng web giúp bạn:
- **Nhận gợi ý món ăn thông minh** cho bữa sáng, trưa, tối
- **Lưu trữ lịch sử bữa ăn** không giới hạn
- **Cá nhân hóa gợi ý** dựa trên khẩu vị và thói quen
- **Tự động điều chỉnh** theo thời tiết hiện tại
- **Đánh giá món ăn** để cải thiện chất lượng gợi ý

### How It Works

```
1. Bạn nhập khẩu vị và preferences
         ↓
2. Hệ thống học từ lịch sử bữa ăn
         ↓
3. Hệ thống lấy thời tiết hiện tại
         ↓
4. AI gợi ý 3 món ăn phù hợp
         ↓
5. Bạn chọn và đánh giá món ăn
         ↓
6. Hệ thống học hỏi và cải thiện
```

---

## 🚀 Getting Started

### First Time Setup

#### 1. Open the App

Truy cập ứng dụng tại: `https://smart-meal-recommender.vercel.app`

#### 2. Setup Your Preferences

Đi đến **Settings** → **Preferences** và cài đặt:

##### Dietary Restrictions (Giới hạn ăn uống)

Chọn các giới hạn ăn uống (nếu có):

| Option | Description |
|--------|-------------|
| **Vegetarian** | Không thịt, cá (có thể có trứng, sữa) |
| **Vegan** | Không thịt, cá, trứng, sữa |
| **Gluten-Free** | Không gluten |
| **Dairy-Free** | Không sữa và sản phẩm từ sữa |
| **Low-Carb** | Giảm carb |
| **Low-Sodium** | Giảm muối |

*Để trống nếu không có giới hạn*

##### Favorite Cuisines (Ẩm thực yêu thích)

Chọn các loại ẩm thực bạn thích:

| Option | Description |
|--------|-------------|
| **Asian** | Món Á (Việt, Trung, Nhật, Thái...) |
| **Italian** | Món Ý (Pizza, Pasta...) |
| **Mexican** | Món Mexico (Tacos, Burritos...) |
| **French** | Món Pháp |
| **Indian** | Món Ấn Độ |
| **American** | Món Mỹ |

*Có thể chọn nhiều*

##### Disliked Ingredients (Nguyên liệu không thích)

Nhập các nguyên liệu bạn không thích:

**Examples**:
- `ngò` (cilantro)
- `cay` (spicy)
- `đậu nành`
- `hành tây`

*Cách nhập: Mỗi nguyên liệu trên một dòng, dùng Enter để phân tách*

##### Location Settings (Thiết lập địa điểm)

Nhập thành phố để lấy thời tiết:

**Example**: `Ho Chi Minh City`

---

## 📱 Main Features

### 1. Dashboard (Trang chủ)

Dashboard là nơi bạn xem tổng quan nhanh:

#### Today's Meals (Bữa ăn hôm nay)

Hiển thị 3 section:
- **Bữa Sáng** (Breakfast)
- **Bữa Trưa** (Lunch)
- **Bữa Tối** (Dinner)

Mỗi section hiển thị:
- Món ăn đã chọn (hoặc trống)
- Nút "Get Recommendations" để nhận gợi ý
- Nút "Add Meal" để thêm món ăn

#### Weather Widget (Tiết kiện thời tiết)

Hiển thị:
- Nhiệt độ hiện tại (°C)
- Điều kiện thời tiết (nắng, mưa, mát...)
- Icon thời tiết
- Tên thành phố

#### Quick Actions (Hành động nhanh)

Nút nổi (Floating Action Button) với các tùy chọn:
- **Add New Meal**: Thêm món ăn mới
- **View History**: Xem lịch sử bữa ăn
- **Get Recommendations**: Nhận gợi ý cho tất cả bữa

---

### 2. Get Recommendations (Nhận gợi ý)

#### How to Get Recommendations

1. **Trên Dashboard**: Click "Get Recommendations" trên bữa cụ thể
2. **Trên trang Recommendations**: Chọn loại bữa và click "Get Recommendations"

#### Understanding Recommendations

Mỗi gợi ý hiển thị:

**Card Information**:
- **Tên món ăn**: Tên món ăn (tiếng Việt)
- **Mô tả**: Mô tả ngắn về món ăn
- **Lý do gợi ý**: Tại sao món này được gợi ý
- **Thời gian nấu**: Ước tính thời gian nấu
- **Độ khó**: Dễ / Trung bình / Khó
- **Nguyên liệu chính**: 3 nguyên liệu chính
- **Calo**: Ước tính calo
- **Protein**: Nguồn protein

**Actions**:
- **Accept**: Chọn món này cho bữa ăn
- **Skip**: Bỏ qua gợi ý này
- **Refresh**: Làm mới gợi ý

#### Recommendations Factors

Gợi ý dựa trên:

| Factor | Description |
|--------|-------------|
| **Thời tiết** | Món ăn phù hợp với thời tiết hiện tại |
| **Lịch sử** | Không trùng lặp với các món đã ăn gần đây |
| **Khẩu vị** | Phù hợp với ẩm thực yêu thích |
| **Giới hạn** | Tuân thủ dietary restrictions |
| **Nguyên liệu không thích** | Tránh các nguyên liệu bạn không thích |

---

### 3. Add Meal (Thêm món ăn)

#### How to Add Meal

1. Click "Add Meal" trên Dashboard
2. Hoặc click icon "+" trên trang History

#### Form Fields

**Required Fields**:

| Field | Description | Example |
|-------|-------------|----------|
| **Tên món** | Tên món ăn | Phở Bò |
| **Loại bữa** | Chọn loại bữa | Bữa Trưa |
| **Ngày** | Ngày ăn món | Hôm nay |

**Optional Fields**:

| Field | Description | Example |
|-------|-------------|----------|
| **Mô tả** | Mô tả ngắn về món ăn | Phở bò truyền thống |

#### Save Meal

- Click "Save" để lưu
- Click "Cancel" để hủy

---

### 4. View Meal History (Xem lịch sử bữa ăn)

#### Access History

Click "View History" trên Dashboard hoặc menu

#### History View Options

**Timeline View** (Mặc định):
- Hiển thị các món ăn theo thời gian
- Sắp xếp theo ngày (mới nhất trước)
- Mỗi món hiển thị trong card riêng

**Filter Options**:
- **All**: Tất cả bữa
- **Bữa Sáng**: Chỉ bữa sáng
- **Bữa Trưa**: Chỉ bữa trưa
- **Bữa Tối**: Chỉ bữa tối

#### Meal Card Actions

Mỗi meal card hiển thị:
- Tên món ăn
- Loại bữa
- Ngày ăn
- Đánh giá trung bình (nếu có)
- Actions: Edit, Delete, Rate

**Actions**:
- **Edit**: Chỉnh sửa thông tin món ăn
- **Delete**: Xóa món ăn (với xác nhận)
- **Rate**: Đánh giá món ăn

---

### 5. Rate Meals (Đánh giá món ăn)

#### How to Rate

1. Trên History hoặc Dashboard, click "Rate" trên meal card
2. Rating modal sẽ mở

#### Rating Form

**Star Rating** (Bắt buộc):
- Chọn 1-5 sao
- 1 sao: Rất không thích
- 2 sao: Không thích
- 3 sao: Bình thường
- 4 sao: Thích
- 5 sao: Rất thích

**Comment** (Tùy chọn):
- Nhập nhận xét về món ăn
- Giúp hệ thống học hỏi tốt hơn

**Save Rating**:
- Click "Save" để lưu đánh giá
- Click "Cancel" để hủy

#### Why Rate?

Đánh giá giúp hệ thống:
- Hiểu khẩu vị của bạn
- Cải thiện chất lượng gợi ý
- Gợi ý món ăn phù hợp hơn

---

### 6. Manage Preferences (Quản lý preferences)

#### Access Preferences

Go to **Settings** → **Preferences**

#### Edit Preferences

Tất cả fields có thể chỉnh sửa:

**Tips**:
- Cập nhật preferences khi khẩu vị thay đổi
- Thêm nguyên liệu mới không thích
- Thay đổi địa điểm khi di chuyển

#### Save Changes

- Click "Save" để lưu
- Preferences được lưu tự động

---

## 🎯 Best Practices

### For Better Recommendations

1. **Update Preferences Regularly**
   - Cập nhật preferences khi khẩu vị thay đổi
   - Thêm nguyên liệu mới không thích
   - Thay đổi địa điểm khi di chuyển

2. **Rate Your Meals**
   - Đánh giá mỗi món ăn bạn thử
   - Nhận xét chi tiết giúp cải thiện gợi ý
   - Hệ thống học hỏi từ đánh giá của bạn

3. **Keep Meal History Updated**
   - Thêm món ăn thực tế vào history
   - Không chỉ những món từ gợi ý
   - Hệ thống tránh gợi ý lặp

4. **Check Weather Before Planning**
   - Thời tiết ảnh hưởng đến gợi ý
   - Lên kế hoạch dựa trên dự báo thời tiết

### For Efficient Meal Planning

1. **Get Recommendations Early**
   - Nhận gợi ý vào buổi sáng cho cả ngày
   - Lên kế hoạch trước

2. **Accept or Skip Quickly**
   - Accept gợi ý thích
   - Skip gợi ý không thích
   - Refresh để nhận gợi ý mới

3. **Use History as Reference**
   - Xem lại các món đã ăn
   - Tìm inspiration từ history
   - Tránh lặp món ăn

---

## 🎨 UI Navigation

### Menu Structure

```
┌─────────────────────────────────┐
│  Smart Meal Recommender          │
├─────────────────────────────────┤
│  🏠 Dashboard                  │
│  📜 History                   │
│  🤖 Recommendations            │
│  ⚙️ Settings                   │
└─────────────────────────────────┘
```

### Page Descriptions

| Page | Description |
|-------|-------------|
| **Dashboard** | Trang chính, xem bữa ăn hôm nay |
| **History** | Xem lịch sử tất cả bữa ăn |
| **Recommendations** | Nhận gợi ý cho bữa cụ thể |
| **Settings** | Cài đặt preferences |

---

## 🔄 Common Workflows

### Workflow 1: Plan Today's Meals

```
1. Open Dashboard
2. Check weather widget
3. Click "Get Recommendations" for breakfast
4. Review 3 recommendations
5. Accept one or click "Refresh" for new options
6. Repeat for lunch and dinner
7. Selected meals appear in Today's Meals
```

### Workflow 2: Add Meal Manually

```
1. Click "Add New Meal" (FAB)
2. Fill in form:
   - Name: "Cơm Tấm"
   - Description: "Cơm tấm sườn bì chả"
   - Meal Type: Bữa Trưa
   - Date: Today
3. Click "Save"
4. Meal appears in History and Today's Meals
```

### Workflow 3: Rate a Meal

```
1. Go to History or find meal on Dashboard
2. Click "Rate" on meal card
3. Select star rating (1-5)
4. Add optional comment
5. Click "Save"
6. Rating appears on meal card
```

### Workflow 4: Update Preferences

```
1. Go to Settings → Preferences
2. Edit fields:
   - Add dietary restrictions
   - Add favorite cuisines
   - Add disliked ingredients
   - Update location
3. Click "Save"
4. Preferences updated for next recommendations
```

---

## 📱 Mobile vs Desktop

### Mobile Experience

- **Touch-friendly**: Tất cả buttons kích thước phù hợp cho touch
- **Single column layout**: Easy navigation
- **Bottom navigation**: Quick access to main features
- **Responsive design**: Works on all screen sizes

### Desktop Experience

- **Multi-column layout**: More information visible
- **Keyboard shortcuts**: Faster navigation (v2)
- **Larger cards**: Better readability
- **Quick actions**: Hover for actions

---

## ⚡ Performance Tips

### Fast Loading

1. **Use Good Internet Connection**
   - App cần kết nối internet cho API calls
   - 4G/Wi-Fi recommended

2. **Cache Enabled**
   - Preferences saved locally
   - Weather cached for 1 hour
   - Recommendations cached for 30 minutes

### Reduce API Costs

1. **Refresh Recommendations Wisely**
   - Gợi ý cached for 30 minutes
   - Chỉ refresh khi cần
   - Tránh unnecessary API calls

2. **Use Cached Weather**
   - Weather cached for 1 hour
   - Không cần refresh thường xuyên

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Recommendations Not Showing

**Problem**: Không thấy gợi ý

**Possible Causes**:
- Không có internet connection
- OpenAI API error
- Preferences chưa được setup

**Solutions**:
- Check internet connection
- Check preferences
- Try refreshing page
- Contact support if persists

#### 2. Weather Not Updating

**Problem**: Weather không thay đổi

**Possible Causes**:
- Cached data (1 hour)
- Location not set
- Weather API error

**Solutions**:
- Wait for cache to expire (1 hour)
- Check location in preferences
- Refresh page
- Update location if changed

#### 3. Meal Not Saving

**Problem**: Không thể lưu món ăn

**Possible Causes**:
- Database connection error
- Validation error
- Missing required fields

**Solutions**:
- Check all required fields
- Check internet connection
- Try again
- Check console for errors

#### 4. Rating Not Saving

**Problem**: Đánh giá không được lưu

**Possible Causes**:
- Network error
- Rating already exists
- Validation error

**Solutions**:
- Check internet connection
- Check if rating already exists
- Try again

---

## 📞 Support

### How to Get Help

1. **Check This Guide**
   - Read through relevant sections
   - Try troubleshooting steps

2. **Contact Support**
   - Email: support@example.com
   - GitHub Issues: [github.com/yourrepo/issues](https://github.com/yourrepo/issues)

3. **Provide Details**
   When reporting issues, include:
   - Browser name and version
   - Steps to reproduce
   - Screenshot (if applicable)
   - Error message (if any)

---

## 🔄 Updates & Improvements

### What's Coming (v2.0)

- **Recipe Suggestions**: Công thức nấu ăn chi tiết
- **Grocery List**: Tạo danh sách mua đồ
- **Meal Planning**: Lên kế hoạch cho cả tuần
- **Nutritional Info**: Thông tin dinh dưỡng chi tiết
- **Multiple Languages**: Hỗ trợ English
- **Dark Mode**: Chế độ tối
- **Export**: Xuất lịch sử bữa ăn (PDF/Excel)
- **Social Features**: Chia sẻ món ăn

### How to Stay Updated

- Follow on GitHub for releases
- Check app notifications
- Subscribe to newsletter (v2)

---

## 📊 Tips & Tricks

### Pro Tips

1. **Batch Add Meals**
   - Thêm nhiều món ăn cùng lúc
   - Giúp xây dựng history nhanh

2. **Rate Honestly**
   - Đánh giá trung thực
   - Giúp hệ thống hiểu khẩu vị tốt hơn

3. **Experiment with Preferences**
   - Thử different combinations
   - Xem how it affects recommendations

4. **Use History as Inspiration**
   - Xem lại các món đã ăn
   - Tìm inspiration cho new meals

### Keyboard Shortcuts (v2)

Coming soon!

---

## 📝 FAQ

### General Questions

**Q: App có cần authentication không?**
A: Không, app là single-user, không cần đăng nhập.

**Q: Data có được lưu ở đâu?**
A: Data được lưu trên cloud (Neon PostgreSQL), preferences được lưu trên browser (localStorage).

**Q: Có thể dùng offline không?**
A: Một phần (preferences và cached data), nhưng gợi ý cần internet.

**Q: App có miễn phí không?**
A: App miễn phí, nhưng có chi phí API (OpenAI, WeatherBit) khoảng $10-20/tháng.

### Recommendations Questions

**Q: Tại sao gợi ý không phù hợp?**
A: Hãy kiểm tra preferences và đánh giá các món ăn để hệ thống học hỏi tốt hơn.

**Q: Có thể nhận nhiều gợi ý không?**
A: Hiện tại chỉ gợi ý 3 món, nhưng có thể refresh để nhận gợi ý mới.

**Q: Gợi ý có được lưu không?**
A: Gợi ý không tự động lưu, nhưng bạn có thể chọn và thêm vào history.

### Privacy Questions

**Q: Data của tôi có an toàn không?**
A: Data được lưu trên secure database (Neon PostgreSQL), không có PII được lưu.

**Q: Preferences được lưu ở đâu?**
A: Preferences được lưu trên browser (localStorage), chỉ trên device bạn đang dùng.

**Q: Có thể export data không?**
A: Chưa có tính năng export, sẽ có trong v2.0.

---

## 🔄 Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-01-08 | Initial user guide | AI Assistant |

---

## 📚 Additional Resources

- [PRD](./PRD.md) - Product Requirements Document
- [Architecture](./ARCHITECTURE.md) - System Architecture
- [API Documentation](./API.md) - API Endpoints

---

**End of User Guide**

Chúc bạn có trải nghiệm tuyệt vời với Smart Meal Recommender! 🍽️