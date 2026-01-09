import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Preferences } from '../entities/preferences.entity';
import { UpdatePreferencesDto } from './dto';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectRepository(Preferences)
    private readonly preferencesRepository: Repository<Preferences>,
  ) {}

  /**
   * Get the user preferences (single-user app, only one record)
   * Creates default preferences if none exist
   */
  async getPreferences(): Promise<Preferences> {
    let preferences = await this.preferencesRepository.findOne({
      where: {},
      order: { updatedAt: 'DESC' },
    });

    if (!preferences) {
      // Create default preferences
      preferences = this.preferencesRepository.create({
        dietaryRestrictions: [],
        favoriteCuisines: [],
        dislikedIngredients: [],
        locationName: null,
        locationLat: null,
        locationLng: null,
      });
      preferences = await this.preferencesRepository.save(preferences);
    }

    return preferences;
  }

  /**
   * Update user preferences
   */
  async updatePreferences(
    updatePreferencesDto: UpdatePreferencesDto,
  ): Promise<Preferences> {
    const preferences = await this.getPreferences();

    // Update only provided fields
    if (updatePreferencesDto.dietaryRestrictions !== undefined) {
      preferences.dietaryRestrictions =
        updatePreferencesDto.dietaryRestrictions;
    }
    if (updatePreferencesDto.favoriteCuisines !== undefined) {
      preferences.favoriteCuisines = updatePreferencesDto.favoriteCuisines;
    }
    if (updatePreferencesDto.dislikedIngredients !== undefined) {
      preferences.dislikedIngredients =
        updatePreferencesDto.dislikedIngredients;
    }
    if (updatePreferencesDto.locationName !== undefined) {
      preferences.locationName = updatePreferencesDto.locationName;
    }
    if (updatePreferencesDto.locationLat !== undefined) {
      preferences.locationLat = updatePreferencesDto.locationLat;
    }
    if (updatePreferencesDto.locationLng !== undefined) {
      preferences.locationLng = updatePreferencesDto.locationLng;
    }

    return this.preferencesRepository.save(preferences);
  }
}
