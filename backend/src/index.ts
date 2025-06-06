import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', routes);

createConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}).catch(err => console.error('TypeORM connection error:', err));
