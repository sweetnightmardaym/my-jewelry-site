import { DataSource } from 'typeorm';
import { User } from './src/entities/User';
import { Category } from './src/entities/Category';
import { Product } from './src/entities/Product';
import dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'jewelry',
  entities: [User, Category, Product],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
});
