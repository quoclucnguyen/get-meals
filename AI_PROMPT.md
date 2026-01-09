# AI Prompt Templates Document
# Smart Meal Recommender

> Tài liệu chi tiết về prompt templates cho OpenAI API để tạo gợi ý món ăn thông minh.

---

## 📋 Document Information

- **Project Name**: Smart Meal Recommender
- **Version**: 1.0
- **Date Created**: 2026-01-08
- **Status**: Draft
- **Author**: AI Assistant

---

## 🤖 Overview

### OpenAI Model Selection

| Model | Use Case | Cost | Speed | Quality |
|-------|----------|-------|-------|----------|
| **GPT-4o-mini** | Production (cost-optimized) | Low | Fast | Good |
| **GPT-4o** | Production (high quality) | Medium | Fast | Excellent |
| **GPT-4-turbo** | Testing | Medium | Medium | Good |

**Recommendation**: Start with **GPT-4o-mini** for cost efficiency, upgrade to **GPT-4o** if quality is insufficient.

### API Configuration

```typescript
const openaiConfig = {
  model: 'gpt-4o-mini', // or 'gpt-4o'
  temperature: 0.7, // Balanced creativity
  max_tokens: 1000, // Sufficient for 3 recommendations
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  response_format: { type: 'json_object' }, // Enforce JSON output
};
```

---

## 📝 Main Recommendation Prompt

### Base Template

```typescript
const RECOMMENDATION_PROMPT = `
Bạn là một chuyên gia dinh dưỡng và đầu bếp Việt Nam với kinh nghiệm 20 năm. Hãy gợi ý 3 món ăn cho bữa {mealType}.

=== THÔNG TIN NGƯỜI DÙNG ===

Thời tiết hiện tại:
- Điều kiện: {weatherCondition}
- Nhiệt độ: {temperature}°C
- Mô tả: {weatherDescription}

Lịch sử bữa ăn 7 ngày gần nhất:
{mealHistory}

Khẩu vị người dùng:
- Ẩm thực yêu thích: {favoriteCuisines}
- Giới hạn ăn uống: {dietaryRestrictions}
- Nguyên liệu không thích: {dislikedIngredients}

=== YÊU CẦU ===

1. Gợi ý món ăn phù hợp với thời tiết hiện tại
2. Không trùng lặp với lịch sử búa ăn gần nhất
3. Tuân thủ đầy đủ các giới hạn ăn uống (nếu có)
4. Tránh tuyệt đối các nguyên liệu người dùng không thích
5. Món ăn nên đa dạng, hấp dẫn và phù hợp với khẩu vị Việt Nam
6. Ưu tiên món ăn dễ nấu, phù hợp cho bữa {mealType}
7. Món ăn nên là món Việt Nam hoặc món Á Đông phổ biến

=== ĐỊNH DẠNG TRẢ VỀ ===

Trả về kết quả dưới dạng JSON chính xác:

{
  "recommendations": [
    {
      "name": "Tên món ăn (Tiếng Việt)",
      "description": "Mô tả ngắn gọn về món ăn (2-3 câu)",
      "reasoning": "Lý do gợi ý món này (liên quan đến thời tiết, khẩu vị, lịch sử)",
      "cookingTime": "Thời gian nấu (ví dụ: 15 phút, 30 phút)",
      "difficulty": "Dễ/Trung bình/Khó",
      "ingredients": ["Nguyên liệu chính 1", "Nguyên liệu chính 2", "Nguyên liệu chính 3"],
      "calories": "Ước tính calo (ví dụ: ~350 calo)",
      "protein": "Nguồn protein (ví dụ: thịt gà, đậu hũ)"
    }
  ]
}

Lưu ý quan trọng:
- Chỉ trả về JSON, không có text thêm
- Đảm bảo JSON valid
- Mỗi gợi ý phải khác nhau hoàn toàn
- Tên món ăn phải bằng tiếng Việt
`;
```

---

## 🔄 Context Variables

### 1. Meal Type

