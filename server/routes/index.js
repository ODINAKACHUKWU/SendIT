import { Router } from 'express';

import authRouter from './authRouter';
import userRouter from './userRouter';
import parcelRouter from './parcelRouter';

const router = Router();

// Authentication routes
router.use('/auth', authRouter);

// User routes
router.use('/users', userRouter);

// Parcel routes
router.use('/parcels', parcelRouter);

export default router;
