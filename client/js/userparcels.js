const output = document.getElementById('output');
const user = document.querySelector('.user');
const url = 'http://localhost:3100/api/v1';

const getUserParcels = async () => {
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

  const res = await fetch(`${url}/users/${decoded.userId}/parcels`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  });

  const jsonRes = await res.json();

  try {
    if (res.ok) {
      const display = jsonRes.data;

      if (typeof (display) === 'undefined') {
        output.innerHTML = 'You have no parcel delivery order.';
        return;
      }

      let displayToUser = '<h2 class="row heading">Parcel Orders Created</h2>';

      display.forEach((parcel) => {
        displayToUser += `
        <div class="col-12 col-s-12 tab">
        <a href="./parcel-details.html?id=${parcel.id}">
          <span><b>${parcel.id}</b></span>|  
          <span><b>${parcel.receiver}</b></span>|
          <span>${parcel.item}</span>|
          <span>${parcel.present_location}</span>|
          <span>${parcel.schedule}</span>|
          <span><b>${parcel.order_status}</b></span>
        </a>
        </div>
        `;
      });
      output.innerHTML = displayToUser;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

window.addEventListener('load', getUserParcels);