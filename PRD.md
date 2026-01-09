# Product Requirements Document (PRD)
# Smart Meal Recommender

> Ứng dụng gợi ý món ăn thông minh sử dụng AI (LLM) dựa trên lịch sử bữa ăn, thời tiết, thói quen và khẩu vị người dùng.

---

## 📋 Document Information

- **Project Name**: Smart Meal Recommender
- **Version**: 1.0
- **Date Created**: 2026-01-08
- **Status**: Draft
- **Author**: AI Assistant

---

## 🎯 Product Overview

### Vision
Xây dựng một ứng dụng web đơn giản nhưng thông minh giúp người dùng cá nhân nhận được gợi ý món ăn phù hợp cho bữa sáng, trưa, tối dựa trên nhiều yếu tố: lịch sử bữa ăn, thời tiết hiện tại, thói quen ăn uống và khẩu vị cá nhân.

### Problem Statement
Người dùng cá nhân thường gặp khó khăn trong việc quyết định ăn gì cho mỗi bữa:
- Không biết ăn gì để không bị nhàm chán
- Món ăn không phù hợp với thời tiết
- Quên những món đã ăn gần đây
- Không có hệ thống lưu trữ lịch sử bữa ăn

### Solution
Ứng dụng web với AI-powered recommendations:
- Lưu trữ lịch sử bữa ăn không giới hạn
- Gợi ý 3 món ăn cho mỗi bữa (sáng/trưa/tối)
- Yếu tố gợi ý: lịch sử, thời tiết, khẩu vị, thói quen
- Hệ thống đánh giá món ăn để học hỏi preferences
- Interface đơn giản, dễ sử dụng

---

## 👥 Personas

### Persona 1: Ngân (Người dùng bận rộn)
- **Độ tuổi**: 28-35
- **Nghề nghiệp**: Kỹ sư phần mềm
- **Pain points**: Quá bận, không có thời gian nghĩ ăn gì, muốn quyết định nhanh
- **Goals**: Nhận gợi ý nhanh, không trùng lặp, phù hợp lịch trình
- **Usage frequency**: 3 lần/ngày (sáng/trưa/tối)

### Persona 2: Minh (Người quan tâm sức khỏe)
- **Độ tuổi**: 30-40
- **Nghề nghiệp**: Marketing Manager
- **Pain points**: Cần món ăn lành mạnh, có dietary restrictions, tránh một số nguyên liệu
- **Goals**: Gợi ý món ăn phù hợp với sức khỏe, tránh disliked ingredients
- **Usage frequency**: 2-3 lần/ngày

### Persona 3: Lan (Người thích đa dạng)
- **Độ tuổi**: 25-32
- **Nghề nghiệp**: Freelancer
- **Pain points**: Chán ăn cùng món, muốn thử nghiệm món mới, thích nhiều loại cuisine
- **Goals**: Gợi ý món mới lạ, đa dạng, không lặp lại quá nhanh
- **Usage frequency**: 3 lần/ngày

---

## ✨ Features

### MVP Features (v1.0)

#### 1. Quản lý Bữa Ăn
- **Add Meal**: Thêm món ăn mới
  - Input: Tên món (required)
  - Input: Mô tả (optional)
  - Input: Loại bữa (sáng/trưa/tối) (required)
  - Input: Ngày (mặc định là hôm nay) (required)
- **View Meal History**: Xem lịch sử bữa ăn
  - Timeline view: Liệt kê món ăn theo ngày
  - Filter by meal type (sáng/trưa/tối)
  - Pagination hoặc infinite scroll
- **Edit Meal**: Chỉnh sửa thông tin món ăn
- **Delete Meal**: Xóa món ăn (với xác nhận)

