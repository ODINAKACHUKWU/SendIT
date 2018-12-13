const validParcel = (req, res, next) => {
  const {
    sender, receiver, item, pickupLocation, destination, schedule, presentLocation, price, status,
  } = req.body;

  if (!sender || sender.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter a sender',
    });
  }
  req.body.sender = sender.trim();


  if (!receiver || receiver.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter a receiver',
    });
  }
  req.body.receiver = receiver.trim();

  if (!item || item.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter an item',
    });
  }
  req.body.item = item.trim();

  if (!pickupLocation || pickupLocation.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter a pickup location',
    });
  }
  req.body.pickupLocation = pickupLocation.trim();

  if (!destination || destination.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter a destination',
    });
  }
  req.body.destination = destination.trim();

  if (!schedule || schedule.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter schedule',
    });
  }
  req.body.schedule = schedule.trim();

  if (!presentLocation || presentLocation.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter current location',
    });
  }
  req.body.presentLocation = presentLocation.trim();

  if (!price || typeof price !== 'number') {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter a price',
    });
  }

  if (!status || status.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter status',
    });
  }
  req.body.status = status.trim();

  next();
};

export default validParcel;
