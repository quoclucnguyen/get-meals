import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
  FindOptionsWhere,
} from 'typeorm';
import { Meal } from '../entities/meal.entity';
import { CreateMealDto, UpdateMealDto, QueryMealsDto } from './dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
  ) {}

  async findAll(
    query: QueryMealsDto,
  ): Promise<{ meals: Meal[]; total: number }> {
    const { startDate, endDate, mealType, limit = 50, offset = 0 } = query;

    const whereConditions: FindOptionsWhere<Meal> = {};

    // Date filtering
    if (startDate && endDate) {
      whereConditions.date = Between(startDate, endDate);
    } else if (startDate) {
      whereConditions.date = MoreThanOrEqual(startDate);
    } else if (endDate) {
      whereConditions.date = LessThanOrEqual(endDate);
    }

    // Meal type filtering
    if (mealType) {
      whereConditions.mealType = mealType;
    }

    const [meals, total] = await this.mealRepository.findAndCount({
      where: whereConditions,
      relations: ['ratings'],
      order: { date: 'DESC', createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    return { meals, total };
  }

  async findOne(id: string): Promise<Meal> {
    const meal = await this.mealRepository.findOne({
      where: { id },
      relations: ['ratings'],
    });

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    return meal;
  }

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const meal = this.mealRepository.create(createMealDto);
    const savedMeal = await this.mealRepository.save(meal);

    // Return with empty ratings array
    return {
      ...savedMeal,
      ratings: [],
    };
  }

  async update(id: string, updateMealDto: UpdateMealDto): Promise<Meal> {
    const meal = await this.findOne(id);

    Object.assign(meal, updateMealDto);

    return this.mealRepository.save(meal);
  }

  async remove(id: string): Promise<void> {
    const meal = await this.findOne(id);
    await this.mealRepository.remove(meal);
  }

  async findRecentMeals(days: number = 7): Promise<Meal[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split('T')[0];

    return this.mealRepository.find({
      where: {
        date: MoreThanOrEqual(startDateStr),
      },
      order: { date: 'DESC' },
    });
  }

  async searchNames(query?: string): Promise<{ names: string[] }> {
    if (!query || query.trim().length < 2) {
      return { names: [] };
    }

    const meals = await this.mealRepository
      .createQueryBuilder('meal')
      .select(['meal.name'])
      .where('LOWER(meal.name) LIKE LOWER(:query)', {
        query: `%${query.trim()}%`,
      })
      .orderBy('meal.name', 'ASC')
      .limit(10)
      .getMany();

    const distinctNames = Array.from(
      new Set(meals.map((meal) => meal.name)),
    ).sort();

    return { names: distinctNames };
  }
}
