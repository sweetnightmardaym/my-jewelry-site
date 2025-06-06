import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  slug!: string;

  @Column()
  nameRu!: string;

  @Column()
  nameUa!: string;

  @Column()
  nameEn!: string;

  @Column('decimal')
  price!: number;

  @Column()
  currency!: string;

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
