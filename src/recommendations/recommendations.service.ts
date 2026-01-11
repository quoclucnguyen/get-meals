import { Injectable, Logger } from '@nestjs/common';
import { MealType } from '../entities/meal.entity';
import { MealsService } from '../meals/meals.service';
import { PreferencesService } from '../preferences/preferences.service';
import { WeatherService } from '../weather/weather.service';
import { OpenAIService } from './openai.service';
import {
  RecommendationContext,
  RecommendationsResponse,
} from './interfaces/recommendation.interface';

interface CacheEntry {
  data: RecommendationsResponse;
  expiresAt: number;
}

@Injectable()
export class RecommendationsService {
  private readonly logger = new Logger(RecommendationsService.name);
  private readonly cache = new Map<string, CacheEntry>();
  private readonly CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes

  constructor(
    private readonly mealsService: MealsService,
    private readonly preferencesService: PreferencesService,
    private readonly weatherService: WeatherService,
    private readonly openaiService: OpenAIService,
  ) {}

  /**
   * Get meal recommendations
   * Uses cache if available and not forced to refresh
   */
  async getRecommendations(
    mealType: MealType,
    date?: string,
    refresh: boolean = false,
  ): Promise<RecommendationsResponse> {
    const cacheKey = date ? `${mealType}:${date}` : mealType;

    // Check cache if not refreshing
    if (!refresh) {
      const cached = this.cache.get(cacheKey);
      if (cached && cached.expiresAt > Date.now()) {
        this.logger.debug(
          `Returning cached recommendations for ${mealType}${date ? ` on ${date}` : ''}`,
        );
        return cached.data;
      }
    }

    // Generate new recommendations
    const response = await this.generateRecommendations(mealType, date);

    // Cache result
    this.cache.set(cacheKey, {
      data: response,
      expiresAt: Date.now() + this.CACHE_DURATION_MS,
    });

    return response;
  }

  /**
   * Force refresh recommendations (bypass cache)
   */
  async refreshRecommendations(
    mealType: MealType,
    date?: string,
  ): Promise<RecommendationsResponse> {
    return this.getRecommendations(mealType, date, true);
  }

  /**
   * Generate recommendations using OpenAI
   */
  private async generateRecommendations(
    mealType: MealType,
    date?: string,
  ): Promise<RecommendationsResponse> {
    // Fetch all required context in parallel
    const [weather, recentMeals, preferences, targetDateMeals] =
      await Promise.all([
        this.weatherService.getWeather(),
        this.mealsService.findRecentMeals(7),
        this.preferencesService.getPreferences(),
        date
          ? this.mealsService
              .findAll({ startDate: date, endDate: date })
              .then((r) => r.meals)
          : Promise.resolve([]),
      ]);

    // Combine recent meals with meals from the target date (if specified)
    const mealHistory = [...recentMeals];
    if (date) {
      // Add meals from target date to context if they exist
      targetDateMeals.forEach((meal) => {
        if (!mealHistory.find((m) => m.id === meal.id)) {
          mealHistory.push(meal);
        }
      });
    }

    // Generate recommendations using OpenAI
    const recommendations = await this.openaiService.generateRecommendations(
      mealType,
      weather,
      mealHistory,
      preferences,
    );

    // Build context for response
    const context: RecommendationContext = {
      weather: {
        condition: weather.condition,
        temperature: weather.temp,
      },
      mealHistory: recentMeals.map((meal) => ({
        name: meal.name,
        mealType: meal.mealType,
        date: meal.date,
      })),
      preferences: {
        favoriteCuisines: preferences.favoriteCuisines || [],
        dietaryRestrictions: preferences.dietaryRestrictions || [],
      },
    };

    return {
      recommendations,
      context,
      generatedAt: new Date().toISOString(),
    };
  }

  /**
   * Clear recommendations cache (useful for testing or when preferences change)
   */
  clearCache(mealType?: MealType): void {
    if (mealType) {
      this.cache.delete(mealType);
    } else {
      this.cache.clear();
    }
  }
}
