/* eslint-disable camelcase */
const heading = document.getElementById('heading');
const customerId = document.getElementById('customerId');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const userEmail = document.getElementById('email');
const phoneNumber = document.getElementById('phoneNumber');
const role = document.getElementById('role');
const endpoint = 'http://localhost:3100/api/v1';
const user = document.querySelector('.user');

const getUserDetails = async () => {
  const token = localStorage.getItem('token');
  const currentPage = window.location.search;
  const id = currentPage.split('=').pop();
  const userId = parseInt(id, 10);
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

  const res = await fetch(`${endpoint}/users/${userId}`, {
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
        userid, first_name, last_name, email, phone_number, category,
      } = display;
      const title = '<h2 class="row heading">Customer Details</h2>';

      heading.innerHTML = title;
      customerId.innerHTML = `<b>Customer ID:</b> ${userid}`;
      firstName.innerHTML = `<b>First Name:</b> ${first_name}`;
      lastName.innerHTML = `<b>Last Name:</b> ${last_name}`;
      userEmail.innerHTML = `<b>Email:</b> ${email}`;
      phoneNumber.innerHTML = `<b>Phone Number:</b> ${phone_number}`;
      role.innerHTML = `<b>Role:</b> ${category}`;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

window.addEventListener('load', getUserDetails);
