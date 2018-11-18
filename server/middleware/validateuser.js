const validUser = (req, res, next) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };
  const {
    firstName, lastName, phoneNumber, email, password, role,
  } = user;

  if (!firstName || typeof firstName !== 'string'
  || firstName.trim().length === 0
    || !lastName || typeof lastName !== 'string'
    || lastName.trim().length === 0
    || !phoneNumber || typeof phoneNumber !== 'string'
    || phoneNumber.trim().length === 0
    || !email || typeof email !== 'string' || email.trim().length === 0
    || !password || typeof password !== 'string'
    || password.trim().length === 0
    || !role || typeof role !== 'string'
    || role.trim().length === 0) {
    return res.status(400).send({
      status: 'Failure',
      message: 'Invalid input',
    });
  }

  user.firstName = firstName.trim();
  user.lastName = lastName.trim();
  user.email = email.trim();
  user.password = password.trim();
  user.role = role.trim();
  user.phoneNumber = phoneNumber.trim();
  req.body = user;
  next();
};

export default validUser;
