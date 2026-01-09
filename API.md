# API Documentation
# Smart Meal Recommender

> Tài liệu chi tiết về tất cả API endpoints cho ứng dụng gợi ý món ăn thông minh.

---

## 📋 Document Information

- **Project Name**: Smart Meal Recommender
- **Version**: 1.0
- **Date Created**: 2026-01-08
- **Status**: Draft
- **Author**: AI Assistant

---

## 🔗 Base URL

```
Development: http://localhost:3000
Production:  https://your-app.vercel.app
```

---

## 📚 API Overview

### Authentication
- **No authentication required** (single-user app)
- **Rate limiting**: Implement for OpenAI API calls
- **CORS**: Enabled for all origins (adjust in production)

### Response Format
All API responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

Error response:
```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🍽️ Meals API

### 1. Get Meals

Retrieve list of meals with optional filters.

**Endpoint**: `GET /api/meals`

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startDate` | Date | No | Start date (ISO format: YYYY-MM-DD) |
| `endDate` | Date | No | End date (ISO format: YYYY-MM-DD) |
| `mealType` | String | No | Meal type: `BREAKFAST`, `LUNCH`, or `DINNER` |
| `limit` | Number | No | Limit results (default: 50) |
| `offset` | Number | No | Offset for pagination (default: 0) |

**Example Request**:
```bash
curl "http://localhost:3000/api/meals?startDate=2026-01-01&endDate=2026-01-07&mealType=LUNCH&limit=10"
```

**Example Response (200)**:
```json
{
  "success": true,
  "data": {
    "meals": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "Phở Bò",
        "description": "Phở bò truyền thống với nước dùng đậm đà",
        "mealType": "LUNCH",
        "date": "2026-01-08",
        "createdAt": "2026-01-08T09:30:00.000Z",
        "ratings": [
          {
            "id": "550e8400-e29b-41d4-a716-446655440003",
            "rating": 5,
            "comment": "Phở rất ngon",
            "createdAt": "2026-01-08T10:00:00.000Z"
          }
        ]
      }
    ],
    "total": 1
  },
  "error": null
}
```

---

### 2. Create Meal

Create a new meal.

**Endpoint**: `POST /api/meals`

**Request Body**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | Yes | Meal name (1-255 characters) |
| `description` | String | No | Meal description |
| `mealType` | String | Yes | Meal type: `BREAKFAST`, `LUNCH`, or `DINNER` |
| `date` | String | Yes | Date in ISO format (YYYY-MM-DD) |

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/meals \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cơm Tấm",
    "description": "Cơm tấm sườn bì chả",
    "mealType": "LUNCH",
    "date": "2026-01-09"
  }'
```

**Example Response (201)**:
```json
{
  "success": true,
  "data": {
    "meal": {
      "id": "550e8400-e29b-41d4-a716-446655440004",
      "name": "Cơm Tấm",
      "description": "Cơm tấm sườn bì chả",
      "mealType": "LUNCH",
      "date": "2026-01-09",
      "createdAt": "2026-01-08T10:30:00.000Z",
      "ratings": []
    }
  },
  "error": null
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Validation error: name is required",
    "code": "VALIDATION_ERROR"
  }
}
```

---

### 3. Update Meal

Update an existing meal.

**Endpoint**: `PUT /api/meals/[id]`

**Path Parameters**:
- `id` (String, Required): Meal ID

**Request Body** (All fields optional):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | No | Updated meal name |
| `description` | String | No | Updated meal description |
| `mealType` | String | No | Updated meal type |
| `date` | String | No | Updated date |

**Example Request**:
```bash
curl -X PUT http://localhost:3000/api/meals/550e8400-e29b-41d4-a716-446655440004 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Cơm tấm sườn bì chả với nước mắm đặc biệt"
  }'