```typescript
type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER';

const mealTypeMap = {
  BREAKFAST: 'bữa sáng',
  LUNCH: 'bữa trưa',
  DINNER: 'bữa tối',
};

function getMealTypeLabel(mealType: MealType): string {
  return mealTypeMap[mealType];
}
```

### 2. Weather Context

```typescript
interface WeatherContext {
  condition: string; // e.g., "Mát mẻ", "Nắng nóng", "Mưa"
  temperature: number; // e.g., 25
  description: string; // e.g., "Trời nhiều mây, gió nhẹ"
}

function formatWeatherContext(weather: WeatherContext): string {
  return `
- Điều kiện: ${weather.condition}
- Nhiệt độ: ${weather.temperature}°C
- Mô tả: ${weather.description}
`;
}
```

### 3. Meal History Context

```typescript
interface Meal {
  name: string;
  mealType: MealType;
  date: string;
}

function formatMealHistory(meals: Meal[]): string {
  if (meals.length === 0) {
    return 'Chưa có dữ liệu bữa ăn';
  }

  return meals
    .map((meal, index) => {
      const date = new Date(meal.date).toLocaleDateString('vi-VN');
      return `${index + 1}. ${meal.name} (${meal.mealType}) - ${date}`;
    })
    .join('\n');
}
```

### 4. Preferences Context

```typescript
interface Preferences {
  favoriteCuisines: string[];
  dietaryRestrictions: string[];
  dislikedIngredients: string[];
}

function formatPreferences(prefs: Preferences): string {
  return `
- Ẩm thực yêu thích: ${prefs.favoriteCuisines.join(', ') || 'Không có'}
- Giới hạn ăn uống: ${prefs.dietaryRestrictions.join(', ') || 'Không có'}
- Nguyên liệu không thích: ${prefs.dislikedIngredients.join(', ') || 'Không có'}
`;
}
```

---

## 🎯 Specialized Prompts

### 1. Breakfast Prompt

```typescript
const BREAKFAST_PROMPT = `
Bạn là chuyên gia về bữa sáng. Hãy gợi ý 3 món ăn sáng nhanh chóng, dinh dưỡng và dễ chuẩn bị.

=== BỐI CẢNH ===

- Thời tiết: {weatherCondition}, {temperature}°C
- Thời gian chuẩn bị: Tối đa 30 phút
- Độ khó: Dễ đến Trung bình

=== YÊU CẦU ĐẶC BIỆT CHO BỮA SÁNG ===

1. Nhanh chóng: Có thể chuẩn bị trong 15-30 phút
2. Năng lượng: Cung cấp đủ năng lượng cho buổi sáng
3. Dễ tiêu hóa: Không quá nặng bụng
4. Thanh mát hoặc ấm nóng tùy thời tiết

=== GỢI Ý ===

Nếu thời tiết mát mẻ (< 24°C):
- Gợi ý món nóng: Cháo, bún, phở, bánh mì nóng

Nếu thời tiết nóng (> 28°C):
- Gợi ý món thanh mát: Salad, sữa chua, trái cây, bánh mì nguội

=== FORMAT TRẢ VỀ ===

{JSON_FORMAT}
`;
```

### 2. Lunch Prompt

```typescript
const LUNCH_PROMPT = `
Bạn là chuyên gia về bữa trưa. Hãy gợi ý 3 món ăn trưa cân bằng, đủ dinh dưỡng cho cả ngày làm việc.

=== BỐI CẢNH ===

- Thời tiết: {weatherCondition}, {temperature}°C
- Thời gian chuẩn bị: 20-45 phút
- Độ khó: Dễ đến Trung bình

=== YÊU CẦU ĐẶC BIỆT CHO BỮA TRƯA ===

1. Cân bằng dinh dưỡng: Có đủ protein, carb, rau củ
2. Năng lượng vừa phải: 500-700 calo
3. Không quá nặng: Tránh gây buồn ngủ
4. Có thể làm trước: Một số món có thể prep trước

=== GỢI Ý ===

Nếu thời tiết mát mẻ:
- Gợi ý món canh, món nước: Phở, bún, hủ tiếu, mì

Nếu thời tiết nóng:
- Gợi ý món khô hoặc thanh mát: Cơm tấm, bánh cuốn, gỏi

