import createTables from '../migrations/createTables';
import User from '../queries/user.db';
import Parcel from '../queries/parcel.db';
import parcel from './parcels';
import user from './users';

const seedDatabase = async () => {
  try {
    await createTables();
    const newUser = await User.create(user);
    if (newUser) {
      const { userId, ...data } = parcel;
      const parcelData = data;
      parcelData.userId = newUser.userid;
      const newParcel = await Parcel.create(parcelData);
      if (newParcel) {
        // eslint-disable-next-line no-console
        console.log('== Database seeded!');
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

seedDatabase();