```

**Example Response (200)**:
```json
{
  "success": true,
  "data": {
    "meal": {
      "id": "550e8400-e29b-41d4-a716-446655440004",
      "name": "Cơm Tấm",
      "description": "Cơm tấm sườn bì chả với nước mắm đặc biệt",
      "mealType": "LUNCH",
      "date": "2026-01-09",
      "createdAt": "2026-01-08T10:30:00.000Z",
      "ratings": []
    }
  },
  "error": null
}
```

**Error Response (404)**:
```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Meal not found",
    "code": "NOT_FOUND"
  }
}
```

---

### 4. Delete Meal

Delete a meal (and its ratings).

**Endpoint**: `DELETE /api/meals/[id]`

**Path Parameters**:
- `id` (String, Required): Meal ID

**Example Request**:
```bash
curl -X DELETE http://localhost:3000/api/meals/550e8400-e29b-41d4-a716-446655440004
```

**Example Response (200)**:
```json
{
  "success": true,
  "data": {
    "message": "Meal deleted successfully"
  },
  "error": null
}
```

---

## ⭐ Ratings API

### 1. Create Rating

Create a rating for a meal.

**Endpoint**: `POST /api/ratings`

**Request Body**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `mealId` | String | Yes | Meal ID (valid UUID) |
| `rating` | Number | Yes | Rating (1-5) |
| `comment` | String | No | Optional comment |

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/ratings \
  -H "Content-Type: application/json" \
  -d '{
    "mealId": "550e8400-e29b-41d4-a716-446655440001",
    "rating": 5,
    "comment": "Món ăn rất ngon!"
  }'
```

**Example Response (201)**:
```json
{
  "success": true,
  "data": {
    "rating": {
      "id": "550e8400-e29b-41d4-a716-446655440005",
      "mealId": "550e8400-e29b-41d4-a716-446655440001",
      "rating": 5,
      "comment": "Món ăn rất ngon!",
      "createdAt": "2026-01-08T11:00:00.000Z"
    }
  },
  "error": null
}
```

---

### 2. Get Ratings

Get ratings for a specific meal.

**Endpoint**: `GET /api/ratings`

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mealId` | String | Yes | Meal ID |

**Example Request**:
```bash
curl "http://localhost:3000/api/ratings?mealId=550e8400-e29b-41d4-a716-446655440001"
```

**Example Response (200)**:
```json
{
  "success": true,
  "data": {
    "ratings": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440003",
        "mealId": "550e8400-e29b-41d4-a716-446655440001",
        "rating": 5,
        "comment": "Phở rất ngon",
        "createdAt": "2026-01-08T10:00:00.000Z"
      },
      {
        "id": "550e8400-e29b-41d4-a716-446655440005",
        "mealId": "550e8400-e29b-41d4-a716-446655440001",
        "rating": 5,
        "comment": "Món ăn rất ngon!",
        "createdAt": "2026-01-08T11:00:00.000Z"
      }
    ],
    "average": 5.0,
    "count": 2
  },
  "error": null
}
```

---

## 🤖 Recommendations API

### 1. Get Recommendations

Get AI-powered meal recommendations.

**Endpoint**: `GET /api/recommendations`

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mealType` | String | Yes | Meal type: `BREAKFAST`, `LUNCH`, or `DINNER` |
| `refresh` | Boolean | No | Force refresh (default: false) |

**Example Request**:
```bash
curl "http://localhost:3000/api/recommendations?mealType=BREAKFAST"
```

**Example Response (200)**:
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "name": "Bánh Mì ốp La",
        "description": "Bánh mì nóng giòn với trứng ốp la và rau củ tươi ngon",
        "reasoning": "Thời tiết mát mẻ thích hợp cho bánh mì nóng, phù hợp với khẩu vị Á Đông",
        "cookingTime": "15 phút",
        "difficulty": "Dễ"
      },
      {
        "name": "Cháo Yến Mạch Trái Cây",
        "description": "Cháo yến mạch nguyên hạt với các loại trái cây tươi",
        "reasoning": "Bữa sáng lành mạnh và nhanh chóng, phù hợp với dietary restrictions",
        "cookingTime": "20 phút",
        "difficulty": "Dễ"
      },
      {
        "name": "Bún Riêu Cua Bắp Bò",
        "description": "Bún riêu với thịt bắp bò và cua đồng",
        "reasoning": "Món ăn truyền thống Việt Nam, không trùng với lịch sử bữa ăn gần nhất",
        "cookingTime": "30 phút",
        "difficulty": "Trung bình"
      }
    ],
    "context": {
      "weather": {
        "condition": "Mát mẻ",
        "temperature": 25
      },
      "mealHistory": [
        {
          "name": "Phở Bò",
          "mealType": "LUNCH",
          "date": "2026-01-07"
        }
      ],
      "preferences": {
        "favoriteCuisines": ["Asian", "Italian"],
        "dietaryRestrictions": []
      }
    },
    "generatedAt": "2026-01-08T12:00:00.000Z"
  },
  "error": null
}
```

**Error Response (500)**:
```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Failed to generate recommendations. Please try again.",
    "code": "AI_ERROR"
  }
}
```

---

### 2. Refresh Recommendations

Force refresh recommendations (bypass cache).

**Endpoint**: `POST /api/recommendations/refresh`

**Request Body**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `mealType` | String | Yes | Meal type: `BREAKFAST`, `LUNCH`, or `DINNER` |

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/recommendations/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "mealType": "BREAKFAST"
  }'
```

