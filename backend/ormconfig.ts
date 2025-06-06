import { DataSource } from 'typeorm';
import { User } from './src/entities/User';
import { Category } from './src/entities/Category';
import { Product } from './src/entities/Product';
import dotenv from 'dotenv';

dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

export default new DataSource({
  type: isTest ? 'sqlite' : 'postgres',
  database: isTest ? ':memory:' : process.env.DB_NAME || 'jewelry',
  host: isTest ? undefined : process.env.DB_HOST || 'db',
  port: isTest ? undefined : Number(process.env.DB_PORT) || 5432,
  username: isTest ? undefined : process.env.DB_USER || 'postgres',
  password: isTest ? undefined : process.env.DB_PASSWORD || 'postgres',
  entities: [User, Category, Product],
  synchronize: isTest,
  migrations: ['src/migrations/*.ts'],
});
