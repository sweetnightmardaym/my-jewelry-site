import { Router } from 'express';
import products from './products';
import auth from './auth';

const router = Router();

router.use('/products', products);
router.use('/auth', auth);
// categories route will come later

export default router;
