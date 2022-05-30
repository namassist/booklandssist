const KEY_STORAGE = "BOOKSHELF_APPS";

let books = [];

const isStorageExist = () => {
  if (typeof Storage == "undefined") {
    alert("Sorry, the browser doesn't support web storage");
    return false;
  }

  return true;
};

const composeBookshelf = (title, author, year, isCompleted) => {
  return {
    id: +new Date(),
    title: title,
    author: author,
    year: year,
    isCompleted: isCompleted,
  };
};

const saveBook = () => {
  const parse = JSON.stringify(books);
  localStorage.setItem("BOOKSHELF_APPS", parse);
  document.dispatchEvent(new Event("ondatasaved"));
};

const loadBookFromStorage = () => {
  const bookData = localStorage.getItem("BOOKSHELF_APPS");

  const data = JSON.parse(bookData);

  if (data !== null) {
    books = data;
  }

  document.dispatchEvent(new Event("ondataloaded"));
};

const updateStorage = () => {
  if (isStorageExist()) {
    saveBook();
  }
};

const findBook = (bookId) => {
  for (const book of books) {
    if (book.id === bookId) {
      return book;
    }
  }
  return null;
};

const findBookIndex = (bookId) => {
  let index = 0;
  for (const book of books) {
    if (book.id === bookId) {
      return index;
    }
    index++;
  }

  return -1;
};

const reloadDataFromStorage = () => {
  const finishedBookList = document.getElementById(FINISHED_BOOKSHELF_LIST);
  const unfinishedBookList = document.getElementById(UNFINISHED_BOOKSHELF_LIST);

  for (const book of books) {
    const newBook = makeABook(
      book.title,
      book.author,
      book.year,
      book.isCompleted
    );

    newBook[BOOK_ID] = book.id;

    if (book.isCompleted) {
      finishedBookList.append(newBook);
    } else {
      unfinishedBookList.append(newBook);
    }
  }
};
