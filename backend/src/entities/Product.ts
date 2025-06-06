import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
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

  @CreateDateColumn()
  createdAt!: Date;
}
