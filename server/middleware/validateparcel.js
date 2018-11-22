const validParcel = (req, res, next) => {
  // const parcel = {
  //   sender: req.body.sender,
  //   receiver: req.body.receiver,
  //   pickupLocation: req.body.pickupLocation,
  //   destination: req.body.destination,
  //   item: req.body.item,
  //   user: req.body.user,
  // };
  // const {
  //   sender, receiver, pickupLocation, destination, item, user,
  // } = parcel;

  // if (!sender || typeof sender !== 'string'
  //   || sender.trim().length === 0
  //     || !receiver || typeof receiver !== 'string'
  //     || receiver.trim().length === 0
  //     || !pickupLocation || typeof pickupLocation !== 'string'
  //     || pickupLocation.trim().length === 0
  //     || !destination || typeof destination !== 'string' || destination.trim().length === 0
  //     || !item || typeof item !== 'string'
  //     || item.trim().length === 0
  //     || !user || typeof user !== 'number'
  //     || user.toString().trim() <= 0) {
  //   return res.status(400).send({
  //     status: 'Failure',
  //     message: 'Invalid input',
  //   });
  // }

  // parcel.sender = sender.trim();
  // parcel.receiver = receiver.trim();
  // parcel.pickupLocation = pickupLocation.trim();
  // parcel.destination = destination.trim();
  // parcel.item = item.trim();

  // // Add location field
  // parcel.location = pickupLocation.trim();
  // req.body = parcel;
  next();
};

export default validParcel;
