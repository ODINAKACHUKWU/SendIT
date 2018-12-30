const del = document.getElementById('delete');
const URL = 'http://localhost:3100/api/v1';

const deleteParcel = async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  const currentPage = window.location.search;
  const id = currentPage.split('=').pop();
  const parcelId = parseInt(id, 10);

  const res = await fetch(`${URL}/parcels/${parcelId}/delete`, {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
    },
  });

  // eslint-disable-next-line no-unused-vars
  const jsonRes = await res.json();

  try {
    if (res.status === 403) {
      output.innerHTML = jsonRes.message;
      output.style.color = 'red';
      return;
    }
    if (res.ok) {
      window.location.href = './orders.html';
      return;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

del.addEventListener('click', deleteParcel);
