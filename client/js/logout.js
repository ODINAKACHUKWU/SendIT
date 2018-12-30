const logout = document.getElementById('logout');

const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('Small');
  localStorage.removeItem('Medium');
  localStorage.removeItem('Large');
  window.location.href = './index.html';
};

logout.addEventListener('click', logoutUser);