=== FORMAT TRẢ VỀ ===

{JSON_FORMAT}
`;
```

### 3. Dinner Prompt

```typescript
const DINNER_PROMPT = `
Bạn là chuyên gia về bữa tối. Hãy gợi ý 3 món ăn tối ngon, ấm cúng, phù hợp để relax.

=== BỐI CẢNH ===

- Thời tiết: {weatherCondition}, {temperature}°C
- Thời gian chuẩn bị: 30-60 phút
- Độ khó: Trung bình đến Khó

=== YÊU CẦU ĐẶC BIỆT CHO BỮA TỐI ===

1. Ấm cúng: Món ăn tạo cảm giác thư giãn
2. Dinh dưỡng: Không quá nhiều carb
3. Đa dạng: Có thể là món mới lạ
4. Có thời gian: Có thể dành nhiều thời gian hơn

=== GỢI Ý ===

Nếu thời tiết mát mẻ:
- Gợi ý món lẩu, món nước nóng: Lẩu, mì cay, bún nước

Nếu thời tiết nóng:
- Gợi ý món thanh nhẹ, dễ tiêu: Salad, gỏi, món nướng

=== FORMAT TRẢ VỀ ===

{JSON_FORMAT}
`;
```

---

## 🌤️ Weather-Based Prompts

### 1. Sunny Weather (> 28°C)

```typescript
const HOT_WEATHER_PROMPT = `
Thời tiết đang nóng nực (> 28°C). Gợi ý món ăn:

YÊU CẦU:
- Món ăn thanh mát, giải nhiệt
- Tránh món quá nhiều dầu mỡ
- Nhiều rau củ, trái cây
- Món ăn hoặc uống mát
- Dễ tiêu hóa

GỢI Ý:
- Gỏi, salad
- Bún trộn, mì trộn
- Sữa chua, trái cây
- Nước ép, nước mát
- Món ăn nguội hoặc vừa vặn
`;
```

### 2. Cool Weather (20-27°C)

```typescript
const MODERATE_WEATHER_PROMPT = `
Thời tiết mát mẻ (20-27°C). Gợi ý món ăn:

YÊU CẦU:
- Món ăn đa dạng, phù hợp với mọi loại
- Cân bằng giữa nóng và mát
- Có thể là món nước hoặc món khô
- Phù hợp với khẩu vị chung

GỢI Ý:
- Cơm, mì, bún, phở
- Món nước truyền thống
- Món ăn nhẹ nhàng
- Các món ăn phổ biến
`;
```

### 3. Cold Weather (< 20°C)

```typescript
const COLD_WEATHER_PROMPT = `
Thời tiết lạnh (< 20°C). Gợi ý món ăn:

YÊU CẦU:
- Món ăn nóng, ấm
- Giữ nhiệt tốt
- Giúp giữ ấm cơ thể
- Có thể có nhiều calo hơn

GỢI Ý:
- Lẩu, món nước nóng
- Mì cay, bún nước
- Súp, cháo
- Món nướng
- Món ăn có gia vị ấm
`;
```

### 4. Rainy Weather

```typescript
const RAINY_WEATHER_PROMPT = `
Đang mưa. Gợi ý món ăn:

YÊU CẦU:
- Món ăn ấm, dễ chuẩn bị trong nhà
- Không cần nguyên liệu đặc biệt
- Ấm cúng, dễ ăn
- Có thể là món ăn nhanh

GỢI Ý:
- Cơm, mì ăn liền
- Bánh mì, xôi
- Món ăn đơn giản
- Các món ăn comfort food
- Món ăn có thể prep trước
`;
```

---

## 🥗 Dietary Restriction Prompts

### 1. Vegetarian

```typescript
const VEGETARIAN_PROMPT = `
GIỚI HẠN: Người dùng ăn chay (vegetarian)

YÊU CẦU:
- Không có thịt, cá, hải sản
- Có thể có trứng, sữa, phô mai
- Tập trung vào rau củ, đậu, hạt
- Đảm bảo đủ protein từ nguồn thực vật

