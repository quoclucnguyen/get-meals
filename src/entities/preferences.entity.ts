import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('preferences')
export class Preferences {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'simple-array', default: '' })
  dietaryRestrictions: string[];

  @Column({ type: 'simple-array', default: '' })
  favoriteCuisines: string[];

  @Column({ type: 'simple-array', default: '' })
  dislikedIngredients: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  locationName: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  locationLat: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  locationLng: number | null;

  @UpdateDateColumn()
  updatedAt: Date;
}
