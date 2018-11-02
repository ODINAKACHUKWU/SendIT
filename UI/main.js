const cancelBtn = document.querySelector(".cancel-btn");

const cancel = () => {
    location.href="index.html";
}

cancelBtn.addEventListener("click", cancel);