document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("inputBook");
  const search = document.getElementById("searchBook");
  const modalBg = document.querySelector(".modal-add-bg");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
    alert("Book Added Successfully!");
    modalBg.classList.remove("modal-active");
    form.reset();
  });

  search.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

  if (isStorageExist()) {
    loadBookFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  reloadDataFromStorage();
});
