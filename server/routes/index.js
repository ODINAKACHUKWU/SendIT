import express from 'express';

import ParcelController from '../controllers/parcel';
import UserController from '../controllers/user';
import { validSignup, validLogin } from '../middleware/validateuser';
// import validParcel from '../middleware/validateparcel';
import AuthenticateUser from '../middleware/auth';

const router = express.Router();

// Parcel routes
router.get('/parcels', AuthenticateUser.verifyToken, ParcelController.getAllParcels);

router.get('/parcels/:id', AuthenticateUser.verifyToken, ParcelController.getParcelById);

router.post('/parcels', AuthenticateUser.verifyToken, ParcelController.createParcel);

router.put('/parcels/:id/destination', AuthenticateUser.verifyToken, ParcelController.changeDestination);

router.put('/parcels/:id/status', AuthenticateUser.verifyToken, ParcelController.changeStatus);

router.put('/parcels/:id/presentLocation', AuthenticateUser.verifyToken, ParcelController.changeLocation);

// User routes
router.get('/users', UserController.getAllUsers);

router.get('/users/:id', UserController.getUserById);

router.post('/auth/signup', validSignup, UserController.registerUser);

router.post('/auth/login', validLogin, UserController.loginUser);

export default router;
