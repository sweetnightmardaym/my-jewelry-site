import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Category {
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

  @ManyToOne(() => Category, (category) => category.children)
  parent!: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children!: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
