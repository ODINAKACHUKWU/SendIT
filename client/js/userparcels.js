const output = document.getElementById('output');
const url = 'http://localhost:3100/api/v1';

const getUserParcels = async () => {
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);

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

      let displayToUser = '<h2>Parcel Orders Created</h2>';

      display.forEach((parcel) => {
        displayToUser += `
        <div id="parcel" class="order-row">
          <div><b>ID:</b> ${parcel.id}</div>
          <div><b>Receiver:</b> ${parcel.receiver}</div>
          <div><b>Item:</b> ${parcel.item}</div>
          <div><b>Schedule:</b> ${parcel.schedule}</div>
          <div><b>Present Location:</b> ${parcel.present_location}</div>
          <div><b>Status:</b> ${parcel.order_status}</div>
          <a href="./parcel-details.html?id=${parcel.id}">See details</a>
        </div><br>
        `;
      });
      output.innerHTML = displayToUser;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

window.addEventListener('load', getUserParcels);
