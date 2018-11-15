import express from 'express';

import ParcelController from '../controllers/parcel';
import UserController from '../controllers/user';

const router = express.Router();

// Parcel routes
router.get('/parcels', ParcelController.getAllParcels);

router.get('/parcels/:id', ParcelController.getSpecificParcel);

router.post('/parcels', ParcelController.createParcel);

router.put('/parcels/:id/cancel', ParcelController.cancelParcel);

router.put('/parcels/:id/destination', ParcelController.changeDestination);

router.get('/users/:id/parcels/deliver', ParcelController.getSumParcelDelivered);

// User routes
router.get('/users', UserController.getAllUsers);

router.get('/users/:id', UserController.getSpecificUser);

router.get('/users/:id/parcels', UserController.getUserParcels);

router.post('/users', UserController.addUserAccount);

router.put('/parcels/:id/deliver', UserController.changeStatus);

router.put('parcels/:id/location', UserController.changeLocation);

export default router;
