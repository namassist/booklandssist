const btnModal = document.querySelector("#btn-modal");

const modalBg = document.querySelector(".modal-add-bg");
const modalClose = document.querySelector(".modal-add-close");

btnModal.addEventListener("click", function () {
  modalBg.classList.add("modal-active");
  console.log(btnModal);
  console.log(modalBg);
});

modalClose.addEventListener("click", function () {
  modalBg.classList.remove("modal-active");
});
