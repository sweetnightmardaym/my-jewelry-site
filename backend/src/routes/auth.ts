import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import dataSource from '../../ormconfig';
import { User } from '../entities/User';

const router = Router();
const userRepo = dataSource.getRepository(User);
const jwtSecret = process.env.JWT_SECRET || 'secret';

function handleValidation(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

function authMiddleware(
  req: Request & { userId?: number },
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const token = authHeader.slice(7);
    const payload = jwt.verify(token, jwtSecret) as any;
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

router.post(
  '/register',
  [body('email').isEmail(), body('password').isLength({ min: 8 })],
  handleValidation,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existing = await userRepo.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email exists' });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = userRepo.create({
      email,
      passwordHash,
      name: '',
      phone: '',
      role: 'user',
      isActive: true,
    });
    await userRepo.save(user);
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '7d' });
    const { passwordHash: _ph, ...rest } = user;
    res.json({ token, user: rest });
  },
);

const loginLimiter = rateLimit({ windowMs: 5 * 60 * 1000, max: 10 });

router.post(
  '/login',
  loginLimiter,
  [body('email').isEmail(), body('password').isLength({ min: 8 })],
  handleValidation,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await userRepo.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '7d' });
    const { passwordHash: _ph, ...rest } = user;
    res.json({ token, user: rest });
  },
);

router.post('/logout', (req, res) => {
  res.json({ message: 'ok' });
});

router.get(
  '/profile',
  authMiddleware,
  async (req: Request & { userId?: number }, res: Response) => {
    const user = await userRepo.findOne({ where: { id: req.userId! } });
    if (!user) return res.status(404).json({ message: 'Not found' });
    const { passwordHash: _ph, ...rest } = user;
    res.json(rest);
  },
);

router.put(
  '/profile',
  authMiddleware,
  [body('name').optional().isString(), body('phone').optional().isString()],
  handleValidation,
  async (req: Request & { userId?: number }, res: Response) => {
    await userRepo.update(
      { id: req.userId! },
      { name: req.body.name, phone: req.body.phone },
    );
    const user = await userRepo.findOneBy({ id: req.userId! });
    if (!user) return res.status(404).json({ message: 'Not found' });
    const { passwordHash: _ph, ...rest } = user;
    res.json(rest);
  },
);

export default router;