**Example Response (200)**:
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "name": "Bánh Cuốn Trứng",
        "description": "Bánh cuốn nhân thịt và trứng, chấm nước chấm",
        "reasoning": "Món ăn mới, phù hợp với thời tiết",
        "cookingTime": "25 phút",
        "difficulty": "Trung bình"
      },
      // ... 2 more recommendations
    ],
    "generatedAt": "2026-01-08T12:05:00.000Z"
  },
  "error": null
}
```

---

## ⚙️ Preferences API

### 1. Get Preferences

Get user preferences.

**Endpoint**: `GET /api/preferences`

**Example Request**:
```bash
curl http://localhost:3000/api/preferences
```

**Example Response (200)**:
```json
{
  "success": true,
  "data": {
    "preferences": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "dietaryRestrictions": ["vegetarian", "gluten-free"],
      "favoriteCuisines": ["Asian", "Italian"],
      "dislikedIngredients": ["cilantro", "spicy"],
      "locationName": "Ho Chi Minh City",
      "locationLat": 10.8231,
      "locationLng": 106.6297,
      "updatedAt": "2026-01-08T12:00:00.000Z"
    }
  },
  "error": null
}
```

---

### 2. Update Preferences

Update user preferences.

**Endpoint**: `PUT /api/preferences`

**Request Body** (All fields optional):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `dietaryRestrictions` | String[] | No | Array of dietary restrictions |
| `favoriteCuisines` | String[] | No | Array of favorite cuisines |
| `dislikedIngredients` | String[] | No | Array of disliked ingredients |
| `locationName` | String | No | City name |
| `locationLat` | Number | No | Latitude |
| `locationLng` | Number | No | Longitude |

**Example Request**:
```bash
curl -X PUT http://localhost:3000/api/preferences \
  -H "Content-Type: application/json" \
  -d '{
    "favoriteCuisines": ["Asian", "Italian", "Mexican"],
    "dislikedIngredients": ["cilantro"]
  }'
