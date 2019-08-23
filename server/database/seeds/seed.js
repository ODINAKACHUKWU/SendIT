import db from '../configs/db';
import parcel from './parcels';
import user from './users';


const insertUser = () => {
  db.insertUser(user);
};

const insertParcel = () => {
  db.insertParcel(parcel);
};

insertUser();
insertParcel();
