const FINISHED_BOOKSHELF_LIST = "completeBookshelfList";
const UNFINISHED_BOOKSHELF_LIST = "incompleteBookshelfList";
const BOOK_ID = "itemId";

const addBook = () => {
  const finishedBookList = document.getElementById(FINISHED_BOOKSHELF_LIST);
  const unfinishedBookList = document.getElementById(UNFINISHED_BOOKSHELF_LIST);

  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  const book = makeABook(title, author, year, isComplete);
  const bookId = composeBookshelf(title, author, year, isComplete);

  book[BOOK_ID] = bookId.id;
  books.push(bookId);

  if (isComplete) {
    finishedBookList.append(book);
  } else {
    unfinishedBookList.append(book);
  }

  updateStorage();
};

const makeABook = (title, author, year, isComplete) => {
  const img = document.createElement("img");
  img.setAttribute("src", "img/img.jpg");
  img.setAttribute("width", "200");
  img.setAttribute(
    "alt",
    `<a href="http://www.freepik.com">Designed by Freepik</a>`
  );
  img.classList.add("img-thumbnail", "rounded", "mb-3");

  const titleText = document.createElement("h3");
  titleText.innerText = title;

  const authorText = document.createElement("p");
  authorText.innerText = "Penulis : ";
  authorText.innerHTML += `<span>${author}</span>`;

  const yearText = document.createElement("p");
  yearText.innerText = "Tahun : ";
  yearText.innerHTML += `<span>${year}</span>`;

  const container = document.createElement("article");
  container.classList.add(
    "book_item",
    "col-lg-3",
    "col-md-3",
    "col-xs-12",
    "mb-5",
    "text-center"
  );

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("action");

  if (isComplete) {
    buttonContainer.append(
      createUnfinishedButton(),
      createEditButton(),
      createTrashButton()
    );
  } else {
    buttonContainer.append(
      createFinishedButton(),
      createEditButton(),
      createTrashButton()
    );
  }

  container.append(img, titleText, authorText, yearText, buttonContainer);

  return container;
};

const createButton = (buttonColor, textButton, eventListener) => {
  const button = document.createElement("button");
  button.innerText = textButton;
  button.classList.add("btn", "btn-sm", "me-1", buttonColor);

  button.addEventListener("click", function (event) {
    eventListener(event);
  });

  return button;
};

const createFinishedButton = () => {
  return createButton("btn-success", "finished", function (event) {
    addBookFinished(event.target.parentElement.parentElement);
  });
};

const createUnfinishedButton = () => {
  return createButton("btn-primary", "unfinished", function (event) {
    addBookUnfinished(event.target.parentElement.parentElement);
  });
};

const createEditButton = () => {
  return createButton("btn-warning", "edit", function (event) {
    editBookList(event.target.parentElement.parentElement);
  });
};

const createTrashButton = () => {
  return createButton("btn-danger", "deleted", function (event) {
    removeBookList(event.target.parentElement.parentElement);
  });
};

const addBookFinished = (book) => {
  console.log(book);
  const finishedBookList = document.getElementById(FINISHED_BOOKSHELF_LIST);
  const text = book.querySelectorAll(".book_item > p");
  console.log(text);

  const bookTitle = book.querySelector(".book_item > h3").innerText;
  const bookAuthor = text[0].querySelector("span").innerText;
  const bookYear = text[1].querySelector("span").innerText;
  console.log(bookTitle);
  console.log(bookAuthor);
  console.log(bookYear);

  const newBook = makeABook(bookTitle, bookAuthor, bookYear, true);
  console.log(newBook);

  const bookId = findBook(book[BOOK_ID]);
  bookId.isCompleted = true;
  newBook[BOOK_ID] = bookId.id;

  finishedBookList.append(newBook);
  book.remove();

  updateStorage();
};

const addBookUnfinished = (book) => {
  const unfinishedBookList = document.getElementById(UNFINISHED_BOOKSHELF_LIST);
  const text = book.querySelectorAll(".book_item > p");
  console.log(text);

  const bookTitle = book.querySelector(".book_item > h3").innerText;
  const bookAuthor = text[0].querySelector("span").innerText;
  const bookYear = text[1].querySelector("span").innerText;
  console.log(bookTitle);
  console.log(bookAuthor);
  console.log(bookYear);

  const newBook = makeABook(bookTitle, bookAuthor, bookYear, false);
  console.log(newBook);

  const bookId = findBook(book[BOOK_ID]);
  bookId.isCompleted = false;
  newBook[BOOK_ID] = bookId.id;

  unfinishedBookList.append(newBook);
  book.remove();

  updateStorage();
};

const removeBookList = (book) => {
  const message = confirm("do you really want to delete the book?");

  if (message) {
    const positionBook = findBookIndex(book[BOOK_ID]);
    books.splice(positionBook, 1);

    book.remove();
  }

  updateStorage();
};

const editBookList = (book) => {
  showModal();

  const bookId = findBook(book[BOOK_ID]);
  const editBook = putFormValue(bookId);

  const edit = document.getElementById("editBook");
  edit.addEventListener("click", function (event) {
    event.preventDefault();
    submitEdit(editBook);
  });
};

const showModal = () => {
  const modalBg = document.querySelector(".modal-edit-bg");
  const modalClose = document.querySelector(".modal-edit-close");

  modalBg.classList.add("modal-active");
  console.log(btnModal);
  console.log(modalBg);

  modalClose.addEventListener("click", function () {
    modalBg.classList.remove("modal-active");
  });
};

const putFormValue = (bookId) => {
  const title = document.querySelector(".modal-edit-bg #inputBookTitle");
  title.value = bookId.title;

  const author = document.querySelector(".modal-edit-bg #inputBookAuthor");
  author.value = bookId.author;

  const year = document.querySelector(".modal-edit-bg #inputBookYear");
  year.value = bookId.year;

  return bookId;
};

const submitEdit = (book) => {
  console.log(book);
};

const searchBook = () => {
  searchByTitle = document
    .getElementById("searchBookTitle")
    .value.toLowerCase();
  titles = document.querySelectorAll(".book_item > h3");
  let results = [];

  if (titles.length === 0) {
    alert("Sorry, your bookshelf is empty");
  }

  for (const title of titles) {
    title.parentElement.setAttribute("hidden", true);

    if (title.innerText.toLowerCase().includes(searchByTitle)) {
      results.push(title);
      title.parentElement.removeAttribute("hidden");
    }
  }
  if (results.length != 0) {
    alert(`${results.length} book found!`);
  } else {
    alert(`Sorry, no books found!`);
  }
};
