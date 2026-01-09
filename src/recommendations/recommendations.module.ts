import { Module } from '@nestjs/common';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';
import { OpenAIService } from './openai.service';
import { MealsModule } from '../meals/meals.module';
import { PreferencesModule } from '../preferences/preferences.module';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [MealsModule, PreferencesModule, WeatherModule],
  controllers: [RecommendationsController],
  providers: [RecommendationsService, OpenAIService],
  exports: [RecommendationsService],
})
export class RecommendationsModule {}
