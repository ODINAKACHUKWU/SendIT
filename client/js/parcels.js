const output = document.getElementById('output');
const url = 'http://localhost:3100/api/v1';

const getOrders = async () => {
  const token = localStorage.getItem('token');

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

      let displayToAdmin = '<h2>Orders</h2>';

      display.forEach((parcel) => {
        displayToAdmin += `
        <div class="order-row">
          <div><b>ID:</b> ${parcel.id}</div>
          <div><b>Customer ID:</b> ${parcel.userid}</div>
          <div><b>Receiver:</b> ${parcel.receiver}</div>
          <div><b>Item:</b> ${parcel.item}</div>
          <div><b>Schedule:</b> ${parcel.schedule}</div>
          <div><b>Present Location:</b> ${parcel.present_location}</div>
          <div><b>Status:</b> ${parcel.order_status}</div>
          <a href="./admin-parcelDetails.html?id=${parcel.id}">See details</a>
        </div><br>
        `;
      });
      output.innerHTML = displayToAdmin;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

window.addEventListener('load', getOrders);
