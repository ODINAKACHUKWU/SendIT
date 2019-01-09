const delivered = document.getElementById('delivered');
const transit = document.getElementById('transit');
const orders = document.getElementById('orders');
const user = document.querySelector('.user');
const url = 'http://localhost:3100/api/v1';

const displayParcelOverview = async () => {
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);

  try {
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

    const res = await fetch(`${url}/users/${decoded.userId}/all`, {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    });
    const jsonRes = await res.json();
    if (res.ok) {
      orders.innerHTML = jsonRes.data;
    }

    const resp = await fetch(`${url}/users/${decoded.userId}/deliver`, {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    });
    const jsonResp = await resp.json();
    if (res.ok) {
      delivered.innerHTML = jsonResp.data;
    }

    const respond = await fetch(`${url}/users/${decoded.userId}/pending`, {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    });
    const jsonRespond = await respond.json();
    if (res.ok) {
      transit.innerHTML = jsonRespond.data;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

window.addEventListener('load', displayParcelOverview);