```

**Example Response (200)**:
```json
{
  "success": true,
  "data": {
    "preferences": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "dietaryRestrictions": ["vegetarian", "gluten-free"],
      "favoriteCuisines": ["Asian", "Italian", "Mexican"],
      "dislikedIngredients": ["cilantro"],
      "locationName": "Ho Chi Minh City",
      "locationLat": 10.8231,
      "locationLng": 106.6297,
      "updatedAt": "2026-01-08T12:30:00.000Z"
    }
  },
  "error": null
}
```

---

## 🌤️ Weather API

### 1. Get Weather

Get current weather data (proxies to WeatherBit.io).

**Endpoint**: `GET /api/weather`

**Query Parameters** (Optional):
- `lat` (Number): Latitude (if not set, uses preferences)
- `lng` (Number): Longitude (if not set, uses preferences)

**Example Request**:
```bash
curl "http://localhost:3000/api/weather?lat=10.8231&lng=106.6297"
```

**Example Response (200)**:
```json
{
  "success": true,
  "data": {
    "weather": {
      "temp": 25,
      "condition": "Mát mẻ",
      "description": "Trời nhiều mây, gió nhẹ",
      "icon": "03d",
      "humidity": 75,
      "windSpeed": 5.2,
      "location": "Ho Chi Minh City",
      "fetchedAt": "2026-01-08T12:00:00.000Z"
    }
  },
  "error": null
}
```

**Error Response (500)**:
```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Failed to fetch weather data",
    "code": "WEATHER_ERROR"
  }
}
```

---

## 🔒 Error Handling

### Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Request validation failed |
| `NOT_FOUND` | Resource not found |
| `DATABASE_ERROR` | Database operation failed |
| `AI_ERROR` | OpenAI API error |
| `WEATHER_ERROR` | Weather API error |
| `INTERNAL_ERROR` | Unexpected server error |

### Error Response Format

```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",
    "details": {
      // Additional error details (optional)
    }
  }
}
```

---

## 📝 Validation Schemas

### Create Meal Schema

```typescript
{
  name: string (required, 1-255 chars),
  description: string (optional),
  mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' (required),
  date: string (required, ISO format: YYYY-MM-DD)
}
```

### Create Rating Schema

```typescript
{
  mealId: string (required, valid UUID),
  rating: number (required, 1-5),
  comment: string (optional)
}
```

### Update Preferences Schema

```typescript
{
  dietaryRestrictions: string[] (optional),
  favoriteCuisines: string[] (optional),
  dislikedIngredients: string[] (optional),
  locationName: string (optional),
  locationLat: number (optional, -90 to 90),
  locationLng: number (optional, -180 to 180)
}
```

---

## ⚡ Rate Limiting

### OpenAI API Rate Limiting

- **Maximum requests**: 10 requests per minute
- **Retry strategy**: Exponential backoff (1s, 2s, 4s, 8s)
- **Error response** (429):
```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Too many requests. Please try again later.",
    "code": "RATE_LIMIT_EXCEEDED",
    "retryAfter": 60
  }
}
```

### Weather API Rate Limiting

- **Cache duration**: 1 hour
- **Maximum requests**: 1,000 per day (WeatherBit.io free tier)
- **Fallback**: Use cached data if API fails

---

## 🔄 Caching Strategy

### Recommendations Cache

- **Cache duration**: 30 minutes
- **Cache key**: `recommendations:{mealType}`
- **Invalidate on**: Preferences update, meal added/updated

### Weather Cache

- **Cache duration**: 1 hour
- **Cache key**: `weather:{lat}:{lng}`
- **Invalidate on**: Location preferences update

---

## 📚 TypeScript Types

```typescript
// Meal Types
type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER';

interface Meal {
  id: string;
  name: string;
  description: string | null;
  mealType: MealType;
  date: string;
  createdAt: string;
  ratings?: Rating[];
}

interface CreateMealInput {
  name: string;
  description?: string;
  mealType: MealType;
  date: string;
}

interface UpdateMealInput {
  name?: string;
  description?: string;
  mealType?: MealType;
  date?: string;
}

// Rating Types
interface Rating {
  id: string;
  mealId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

interface CreateRatingInput {
  mealId: string;
  rating: number;
  comment?: string;
}

// Recommendation Types
interface Recommendation {
  name: string;
  description: string;
  reasoning: string;
  cookingTime: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
}

interface RecommendationsResponse {
  recommendations: Recommendation[];
  context: {
    weather: {
      condition: string;
      temperature: number;
    };
    mealHistory: Array<{
      name: string;
      mealType: MealType;
      date: string;
    }>;
    preferences: {
      favoriteCuisines: string[];
      dietaryRestrictions: string[];
    };
  };
  generatedAt: string;
}

// Preferences Types
interface Preferences {
  id: string;
  dietaryRestrictions: string[];
  favoriteCuisines: string[];
  dislikedIngredients: string[];
  locationName: string | null;
  locationLat: number | null;
  locationLng: number | null;
  updatedAt: string;
}

interface UpdatePreferencesInput {
  dietaryRestrictions?: string[];
  favoriteCuisines?: string[];
  dislikedIngredients?: string[];
  locationName?: string;
  locationLat?: number;
  locationLng?: number;
}

// Weather Types
interface Weather {
  temp: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  location: string;
  fetchedAt: string;
}

// API Response Types
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: {
    message: string;
    code: string;
    details?: any;
  } | null;
}
```

---

## 🔄 Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-01-08 | Initial API documentation | AI Assistant |

---

**End of API Documentation**