#### 2. Gợi ý Món Ăn (AI Recommendations)
- **Get Recommendations**: Nhận 3 gợi ý món ăn
  - Input: Loại bữa (sáng/trưa/tối)
  - Context tự động: 
    - Lịch sử bữa ăn 7 ngày gần nhất
    - Thời tiết hiện tại (từ WeatherBit.io API)
    - Preferences (khẩu vị, disliked ingredients)
  - Output: 3 gợi ý với thông tin chi tiết
    - Tên món
    - Mô tả ngắn
    - Lý do gợi ý
    - Thời gian nấu
    - Độ khó
- **Refresh Recommendations**: Làm mới gợi ý
- **Skip Suggestion**: Bỏ qua một gợi ý cụ thể

#### 3. Đánh giá Món Ăn
- **Rate Meal**: Đánh giá món ăn (1-5 sao)
  - Star rating: 1-5
  - Comment: Nhận xét (optional)
- **View Ratings**: Xem các đánh giá của món ăn
- **Update Rating**: Chỉnh sửa đánh giá

#### 4. Quản lý Preferences
- **Dietary Restrictions**: Chọn giới hạn ăn uống
  - Multi-select chips (vegetarian, vegan, gluten-free, dairy-free, etc.)
- **Favorite Cuisines**: Chọn loại ẩm thực yêu thích
  - Multi-select chips (Asian, Italian, Mexican, French, Indian, etc.)
- **Disliked Ingredients**: Chọn nguyên liệu không thích
  - Free text input với auto-complete
- **Location Settings**: Thiết lập địa điểm cho thời tiết
  - Input: Tên thành phố
  - Auto-detect location (optional, v2)

#### 5. Weather Widget
- **Current Weather**: Hiển thị thời tiết hiện tại
  - Nhiệt độ (°C)
  - Điều kiện thời tiết (nắng, mưa, mát, etc.)
  - Icon thời tiết
- **Auto-fetch**: Tự động lấy thời tiết khi mở app

#### 6. Dashboard
- **Today's View**: Xem nhanh bữa ăn hôm nay
  - Bữa sáng: Món ăn hiện tại hoặc gợi ý
  - Bữa trưa: Món ăn hiện tại hoặc gợi ý
  - Bữa tối: Món ăn hiện tại hoặc gợi ý
- **Quick Actions**: Các hành động nhanh
  - Add new meal
  - Get recommendations
  - View history
- **Weather Summary**: Tóm tắt thời tiết

### Future Features (v2.0+)
- Recipe suggestions with ingredients list
- Grocery list generation
- Meal planning for the week
- Nutritional information display
- Multiple language support (English, Vietnamese)
- Dark mode
- Export meal history (PDF/Excel)
- Social features (share meals)
- Image upload for meals

---

## 🔧 Non-Functional Requirements

### Performance
- **Response Time**: API recommendations < 5 seconds
- **Page Load**: < 2 seconds on 3G connection
- **Database Query**: All queries < 1 second

### Security
- **API Keys**: Never expose in client-side code
- **Environment Variables**: Sensitive data in .env file
- **Rate Limiting**: OpenAI API rate limiting
- **Input Validation**: All user inputs validated

### Scalability
- **Database**: Neon PostgreSQL (serverless, auto-scaling)
- **API**: Next.js API Routes (serverless)
- **Hosting**: Vercel (auto-scaling)

### Accessibility
- **WCAG Level AA**: Compliant with WCAG 2.1 Level AA
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels for all interactive elements
- **Color Contrast**: Minimum 4.5:1 ratio

### Usability
- **Mobile-First**: Optimized for mobile devices
- **Responsive**: Works on desktop, tablet, mobile
- **Intuitive UI**: Simple, clean interface
- **Loading States**: Clear loading indicators

---

## 🎨 User Interface Requirements

### Design System
- **Color Palette**: Warm tones (orange, green, beige)
- **Typography**: Clean, readable fonts
- **Components**: shadcn/ui components
- **Framework**: TailwindCSS

### Screens
1. **Dashboard** (Main screen)
   - Header: Weather widget + Date
   - Today's meals: 3 cards (Sáng/Trưa/Tối)
   - Recommendations section: 3 cards
   - Quick actions: Floating action button

