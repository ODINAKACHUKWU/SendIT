const validSignup = (req, res, next) => {
  const {
    firstName, lastName, phoneNumber, email, password, category,
  } = req.body;

  if (!firstName || firstName.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter first name',
    });
  }
  req.body.firstName = firstName.trim();


  if (!lastName || lastName.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter last name',
    });
  }
  req.body.lastName = lastName.trim();

  if (!phoneNumber || phoneNumber.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter a phone number',
    });
  }
  req.body.phoneNumber = phoneNumber.trim();

  if (!email || email.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter an email address',
    });
  }
  req.body.email = email.trim();

  if (!password || password.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter a password',
    });
  }
  req.body.password = password.trim();

  if (!category || category.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter a category',
    });
  }
  req.body.category = category.trim();

  next();
};

const validLogin = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  if (!email || email.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter an email address',
    });
  }
  req.body.email = email.trim();

  if (!password || password.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Please enter a password',
    });
  }
  req.body.password = password.trim();

  next();
};

export { validSignup, validLogin };
