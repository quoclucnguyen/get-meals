import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from '../entities/rating.entity';
import { Meal } from '../entities/meal.entity';
import { CreateRatingDto } from './dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
  ) {}

  async findByMealId(
    mealId: string,
  ): Promise<{ ratings: Rating[]; average: number; count: number }> {
    // Check if meal exists
    const meal = await this.mealRepository.findOne({ where: { id: mealId } });
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    const ratings = await this.ratingRepository.find({
      where: { mealId },
      order: { createdAt: 'DESC' },
    });

    const count = ratings.length;
    const average =
      count > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / count : 0;

    return {
      ratings,
      average: Math.round(average * 10) / 10, // Round to 1 decimal place
      count,
    };
  }

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const { mealId, rating, comment } = createRatingDto;

    // Check if meal exists
    const meal = await this.mealRepository.findOne({ where: { id: mealId } });
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    // Validate rating value
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    const newRating = this.ratingRepository.create({
      mealId,
      rating,
      comment: comment || null,
    });

    return this.ratingRepository.save(newRating);
  }

  async findOne(id: string): Promise<Rating> {
    const rating = await this.ratingRepository.findOne({ where: { id } });
    if (!rating) {
      throw new NotFoundException('Rating not found');
    }
    return rating;
  }

  async remove(id: string): Promise<void> {
    const rating = await this.findOne(id);
    await this.ratingRepository.remove(rating);
  }
}
