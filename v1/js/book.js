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
  const titleText = document.createElement("h2");
  titleText.innerText = title;

  const authorText = document.createElement("p");
  authorText.innerText = "Penulis : ";
  authorText.innerHTML += `<span>${author}</span>`;

  const yearText = document.createElement("p");
  yearText.innerText = "Tahun : ";
  yearText.innerHTML += `<span>${year}</span>`;

  const container = document.createElement("article");
  container.classList.add("book_item");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("action");

  if (isComplete) {
    buttonContainer.append(createUnfinishedButton(), createTrashButton());
  } else {
    buttonContainer.append(createFinishedButton(), createTrashButton());
  }

  container.append(titleText, authorText, yearText, buttonContainer);

  return container;
};

const createButton = (buttonNamedClass, buttonText, eventListener) => {
  const button = document.createElement("button");
  button.innerText = buttonText;
  button.classList.add(buttonNamedClass);

  button.addEventListener("click", function (event) {
    eventListener(event);
  });

  return button;
};

const createFinishedButton = () => {
  return createButton("green", "Selesai dibaca", function (event) {
    addBookFinished(event.target.parentElement.parentElement);
  });
};

const createTrashButton = () => {
  return createButton("red", "Hapus buku", function (event) {
    removeBookList(event.target.parentElement.parentElement);
  });
};

const createUnfinishedButton = () => {
  return createButton("green", "Belum selesai di Baca", function (event) {
    addBookUnfinished(event.target.parentElement.parentElement);
  });
};

const addBookFinished = (book) => {
  const FinishedBookList = document.getElementById(FINISHED_BOOKSHELF_LIST);
  const text = document.querySelectorAll(".book_item > p");

  const bookTitle = document.querySelector(".book_item > h2").innerText;
  const bookAuthor = text[0].querySelector("span").innerText;
  const bookYear = text[1].querySelector("span").innerText;

  const newBook = makeABook(bookTitle, bookAuthor, bookYear, true);
  const bookId = findBook(book[BOOK_ID]);
  bookId.isCompleted = true;
  newBook[BOOK_ID] = bookId.id;

  FinishedBookList.append(newBook);
  book.remove();

  updateStorage();
};

const addBookUnfinished = (book) => {
  const unfinishedBookList = document.getElementById(UNFINISHED_BOOKSHELF_LIST);
  const text = document.querySelectorAll(".book_item > p");

  const bookTitle = document.querySelector(".book_item > h2").innerText;
  const bookAuthor = text[0].querySelector("span").innerText;
  const bookYear = text[1].querySelector("span").innerText;

  const newBook = makeABook(bookTitle, bookAuthor, bookYear, false);

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

const searchBook = () => {
  searchByTitle = document
    .getElementById("searchBookTitle")
    .value.toLowerCase();
  titles = document.querySelectorAll(".book_item > h2");

  if (titles.length === 0) {
    alert("Sorry, your bookshelf is empty");
  }

  for (const title of titles) {
    title.parentElement.setAttribute("hidden", true);

    if (title.innerText.toLowerCase().includes(searchByTitle)) {
      title.parentElement.removeAttribute("hidden");
    }
  }
};