NGUỒN PROTEIN:
- Đậu hũ, đậu nành
- Đậu lăng, đậu đen, đậu xanh
- Quả hạch, hạt
- Trứng, sữa (nếu ovo-lacto vegetarian)
- Nấm
`;
```

### 2. Vegan

```typescript
const VEGAN_PROMPT = `
GIỚI HẠN: Người dùng ăn thuần chay (vegan)

YÊU CẦU:
- Không có thịt, cá, hải sản
- Không có trứng, sữa, phô mai, mật ong
- 100% nguồn thực vật
- Đảm bảo đủ protein từ nguồn thực vật

NGUỒN PROTEIN:
- Đậu hũ, đậu nành
- Đậu lăng, đậu đen, đậu xanh
- Quả hạch, hạt
- Nấm
- Rau xanh đậm
- Nguyên liệu thuần chay
`;
```

### 3. Gluten-Free

```typescript
const GLUTEN_FREE_PROMPT = `
GIỚI HẠN: Người dùng không ăn gluten

YÊU CẦU:
- Không có bột mì, bột mì đa dụng
- Không có bánh mì, bánh mì tròn, pizza
- Tránh các món chứa bột mì
- Sử dụng thay thế: bột gạo, bột ngô, bột khoai

THAY THẾ:
- Bún, phở, mì gạo (OK)
- Cơm (OK)
- Mì làm từ gạo (OK)
- Các món ăn truyền thống Việt Nam thường OK
`;
```

### 4. Dairy-Free

```typescript
const DAIRY_FREE_PROMPT = `
GIỚI HẠN: Người dùng không ăn sữa

YÊU CẦU:
- Không có sữa bò, sữa dê
- Không có phô mai, bơ, kem
- Không có các sản phẩm từ sữa
- Có thể thay thế bằng sữa hạt

THAY THẾ:
- Sữa đậu nành, sữa hạnh nhân, sữa gạo
- Dừa tươi (để thay thế kem)
- Dầu cọ (thay thế bơ)
- Phô mai thuần chay (nếu không phải strict dairy-free)
`;
```

---

## 🚫 Disliked Ingredients Handling

```typescript
const DISLIKED_INGREDIENTS_PROMPT = `
CẢNH BÁO: Người dùng KHÔNG THÍCH các nguyên liệu sau:
{dislikedIngredients}

YÊU CẦU QUAN TRỌNG:
1. TUYỆT ĐỐI KHÔNG sử dụng các nguyên liệu này
2. Kiểm tra kỹ từng nguyên liệu trong công thức
3. Nếu món ăn thường có nguyên liệu này, bỏ qua hoặc thay thế
4. Không gợi ý món ăn có nguy cơ chứa nguyên liệu không thích

VÍ DỤ:
Nếu không thích "ngò" (cilantro):
- Bỏ qua: Phở, bún, các món thường có ngò
- Gợi ý: Các món không cần ngò

Nếu không thích "cay":
- Bỏ qua: Mì cay, lẩu cay
- Gợi ý: Món ăn không cay hoặc ít cay
`;
```

---

## 🔧 Prompt Optimization

### 1. Temperature Settings

```typescript
// Conservative (less creative, more predictable)
const conservativeConfig = {
  temperature: 0.3,
  model: 'gpt-4o-mini',
};

// Balanced (recommended)
const balancedConfig = {
  temperature: 0.7,
  model: 'gpt-4o-mini',
};

// Creative (more varied, less predictable)
const creativeConfig = {
  temperature: 1.0,
  model: 'gpt-4o',
};
```

### 2. Token Management

```typescript
// Estimate tokens for prompt
function estimateTokens(text: string): number {
  // Approximate: 1 token ≈ 4 characters for Vietnamese
  return Math.ceil(text.length / 4);
}

// Check if prompt fits within context window
function validatePromptLength(prompt: string): boolean {
  const estimatedTokens = estimateTokens(prompt);
  const maxTokens = 4000; // Safe margin
  return estimatedTokens < maxTokens;
}
```

### 3. Response Validation