2. **Meal History**
   - Calendar/Timeline view
   - Filter chips (All/Sáng/Trưa/Tối)
   - Meal cards with actions (Edit, Delete)
   - Pagination/Infinite scroll

3. **Add/Edit Meal**
   - Form with validation
   - Auto-complete suggestions
   - Save/Cancel buttons

4. **Recommendations**
   - 3 recommendation cards
   - Each card: Name, description, reasoning, cooking time, difficulty
   - Actions: Accept, Skip, Refresh

5. **Ratings**
   - Star rating component (1-5)
   - Comment textarea
   - Save/Cancel buttons

6. **Preferences**
   - Sections: Dietary Restrictions, Favorite Cuisines, Disliked Ingredients, Location
   - Multi-select chips for categorical data
   - Text input for disliked ingredients
   - Location input with auto-complete
   - Save button

---

## 🔗 Integration Requirements

### External APIs

#### 1. OpenAI API
- **Endpoint**: `https://api.openai.com/v1/chat/completions`
- **Model**: GPT-4o-mini (cost-effective) or GPT-4o (higher quality)
- **Purpose**: Generate meal recommendations
- **Rate Limiting**: Implement retry logic with exponential backoff
- **Cost Estimate**: $10-20/month for typical usage

#### 2. WeatherBit.io API
- **Endpoint**: `https://api.weatherbit.io/v2.0/current`
- **Parameters**: lat, lng (latitude, longitude)
- **Purpose**: Get current weather data
- **Rate Limit**: 1,000 calls/day (free tier)
- **Backup**: Cache weather data for 1 hour

### Database
- **Provider**: Neon (serverless PostgreSQL)
- **ORM**: Prisma
- **Migration**: Automatic migrations via Prisma

---

## 📊 Success Metrics

### User Engagement
- **Daily Active Users (DAU)**: Track unique users/day
- **Session Duration**: Average time spent in app
- **Feature Usage**: Usage rate of recommendations feature

### AI Performance
- **Recommendation Acceptance Rate**: % of recommendations accepted
- **Rating Average**: Average rating of recommended meals
- **User Satisfaction**: Feedback from users

### Technical Metrics
- **API Response Time**: < 5 seconds for recommendations
- **Uptime**: > 99.9%
- **Error Rate**: < 1%

---

## 🚨 Constraints & Assumptions

### Constraints
- **No User Authentication**: Single-user app (personal use)
- **Single Location**: Weather for one location only
- **No Multi-language**: Vietnamese only for v1.0
- **Budget**: Minimal infrastructure costs (< $50/month)
- **Timeline**: 11-12 days for MVP

### Assumptions
- User has internet connection for API calls
- User can provide OpenAI API key
- User can set up Neon PostgreSQL database
- User has basic tech knowledge to deploy

---

## 📅 Roadmap

### Phase 1: Documentation (Current)
- [x] PRD
- [ ] Architecture document
- [ ] Database schema
- [ ] API specification
- [ ] AI prompt templates
- [ ] Deployment guide
- [ ] User guide

### Phase 2: Development (Future)
- Setup Next.js project
- Configure database (Prisma + Neon)
- Implement backend API routes
- Implement frontend UI
- Integrate OpenAI API
- Integrate WeatherBit.io API
- Testing

### Phase 3: Deployment (Future)
- Deploy to Vercel
- Setup environment variables
- Performance monitoring
- Bug fixes

### Phase 4: Iteration (Future)
- Collect user feedback
- Implement v2 features
- Performance optimization
- Documentation updates

---

## 🔄 Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-01-08 | Initial draft | AI Assistant |

---

## 📧 Contact & Feedback

For questions or feedback about this PRD, please contact:
- **Project Repository**: [GitHub Link]
- **Issues**: [GitHub Issues Link]

---

**End of PRD**