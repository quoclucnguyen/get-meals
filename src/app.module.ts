import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Entities
import { Meal } from './entities/meal.entity';
import { Rating } from './entities/rating.entity';
import { Preferences } from './entities/preferences.entity';

// Modules
import { MealsModule } from './meals/meals.module';
import { RatingsModule } from './ratings/ratings.module';
import { PreferencesModule } from './preferences/preferences.module';
import { WeatherModule } from './weather/weather.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        // If DATABASE_URL is provided, use it (for Neon PostgreSQL)
        if (databaseUrl && !databaseUrl.includes('username:password')) {
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [Meal, Rating, Preferences],
            synchronize: configService.get('NODE_ENV') !== 'production',
            ssl: {
              rejectUnauthorized: false,
            },
            logging: configService.get('NODE_ENV') === 'development',
          };
        }

        // Otherwise, use individual connection parameters
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME', 'postgres'),
          password: configService.get<string>('DB_PASSWORD', 'postgres'),
          database: configService.get<string>('DB_NAME', 'get_meals'),
          entities: [Meal, Rating, Preferences],
          synchronize: configService.get('NODE_ENV') !== 'production',
          logging: configService.get('NODE_ENV') === 'development',
        };
      },
    }),
    ScheduleModule.forRoot(),

    // Feature Modules
    MealsModule,
    RatingsModule,
    PreferencesModule,
    WeatherModule,
    RecommendationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
