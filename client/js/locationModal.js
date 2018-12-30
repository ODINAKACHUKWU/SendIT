const modal = document.getElementById('locationModal');
const btn = document.getElementById('location');
const span = document.getElementsByClassName('close')[0];

const openModal = () => {
  modal.style.display = 'block';
};

const closeModal = () => {
  modal.style.display = 'none';
};

const closeModalOnClick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// When the user clicks the button, open the modal
btn.addEventListener('click', openModal);

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', closeModal);

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', closeModalOnClick);
