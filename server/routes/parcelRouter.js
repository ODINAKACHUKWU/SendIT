import { Router } from 'express';
import ParcelController from '../controllers/parcelController';
import validParcel from '../middleware/validateparcel';
import AuthenticateUser from '../middleware/auth';

const parcelRouter = Router();

parcelRouter.get('/', AuthenticateUser.verifyToken, ParcelController.getAllParcels);

parcelRouter.get('/:id', AuthenticateUser.verifyToken, ParcelController.getParcelById);

parcelRouter.post('/', validParcel, AuthenticateUser.verifyToken, ParcelController.createParcel);

parcelRouter.put('/:id/destination', AuthenticateUser.verifyToken, ParcelController.changeDestination);

parcelRouter.put('/:id/status', AuthenticateUser.verifyToken, ParcelController.changeStatus);

parcelRouter.put('/:id/presentLocation', AuthenticateUser.verifyToken, ParcelController.changeLocation);

parcelRouter.put('/:id/cancel', AuthenticateUser.verifyToken, ParcelController.cancelParcel);

parcelRouter.delete('/:id/delete', AuthenticateUser.verifyToken, ParcelController.deleteParcel);

// Move to userRouter
parcelRouter.get('/users/:id/parcels', AuthenticateUser.verifyToken, ParcelController.getAllParcelsByAUser);

parcelRouter.get('/users/:id/all', AuthenticateUser.verifyToken, ParcelController.getTotalParcelsByAUser);

parcelRouter.get('/users/:id/deliver', AuthenticateUser.verifyToken, ParcelController.getTotalParcelsDelivered);

parcelRouter.get('/users/:id/pending', AuthenticateUser.verifyToken, ParcelController.getTotalParcelsNotDelivered);

export default parcelRouter;
