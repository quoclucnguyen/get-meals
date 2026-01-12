import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import {
  Recommendation,
  OpenAIChatRequest,
  OpenAIChatResponse,
} from './interfaces/recommendation.interface';
import { Meal, MealType } from '../entities/meal.entity';
import { Preferences } from '../entities/preferences.entity';
import { WeatherData } from '../weather/interfaces/weather.interface';

interface OpenAIResponseData {
  recommendations: Recommendation[];
}

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name);
  private readonly OPENAI_API_URL =
    'https://api.z.ai/api/coding/paas/v4/chat/completions';
  private readonly MODEL = 'GLM-4.5-air';

  constructor(private readonly configService: ConfigService) {}

  /**
   * Generate meal recommendations using OpenAI API via HTTP request
   */
  async generateRecommendations(
    mealType: MealType,
    weather: WeatherData,
    mealHistory: Meal[],
    preferences: Preferences,
  ): Promise<Recommendation[]> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');

    if (!apiKey || apiKey === 'sk-your-openai-api-key-here') {
      this.logger.warn(
        'OpenAI API key not configured, returning fallback recommendations',
      );
      throw new HttpException(
        'OpenAI API key not configured',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const prompt = this.buildPrompt(
      mealType,
      weather,
      mealHistory,
      preferences,
    );

    try {
      const requestBody: OpenAIChatRequest = {
        model: this.MODEL,
        messages: [
          {
            role: 'system',
            content:
              'Bạn là một chuyên gia dinh dưỡng và đầu bếp Việt Nam với kinh nghiệm 20 năm. Bạn chỉ trả về JSON, không có text thêm.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: 'json_object' },
      };

      const response = await axios.post<OpenAIChatResponse>(
        this.OPENAI_API_URL,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 120_000, // 120 seconds timeout
        },
      );

      const content = response.data.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Empty response from OpenAI');
      }

      const parsed = JSON.parse(content) as unknown;

      if (
        typeof parsed !== 'object' ||
        parsed === null ||
        !('recommendations' in parsed) ||
        !Array.isArray((parsed as OpenAIResponseData).recommendations)
      ) {
        throw new Error('Invalid response format from OpenAI');
      }

      return (parsed as OpenAIResponseData).recommendations.slice(0, 3);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);

      if (error instanceof AxiosError) {
        this.logger.error(
          `OpenAI API error: ${error.response?.status} - ${JSON.stringify(error.response?.data)}`,
        );

        if (error.response?.status === 429) {
          throw new HttpException(
            'Too many requests. Please try again later.',
            HttpStatus.TOO_MANY_REQUESTS,
          );
        }

        throw new HttpException(
          `Failed to get recommendations: ${error.response?.status} ${error.response?.statusText}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (error instanceof Error) {
        this.logger.error(`OpenAI error: ${error.message}`);
        throw new HttpException(
          `Failed to get recommendations: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        this.logger.error(`OpenAI error: Unknown error occurred`);
        throw new HttpException(
          'Failed to get recommendations: Unknown error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /**
   * Build the prompt for OpenAI based on context
   */
  private buildPrompt(
    mealType: MealType,
    weather: WeatherData,
    mealHistory: Meal[],
    preferences: Preferences,
  ): string {
    const mealTypeLabel = this.getMealTypeLabel(mealType);
    const mealHistoryText = this.formatMealHistory(mealHistory);
    const favoriteCuisines =
      preferences.favoriteCuisines?.join(', ') || 'Không có';
    const dietaryRestrictions =
      preferences.dietaryRestrictions?.join(', ') || 'Không có';
    const dislikedIngredients =
      preferences.dislikedIngredients?.join(', ') || 'Không có';

    return `
Hãy gợi ý 5 món ăn cho ${mealTypeLabel}.

=== THÔNG TIN NGƯỜI DÙNG ===

Thời tiết hiện tại:
- Điều kiện: ${weather.condition}
- Nhiệt độ: ${weather.temp}°C
- Mô tả: ${weather.description}

Lịch sử bữa ăn 7 ngày gần nhất:
${mealHistoryText}

Khẩu vị người dùng:
- Ẩm thực yêu thích: ${favoriteCuisines}
- Giới hạn ăn uống: ${dietaryRestrictions}
- Nguyên liệu không thích: ${dislikedIngredients}

=== YÊU CẦU ===

1. Gợi ý món ăn phù hợp với thời tiết hiện tại
2. Không trùng lặp với lịch sử bữa ăn gần nhất
3. Tuân thủ đầy đủ các giới hạn ăn uống (nếu có)
4. Tránh tuyệt đối các nguyên liệu người dùng không thích
5. Món ăn nên đa dạng, hấp dẫn và phù hợp với khẩu vị Việt Nam
6. Ưu tiên món ăn dễ nấu, phù hợp cho ${mealTypeLabel}
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
`;
  }

  private getMealTypeLabel(mealType: MealType): string {
    const labels = {
      [MealType.BREAKFAST]: 'bữa sáng',
      [MealType.LUNCH]: 'bữa trưa',
      [MealType.DINNER]: 'bữa tối',
    };
    return labels[mealType];
  }

  private formatMealHistory(meals: Meal[]): string {
    if (meals.length === 0) {
      return 'Chưa có dữ liệu bữa ăn';
    }

    return meals
      .slice(0, 10) // Limit to last 10 meals
      .map(
        (meal, index) =>
          `${index + 1}. ${meal.name} (${meal.mealType}) - ${meal.date}`,
      )
      .join('\n');
  }
}
