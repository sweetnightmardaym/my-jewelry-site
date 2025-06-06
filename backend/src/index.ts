import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import dataSource from '../ormconfig';
import routes from './routes';

dotenv.config();
export const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', routes);

export async function start() {
  await dataSource.initialize();
  return new Promise<void>((resolve) => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      resolve();
    });
  });
}

if (require.main === module) {
  start().catch((err) => console.error('TypeORM connection error:', err));
}
