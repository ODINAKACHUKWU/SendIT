import express from 'express';

import ParcelController from '../controllers/parcel';
import UserController from '../controllers/user';
import { validSignup, validLogin } from '../middleware/validateuser';
import validParcel from '../middleware/validateparcel';
import AuthenticateUser from '../middleware/auth';

const router = express.Router();

// Parcel routes
router.get('/parcels', AuthenticateUser.verifyToken, ParcelController.getAllParcels);

router.get('/parcels/:id', AuthenticateUser.verifyToken, ParcelController.getParcelById);

router.post('/parcels', validParcel, AuthenticateUser.verifyToken, ParcelController.createParcel);

router.put('/parcels/:id/destination', AuthenticateUser.verifyToken, ParcelController.changeDestination);

router.put('/parcels/:id/status', AuthenticateUser.verifyToken, ParcelController.changeStatus);

router.put('/parcels/:id/presentLocation', AuthenticateUser.verifyToken, ParcelController.changeLocation);

router.put('/parcels/:id/cancel', AuthenticateUser.verifyToken, ParcelController.cancelParcel);

router.get('/users/:id/parcels', AuthenticateUser.verifyToken, ParcelController.getAllParcelsByAUser);

router.delete('/parcels/:id/delete', AuthenticateUser.verifyToken, ParcelController.deleteParcel);

router.get('/users/:id/all', AuthenticateUser.verifyToken, ParcelController.getTotalParcelsByAUser);

router.get('/users/:id/deliver', AuthenticateUser.verifyToken, ParcelController.getTotalParcelsDelivered);

router.get('/users/:id/pending', AuthenticateUser.verifyToken, ParcelController.getTotalParcelsNotDelivered);

// User routes
router.get('/users', AuthenticateUser.verifyToken, UserController.getAllUsers);

router.get('/users/:id', AuthenticateUser.verifyToken, UserController.getUserById);

router.post('/auth/signup', validSignup, UserController.registerUser);

router.post('/auth/login', validLogin, UserController.loginUser);

router.put('/users/:id/category', AuthenticateUser.verifyToken, UserController.assignAdmin);

export default router;
