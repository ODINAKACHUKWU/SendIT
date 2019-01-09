/* eslint-disable camelcase */
const heading = document.getElementById('heading');
const orderId = document.getElementById('orderId');
const orderSender = document.getElementById('orderSender');
const orderReceiver = document.getElementById('orderReceiver');
const orderItem = document.getElementById('orderItem');
const orderSchedule = document.getElementById('orderSchedule');
const orderPickup = document.getElementById('orderPickup');
const orderDestination = document.getElementById('orderDestination');
const orderLocation = document.getElementById('orderLocation');
const orderPrice = document.getElementById('orderPrice');
const orderStatus = document.getElementById('orderStatus');
const endpoint = 'http://localhost:3100/api/v1';
const ok = document.getElementById('ok');
const token = localStorage.getItem('token');
const userWelcome = document.querySelector('.user');

const getParcelDetails = async () => {
  const currentPage = window.location.search;
  const ID = currentPage.split('=').pop();
  const parcelId = parseInt(ID, 10);
  const decoded = jwt_decode(token);

  const response = await fetch(`${url}/users/${decoded.userId}`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  });
  const jsonResponse = await response.json();
  if (response.ok) {
    const display = jsonResponse.data;
    userWelcome.innerHTML = `Welcome ${display.first_name} ${display.last_name}!`;
  }

  const res = await fetch(`${endpoint}/parcels/${parcelId}`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  });

  const jsonRes = await res.json();

  try {
    if (res.ok) {
      const display = jsonRes.data;
      const {
        id, sender, receiver, item, schedule, pickup_location, destination,
        present_location, price, order_status,
      } = display;
      const title = '<h2>Parcel Order Details</h2>';

      heading.innerHTML = title;
      orderId.innerHTML = `<b>ID:</b> ${id}`;
      orderSender.innerHTML = `<b>Sender:</b> ${sender}`;
      orderReceiver.innerHTML = `<b>Receiver:</b> ${receiver}`;
      orderItem.innerHTML = `<b>Item:</b> ${item}`;
      orderSchedule.innerHTML = `<b>Schedule:</b> ${schedule}`;
      orderPickup.innerHTML = `<b>Pickup Location:</b> ${pickup_location}`;
      orderDestination.innerHTML = `<b>Destination:</b> ${destination}`;
      orderLocation.innerHTML = `<b>Present Location:</b> ${present_location}`;
      orderPrice.innerHTML = `<b>Price:</b> &#8358;${price}`;
      orderStatus.innerHTML = `<b>Status:</b> ${order_status}`;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

const displayDashbord = () => {
  const decoded = jwt_decode(token);
  if (decoded.category === 'Regular') {
    window.location.href = './user-dashboard.html';
  } else if (decoded.category === 'Admin') {
    window.location.href = './admin-dashboard.html';
  }
};

window.addEventListener('load', getParcelDetails);
ok.addEventListener('click', displayDashbord);
