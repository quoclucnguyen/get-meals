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
    'https://api.openai.com/v1/chat/completions';
  private readonly MODEL = 'gpt-4o-mini';

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
      return this.getFallbackRecommendations(mealType);
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
          timeout: 30000, // 30 seconds timeout
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
      } else if (error instanceof Error) {
        this.logger.error(`OpenAI error: ${error.message}`);
      } else {
        this.logger.error(`OpenAI error: Unknown error occurred`);
      }

      // Return fallback recommendations on error
      return this.getFallbackRecommendations(mealType);
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
Hãy gợi ý 3 món ăn cho ${mealTypeLabel}.

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

  /**
   * Fallback recommendations when API is unavailable
   */
  private getFallbackRecommendations(mealType: MealType): Recommendation[] {
    const fallbacks: Record<MealType, Recommendation[]> = {
      [MealType.BREAKFAST]: [
        {
          name: 'Bánh Mì Ốp La',
          description: 'Bánh mì nóng giòn với trứng ốp la và rau củ tươi ngon',
          reasoning: 'Món ăn sáng phổ biến và dễ chuẩn bị',
          cookingTime: '15 phút',
          difficulty: 'Dễ',
          ingredients: ['Bánh mì', 'Trứng', 'Rau củ'],
          calories: '~350 calo',
          protein: 'Trứng',
        },
        {
          name: 'Phở Gà',
          description: 'Phở gà nóng hổi với nước dùng trong và thịt gà mềm',
          reasoning: 'Bữa sáng truyền thống Việt Nam, bổ dưỡng',
          cookingTime: '30 phút',
          difficulty: 'Trung bình',
          ingredients: ['Bánh phở', 'Thịt gà', 'Hành, ngò'],
          calories: '~400 calo',
          protein: 'Thịt gà',
        },
        {
          name: 'Xôi Xéo',
          description: 'Xôi nếp vàng với đậu xanh và hành phi thơm',
          reasoning: 'Món ăn sáng no lâu, giàu năng lượng',
          cookingTime: '25 phút',
          difficulty: 'Trung bình',
          ingredients: ['Nếp', 'Đậu xanh', 'Hành phi'],
          calories: '~450 calo',
          protein: 'Đậu xanh',
        },
      ],
      [MealType.LUNCH]: [
        {
          name: 'Cơm Tấm Sườn Bì Chả',
          description: 'Cơm tấm đặc sản Sài Gòn với sườn nướng, bì và chả',
          reasoning: 'Món ăn trưa đầy đủ dinh dưỡng, đặc trưng miền Nam',
          cookingTime: '40 phút',
          difficulty: 'Trung bình',
          ingredients: ['Cơm tấm', 'Sườn heo', 'Bì', 'Chả'],
          calories: '~650 calo',
          protein: 'Thịt heo',
        },
        {
          name: 'Bún Chả Hà Nội',
          description: 'Bún với chả nướng thơm lừng và nước mắm chua ngọt',
          reasoning: 'Món ăn truyền thống miền Bắc, hương vị đậm đà',
          cookingTime: '35 phút',
          difficulty: 'Trung bình',
          ingredients: ['Bún', 'Chả viên', 'Thịt nướng', 'Rau sống'],
          calories: '~550 calo',
          protein: 'Thịt heo',
        },
        {
          name: 'Hủ Tiếu Nam Vang',
          description: 'Hủ tiếu với nước dùng trong ngọt, thịt và tôm',
          reasoning: 'Món ăn thanh đạm, dễ tiêu hóa',
          cookingTime: '30 phút',
          difficulty: 'Trung bình',
          ingredients: ['Hủ tiếu', 'Thịt heo', 'Tôm', 'Gan'],
          calories: '~500 calo',
          protein: 'Thịt heo, tôm',
        },
      ],
      [MealType.DINNER]: [
        {
          name: 'Lẩu Thái Hải Sản',
          description: 'Lẩu chua cay kiểu Thái với các loại hải sản tươi ngon',
          reasoning: 'Món ăn tối ấm cúng, thích hợp cho gia đình',
          cookingTime: '45 phút',
          difficulty: 'Trung bình',
          ingredients: ['Hải sản', 'Nấm', 'Rau các loại', 'Gia vị Thái'],
          calories: '~500 calo',
          protein: 'Hải sản',
        },
        {
          name: 'Gà Kho Gừng',
          description: 'Gà kho với gừng thơm, nước màu đậm đà',
          reasoning: 'Món ăn tối truyền thống, dễ nấu',
          cookingTime: '40 phút',
          difficulty: 'Dễ',
          ingredients: ['Thịt gà', 'Gừng', 'Nước mắm', 'Tiêu'],
          calories: '~450 calo',
          protein: 'Thịt gà',
        },
        {
          name: 'Canh Chua Cá Lóc',
          description: 'Canh chua đặc trưng miền Tây với cá lóc tươi ngon',
          reasoning: 'Món canh thanh mát, cân bằng bữa tối',
          cookingTime: '35 phút',
          difficulty: 'Trung bình',
          ingredients: ['Cá lóc', 'Me', 'Giá', 'Bạc hà'],
          calories: '~300 calo',
          protein: 'Cá lóc',
        },
      ],
    };

    return fallbacks[mealType];
  }
}
