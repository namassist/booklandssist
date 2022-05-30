document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("inputBook");
  const search = document.getElementById("searchBook");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
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
