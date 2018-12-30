const output = document.getElementById('output');
const url = 'http://localhost:3100/api/v1';

const getCustomers = async () => {
  const token = localStorage.getItem('token');

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
        <div class="order-row">
          <div><b>ID:</b> ${customer.userid}</div>
          <div><b>Name:</b> ${customer.first_name} ${customer.last_name}</div>
          <div><b>Email:</b> ${customer.email}</div>
          <div><b>Phone Number:</b> ${customer.phone_number}</div>
          <a href="./user-details.html?id=${customer.userid}">See details</a>
        </div><br>
        `;
      });
      output.innerHTML = displayToAdmin;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

window.addEventListener('load', getCustomers);
