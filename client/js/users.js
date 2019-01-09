const output = document.getElementById('output');
const url = 'http://localhost:3100/api/v1';
const user = document.querySelector('.user');

const getCustomers = async () => {
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

  const res = await fetch(`${url}/users`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  });

  const jsonRes = await res.json();

  try {
    if (res.ok) {
      const display = jsonRes.data;

      let displayToAdmin = '<h2>Customers</h2>';

      display.forEach((customer) => {
        displayToAdmin += `
        <div class="col-12 col-s-12 tab">
        <a href="./user-details.html?id=${customer.userid}">
          <span>${customer.userid}</span>|
          <span><b>${customer.first_name} ${customer.last_name}</b></span>|
          <span>${customer.email}</span>|
          <span>${customer.phone_number}</span>
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

window.addEventListener('load', getCustomers);
