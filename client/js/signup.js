const btn = document.getElementById('signup');
const firstname = document.getElementById('firstName');
const lastname = document.getElementById('lastName');
const phonenumber = document.getElementById('phoneNumber');
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('password');
const passwordRepeat = document.getElementById('passwordRepeat');
const output = document.getElementById('output');
const url = 'http://localhost:3100/api/v1';

const signupUser = async (event) => {
  event.preventDefault();

  const firstName = firstname.value;
  const lastName = lastname.value;
  const phoneNumber = phonenumber.value;
  const email = userEmail.value;
  const passwordOne = userPassword.value;
  const checkPassword = passwordRepeat.value;

  if (passwordOne !== checkPassword) {
    const displayText = 'The passwords you provided are not the same';
    output.innerHTML = displayText;
    output.style.color = 'red';
    output.style.paddingBottom = '1em';
    return;
  }

  const data = JSON.stringify({
    firstName,
    lastName,
    phoneNumber,
    email,
    password: passwordOne,
    category: 'Regular',
  });

  try {
    const response = await fetch(`${url}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    const jsonResponse = await response.json();

    if (response.status === 400) {
      output.innerHTML = jsonResponse.message;
      output.style.color = 'red';
    }

    if (response.ok) {
      localStorage.setItem('token', jsonResponse.data);
      window.location.href = './user-dashboard.html';
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

btn.addEventListener('submit', signupUser);
