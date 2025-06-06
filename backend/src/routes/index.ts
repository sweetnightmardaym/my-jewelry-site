import { Router } from 'express';
import products from './products';

const router = Router();

router.use('/products', products);
// categories route will come later

export default router;
