const btn = document.getElementById('loginUser');
const output = document.getElementById('output');
const url = 'http://localhost:3100/api/v1';

const loginUser = async (event) => {
  event.preventDefault();

  const email = document.getElementById('userEmail').value;
  const password = document.getElementById('userPassword').value;
  const data = {
    email,
    password,
  };

  try {
    const response = await fetch(`${url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();

    if (response.status === 400) {
      output.innerHTML = jsonResponse.message;
      output.style.color = 'red';
    }

    if (response.ok) {
      localStorage.setItem('token', jsonResponse.data);
      const token = localStorage.getItem('token');
      const decoded = jwt_decode(token);

      if (decoded.category === 'Regular') {
        window.location.href = './user-dashboard.html';
      } else if (decoded.category === 'Admin') {
        window.location.href = './admin-dashboard.html';
      }
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

btn.addEventListener('submit', loginUser);
