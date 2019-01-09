const output = document.getElementById('output');
const url = 'http://localhost:3100/api/v1';
const user = document.querySelector('.user');

const getOrders = async () => {
  const token = localStorage.getItem('token');
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
    user.innerHTML = `Welcome ${display.first_name} ${display.last_name}!`;
  }

  const res = await fetch(`${url}/parcels`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  });

  const jsonRes = await res.json();

  try {
    if (res.ok) {
      const display = jsonRes.data;

      let displayToAdmin = '<h2>Parcel Delivery Orders</h2>';

      display.forEach((parcel) => {
        displayToAdmin += `
        <div class="col-12 col-s-12 tab">
        <a href="./admin-parcelDetails.html?id=${parcel.id}">
          <span>${parcel.id}</span>|
          <span>${parcel.receiver}</span>|
          <span>${parcel.item}</span>|
          <span>${parcel.schedule}</span>|
          <span>${parcel.present_location}</span>|
          <span>${parcel.order_status}</span>
        </a>
        </div>
        `;
      });
      output.innerHTML = displayToAdmin;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

window.addEventListener('load', getOrders);
