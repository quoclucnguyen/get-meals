import { MealType } from '../../entities/meal.entity';

export interface Recommendation {
  name: string;
  description: string;
  reasoning: string;
  cookingTime: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  ingredients?: string[];
  calories?: string;
  protein?: string;
}

export interface RecommendationContext {
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
}

export interface RecommendationsResponse {
  recommendations: Recommendation[];
  context: RecommendationContext;
  generatedAt: string;
}

export interface OpenAIChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIChatRequest {
  model: string;
  messages: OpenAIChatMessage[];
  temperature?: number;
  max_tokens?: number;
  response_format?: { type: 'json_object' };
}

export interface OpenAIChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
