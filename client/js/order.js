const btn = document.getElementById('order-form');
const senderFName = document.getElementById('senderFName');
const senderLName = document.getElementById('senderLName');
const senderStreet = document.getElementById('senderStreet');
const senderCity = document.getElementById('senderCity');
const senderState = document.getElementById('senderState');
const receiverFName = document.getElementById('receiverFName');
const receiverLName = document.getElementById('receiverLName');
const receiverStreet = document.getElementById('receiverStreet');
const receiverCity = document.getElementById('receiverCity');
const receiverState = document.getElementById('receiverState');
const deliveryItem = document.getElementById('item');
const quantity = document.querySelector("input[name='quantity']");
const size = document.querySelector("input[name='size']");
const date = document.getElementById('date');
const time = document.getElementById('time');
const output = document.getElementById('output');
const url = 'http://localhost:3100/api/v1';
const displayUser = document.querySelector('.user');
const token = localStorage.getItem('token');

const loadUserName = async () => {
  const decoded = jwt_decode(token);

  const res = await fetch(`${url}/users/${decoded.userId}`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  });
  const jsonRes = await res.json();
  if (res.ok) {
    const display = jsonRes.data;
    displayUser.innerHTML = `Welcome ${display.first_name} ${display.last_name}!`;
  }
};

const createOrder = async (event) => {
  event.preventDefault();

  const sender = `${senderFName.value} ${senderLName.value}`;
  const receiver = `${receiverFName.value} ${receiverLName.value}`;
  const item = deliveryItem.value;
  const pickupLocation = `${senderStreet.value}, ${senderCity.value}, ${senderState.value}.`;
  const destination = `${receiverStreet.value}, ${receiverCity.value}, ${receiverState.value}.`;
  const schedule = `${date.value} ${time.value}`;
  const presentLocation = pickupLocation;
  const qty = quantity.value;
  const itemSize = size.value;

  localStorage.setItem('Small', '1000');
  localStorage.setItem('Medium', '1500');
  localStorage.setItem('Large', '2000');

  const rate = localStorage.getItem(`${itemSize}`);
  const unitRate = parseInt(rate, 10);
  const actualQty = parseInt(qty, 10);
  const charge = unitRate * actualQty;

  const data = JSON.stringify({
    sender,
    receiver,
    item,
    pickupLocation,
    destination,
    schedule,
    presentLocation,
    price: charge,
    status: 'Not delivered',
  });

  try {
    const response = await fetch(`${url}/parcels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: data,
    });

    const jsonResponse = await response.json();

    if (response.status === 400) {
      if (jsonResponse.message === 'Please enter an item') {
        output.innerHTML = 'Please enter your parcel details in the parcel description section';
      }
      output.innerHTML = 'Please fill out all sections in the form';
    }

    if (response.ok) {
      if (response.status === 201) {
        const parcel = jsonResponse.data;
        const parcelId = parcel.id;
        window.location.href = `./order-review.html?id=${parcelId}`;
      }
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

window.addEventListener('load', loadUserName);
btn.addEventListener('submit', createOrder);
