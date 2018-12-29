const cancel = document.getElementById('cancel');
const url = 'http://localhost:3100/api/v1';

const cancelParcel = async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  const currentPage = window.location.search;
  const id = currentPage.split('=').pop();
  const parcelId = parseInt(id, 10);
  const data = JSON.stringify({
    status: 'Cancelled',
  });

  const res = await fetch(`${url}/parcels/${parcelId}/cancel`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'Application/json',
      'x-access-token': token,
    },
    body: data,
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
      const deleteParcel = async () => {
        const response = await fetch(`${url}/parcels/${parcelId}/delete`, {
          method: 'DELETE',
          headers: {
            'x-access-token': token,
          },
        });

        // eslint-disable-next-line no-unused-vars
        const jsonResponse = await response.json();

        try {
          if (response.ok) {
            window.location.href = './orders.html';
            return;
          }
        } catch (error) {
          console.log(`There is an error: ${error.message}`);
        }
      };
      deleteParcel();
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

cancel.addEventListener('click', cancelParcel);
