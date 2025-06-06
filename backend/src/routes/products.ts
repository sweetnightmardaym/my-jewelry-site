import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';

const router = Router();

router.get('/', async (req, res) => {
  const repo = getRepository(Product);
  const products = await repo.find();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const repo = getRepository(Product);
  const product = await repo.findOneBy({ id: Number(req.params.id) });
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

export default router;
