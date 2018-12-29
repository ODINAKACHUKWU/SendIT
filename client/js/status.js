const status = document.getElementById('status');
const url = 'http://localhost:3100/api/v1';
const output = document.getElementById('output');

const changeStatus = async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  const currentPage = window.location.search;
  const id = currentPage.split('=').pop();
  const parcelId = parseInt(id, 10);
  const data = JSON.stringify({
    status: 'Delivered',
  });

  const res = await fetch(`${url}/parcels/${parcelId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'Application/json',
      'x-access-token': token,
    },
    body: data,
  });

  const jsonRes = await res.json();

  try {
    if (res.status === 403) {
      window.location.href = `./admin-parcelDetails.html?id=${parcelId}`;
      output.innerHTML = jsonRes.message;
    }
    if (res.ok) {
      window.location.href = `./admin-parcelDetails.html?id=${parcelId}`;
      output.innerHTML = jsonRes.message;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

status.addEventListener('click', changeStatus);
