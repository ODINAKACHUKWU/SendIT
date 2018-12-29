const ok = document.getElementById('ok');
const path = 'http://localhost:3100/api/v1';
const street = document.getElementById('locationStreet');
const city = document.getElementById('locationCity');
const state = document.getElementById('locationState');
const alert = document.getElementById('alert');

const changeLocation = async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  const currentPage = window.location.search;
  const id = currentPage.split('=').pop();
  const parcelId = parseInt(id, 10);
  const locationStreet = street.value;
  const locationCity = city.value;
  const locationState = state.value;

  if (locationStreet.trim().length === 0 || locationCity.trim().length === 0
  || locationState.trim().length === 0) {
    alert.innerHTML = 'Please fill out all the fields to proceed!';
    alert.style.color = 'red';
    return;
  }

  const location = `${locationStreet}, ${locationCity}, ${locationState}.`;
  const data = JSON.stringify({
    location,
  });

  const res = await fetch(`${path}/parcels/${parcelId}/presentLocation`, {
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
      alert.innerHTML = jsonRes.message;
      alert.style.color = 'red';
      return;
    }
    if (res.ok) {
      window.location.href = `./admin-parcelDetails.html?id=${parcelId}`;
      alert.innerHTML = jsonRes.message;
      alert.style.color = 'red';
      return;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

ok.addEventListener('click', changeLocation);
