const ok = document.getElementById('ok');
const path = 'http://localhost:3100/api/v1';
const street = document.getElementById('receiverStreet');
const city = document.getElementById('receiverCity');
const state = document.getElementById('receiverState');
const alert = document.getElementById('alert');

const changeDestination = async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  const currentPage = window.location.search;
  const id = currentPage.split('=').pop();
  const parcelId = parseInt(id, 10);
  const receiverStreet = street.value;
  const receiverCity = city.value;
  const receiverState = state.value;

  if (receiverStreet.trim().length === 0 || receiverCity.trim().length === 0
  || receiverState.trim().length === 0) {
    alert.innerHTML = 'Please fill out all the fields to proceed!';
    alert.style.color = 'red';
    return;
  }

  const destination = `${receiverStreet}, ${receiverCity}, ${receiverState}.`;
  const data = JSON.stringify({
    destination,
  });

  const res = await fetch(`${path}/parcels/${parcelId}/destination`, {
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
      window.location.href = `./parcel-details.html?id=${parcelId}`;
      alert.innerHTML = jsonRes.message;
      alert.style.color = 'red';
      return;
    }
    if (res.ok) {
      window.location.href = `./parcel-details.html?id=${parcelId}`;
      alert.innerHTML = jsonRes.message;
      alert.style.color = 'red';
      return;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

ok.addEventListener('click', changeDestination);
