import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  WeatherData,
  WeatherBitResponse,
} from './interfaces/weather.interface';
import { PreferencesService } from '../preferences/preferences.service';

interface CacheEntry {
  data: WeatherData;
  expiresAt: number;
}

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly cache = new Map<string, CacheEntry>();
  private readonly CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour
  private readonly WEATHERBIT_BASE_URL =
    'https://api.weatherbit.io/v2.0/current';

  constructor(
    private readonly configService: ConfigService,
    private readonly preferencesService: PreferencesService,
  ) {}

  /**
   * Get current weather data
   * Uses provided lat/lng or falls back to preferences location
   */
  async getWeather(lat?: number, lng?: number): Promise<WeatherData> {
    // If no coordinates provided, get from preferences
    if (lat === undefined || lng === undefined) {
      const preferences = await this.preferencesService.getPreferences();
      lat = preferences.locationLat ?? 10.8231; // Default: Ho Chi Minh City
      lng = preferences.locationLng ?? 106.6297;
    }

    const cacheKey = `${lat}:${lng}`;

    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      this.logger.debug(`Returning cached weather for ${cacheKey}`);
      return cached.data;
    }

    // Fetch from API
    try {
      const weatherData = await this.fetchFromWeatherBit(lat, lng);

      // Cache the result
      this.cache.set(cacheKey, {
        data: weatherData,
        expiresAt: Date.now() + this.CACHE_DURATION_MS,
      });

      return weatherData;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to fetch weather: ${errorMessage}`);

      // Return cached data even if expired, as fallback
      if (cached) {
        this.logger.warn('Returning expired cache as fallback');
        return cached.data;
      }

      // Return default weather if no cache available
      return this.getDefaultWeather();
    }
  }

  private async fetchFromWeatherBit(
    lat: number,
    lng: number,
  ): Promise<WeatherData> {
    const apiKey = this.configService.get<string>('WEATHERBIT_API_KEY');

    if (!apiKey || apiKey === 'your-weatherbit-api-key-here') {
      this.logger.warn(
        'WeatherBit API key not configured, returning default weather',
      );
      return this.getDefaultWeather();
    }

    const url = `${this.WEATHERBIT_BASE_URL}?lat=${lat}&lon=${lng}&key=${apiKey}`;

    const response = await axios.get<WeatherBitResponse>(url, {
      timeout: 10000,
    });

    if (!response.data?.data?.[0]) {
      throw new HttpException(
        'Invalid response from weather API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const weatherInfo = response.data.data[0];

    return {
      temp: Math.round(weatherInfo.temp),
      condition: this.mapWeatherCondition(weatherInfo.temp),
      description: weatherInfo.weather.description,
      icon: weatherInfo.weather.icon,
      humidity: weatherInfo.rh,
      windSpeed: Math.round(weatherInfo.wind_spd * 10) / 10,
      location: weatherInfo.city_name,
      fetchedAt: new Date().toISOString(),
    };
  }

  /**
   * Map temperature to Vietnamese weather condition
   */
  private mapWeatherCondition(temp: number): string {
    if (temp >= 35) return 'Nắng nóng';
    if (temp >= 30) return 'Nóng';
    if (temp >= 25) return 'Ấm áp';
    if (temp >= 20) return 'Mát mẻ';
    if (temp >= 15) return 'Se lạnh';
    return 'Lạnh';
  }

  /**
   * Get default weather when API is unavailable
   */
  private getDefaultWeather(): WeatherData {
    return {
      temp: 28,
      condition: 'Ấm áp',
      description: 'Không có dữ liệu thời tiết',
      icon: '01d',
      humidity: 70,
      windSpeed: 5,
      location: 'Ho Chi Minh City',
      fetchedAt: new Date().toISOString(),
    };
  }

  /**
   * Clear weather cache (useful for testing)
   */
  clearCache(): void {
    this.cache.clear();
  }
}