```typescript
import { z } from 'zod';

const recommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      name: z.string().min(1),
      description: z.string().min(10),
      reasoning: z.string().min(10),
      cookingTime: z.string().min(3),
      difficulty: z.enum(['Dễ', 'Trung bình', 'Khó']),
      ingredients: z.array(z.string()).min(3),
      calories: z.string().min(3),
      protein: z.string().min(2),
    })
  ).length(3),
});

function validateResponse(response: any): boolean {
  try {
    recommendationSchema.parse(response);
    return true;
  } catch (error) {
    console.error('Invalid response format:', error);
    return false;
  }
}
```

---

## 🎯 Example Full Implementation

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateRecommendations(params: {
  mealType: MealType;
  weather: WeatherContext;
  mealHistory: Meal[];
  preferences: Preferences;
}): Promise<Recommendation[]> {
  // Build prompt
  const prompt = buildRecommendationPrompt(params);
  
  // Call OpenAI API
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'Bạn là một chuyên gia dinh dưỡng và đầu bếp Việt Nam.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 1500,
    response_format: { type: 'json_object' },
  });
  
  // Parse response
  const content = response.choices[0].message.content;
  const parsed = JSON.parse(content || '{}');
  
  // Validate
  if (!validateResponse(parsed)) {
    throw new Error('Invalid response format from OpenAI');
  }
  
  return parsed.recommendations;
}

function buildRecommendationPrompt(params: {
  mealType: MealType;
  weather: WeatherContext;
  mealHistory: Meal[];
  preferences: Preferences;
}): string {
  const mealTypeLabel = getMealTypeLabel(params.mealType);
  const weatherContext = formatWeatherContext(params.weather);
  const mealHistory = formatMealHistory(params.mealHistory);
  const preferences = formatPreferences(params.preferences);
  
  return RECOMMENDATION_PROMPT
    .replace('{mealType}', mealTypeLabel)
    .replace('{weatherCondition}', params.weather.condition)
    .replace('{temperature}', params.weather.temperature.toString())
    .replace('{weatherDescription}', params.weather.description)
    .replace('{mealHistory}', mealHistory)
    .replace('{favoriteCuisines}', params.preferences.favoriteCuisines.join(', '))
    .replace('{dietaryRestrictions}', params.preferences.dietaryRestrictions.join(', '))
    .replace('{dislikedIngredients}', params.preferences.dislikedIngredients.join(', '));
}
```

---

## 🔄 Error Handling & Fallbacks

```typescript
async function getRecommendationsWithFallback(params: {
  mealType: MealType;
  weather: WeatherContext;
  mealHistory: Meal[];
  preferences: Preferences;
}): Promise<Recommendation[]> {
  try {
    // Try OpenAI API
    return await generateRecommendations(params);
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Fallback to predefined recommendations
    return getFallbackRecommendations(params.mealType);
  }
}

function getFallbackRecommendations(mealType: MealType): Recommendation[] {
  const fallbacks: Record<MealType, Recommendation[]> = {
    BREAKFAST: [
      {
        name: 'Bánh Mì ốp La',
        description: 'Bánh mì nóng giòn với trứng ốp la và rau củ',
        reasoning: 'Món ăn sáng phổ biến và dễ chuẩn bị',
        cookingTime: '15 phút',
        difficulty: 'Dễ',
        ingredients: ['Bánh mì', 'Trứng', 'Rau củ'],
        calories: '~350 calo',
        protein: 'Trứng',
      },
      // ... more fallbacks
    ],
    LUNCH: [/* ... */],
    DINNER: [/* ... */],
  };
  
  return fallbacks[mealType];
}
```

---

## 📊 Cost Estimation

### GPT-4o-mini Pricing (as of 2026)

- **Input**: $0.15 / 1M tokens
- **Output**: $0.60 / 1M tokens

### Estimation

```
Average prompt size: ~500 tokens
Average response size: ~800 tokens
Cost per request: (500 * $0.15 + 800 * $0.60) / 1M = $0.00057

10 requests/day: $0.0057/day
30 requests/day: $0.017/day
100 requests/day: $0.057/day

Monthly cost (30 requests/day): ~$0.51
```

---

## 🔄 Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-01-08 | Initial prompt templates | AI Assistant |

---

**End of AI Prompt Templates Document**