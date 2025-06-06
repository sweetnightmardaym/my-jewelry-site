import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column()
  passwordHash!: string;

  @Column({ default: 'user' })
  role!: 'user' | 'admin';

  @CreateDateColumn()
  createdAt!: Date;
}
