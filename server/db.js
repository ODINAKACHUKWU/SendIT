const parcels = [{
  sender: 'John',
  receiver: 'Francis',
  pickupLocation: '12 Lagoon Street',
  destination: '4 Agip Street',
  item: 'book',
  user: 3,
  location: '12 Lagoon Street',
  status: 'Not delivered',
  id: 1,
},
{
  sender: 'John',
  receiver: 'Francis',
  pickupLocation: '12 Lagoon Street',
  destination: '5 Ben str.',
  item: 'book',
  user: 3,
  location: '12 Lagoon Street',
  status: 'Delivered',
  id: 2,
},
{
  sender: 'Richard',
  receiver: 'Ben',
  pickupLocation: '13 Lagoon str.',
  destination: '3 Bright way',
  item: 'Blue bag',
  user: 5,
  location: '12 Lagoon Street',
  status: 'Cancelled',
  id: 3,
}];

const users = [{
  firstName: 'Bright',
  lastName: 'Young',
  phoneNumber: '+09056374893',
  email: 'brightyoung@gmail.com',
  password: 'cfbdsbks',
  role: 'Admin',
  id: 1,
}];

export { parcels, users };
