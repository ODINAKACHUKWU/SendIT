const regular = document.getElementById('regular');
const path = 'http://localhost:3100/api/v1';
const display = document.getElementById('output');

const makeRegular = async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  const currentPage = window.location.search;
  const id = currentPage.split('=').pop();
  const userId = parseInt(id, 10);
  const data = JSON.stringify({
    category: 'Regular',
  });

  const res = await fetch(`${path}/users/${userId}/role`, {
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
      window.location.href = `./user-details.html?id=${userId}`;
      display.innerHTML = jsonRes.message;
    }
    if (res.ok) {
      window.location.href = `./user-details.html?id=${userId}`;
      display.innerHTML = jsonRes.message;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

regular.addEventListener('click', makeRegular);
