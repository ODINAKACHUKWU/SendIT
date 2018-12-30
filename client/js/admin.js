const admin = document.getElementById('admin');
const url = 'http://localhost:3100/api/v1';
const output = document.getElementById('output');

const makeAdmin = async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  const currentPage = window.location.search;
  const id = currentPage.split('=').pop();
  const userId = parseInt(id, 10);
  const data = JSON.stringify({
    category: 'Admin',
  });

  const res = await fetch(`${url}/users/${userId}/role`, {
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
      output.innerHTML = jsonRes.message;
      output.style.color = 'red';
      return;
    }
    if (res.ok) {
      window.location.href = `./user-details.html?id=${userId}`;
      output.innerHTML = jsonRes.message;
      output.style.color = 'green';
      return;
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

admin.addEventListener('click', makeAdmin);
