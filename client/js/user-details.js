/* eslint-disable camelcase */
const heading = document.getElementById('heading');
const customerId = document.getElementById('customerId');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const userEmail = document.getElementById('email');
const phoneNumber = document.getElementById('phoneNumber');
const role = document.getElementById('role');
const endpoint = 'http://localhost:3100/api/v1';

const getUserDetails = async () => {
  const token = localStorage.getItem('token');
  const currentPage = window.location.search;
  const id = currentPage.split('=').pop();
  const userId = parseInt(id, 10);

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
      const title = '<h2>Customer Details</h2>';

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
