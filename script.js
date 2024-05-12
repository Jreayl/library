const myLibrary = new Library();

myLibrary.addBook(
  new Book("Dune", "Frank Herbert", 896, true, [
    "SciFi",
    "Space",
    "Political Drama",
  ])
);

/* Header elements */
const searchInput = document.querySelector(".search > input");
const addBtn = document.querySelector(".add");
const clearBtn = document.querySelector(".clear");

/* Modal elements */
const addBookModal = document.querySelector(".modal");
const addBookModalConfirm = document.querySelector(".modal button");
const closeBookModal = document.querySelector(".modal-content span");
const form = document.querySelector("form");

/* Main elements */
const libraryGrid = document.querySelector(".library-grid");

window.addEventListener("load", displayBooks(myLibrary.getBooks()));

window.addEventListener("click", (event) => {
  if (event.target == addBookModal) {
    hideModal();
  }
});

searchInput.addEventListener("input", filterBooks);

addBtn.addEventListener("click", showModal);

clearBtn.addEventListener("click", () => {
  myLibrary.removeAllBooks();
  clearBooks();
});

closeBookModal.addEventListener("click", hideModal);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  clearModal();
  hideModal();
});

function clearBooks() {
  libraryGrid.innerText = "";
}

function displayBooks(books) {
  libraryGrid.innerHTML = "";
  books.forEach((book) => {
    libraryGrid.appendChild(createBookMarkup(book));
  });
}

function filterBooks(event) {
  if (event.target.value === "") {
    displayBooks(myLibrary.getBooks());
    return;
  }

  const searchQuery = event.target.value.toLowerCase();
  const books = [];

  for (let i = 0; i < myLibrary.getBooks().length; i++) {
    let title = myLibrary.getBooks()[i].getTitle().toLowerCase();
    let author = myLibrary.getBooks()[i].getAuthor().toLowerCase();
    let pages = myLibrary.getBooks()[i].getPages().toString().toLowerCase();
    let tags = myLibrary
      .getBooks()
      [i].getTags()
      .map((tag) => tag.toLowerCase());

    if (
      title.includes(searchQuery) ||
      author.includes(searchQuery) ||
      pages.includes(searchQuery) ||
      tags.some((tag) => tag.includes(searchQuery))
    ) {
      books.push(myLibrary.getBooks()[i]);
    }
  }

  displayBooks(books);
}

function createBookMarkup(book) {
  const element = document.createElement("div");
  element.setAttribute("class", "book");
  element.setAttribute("data-id", book.getID());

  const remove = document.createElement("span");
  remove.classList.add("book-remove");
  remove.innerHTML = "&times;";
  element.appendChild(remove);

  const title = document.createElement("span");
  title.classList.add("book-title");
  title.innerText = book.getTitle();
  element.appendChild(title);

  const author = document.createElement("span");
  author.classList.add("book-author");
  author.innerText = book.getAuthor();
  element.appendChild(author);

  const pages = document.createElement("span");
  pages.classList.add("book-pages");
  pages.innerText = book.getPages();
  element.appendChild(pages);

  const isRead = document.createElement("div");
  isRead.classList.add("book-read");

  const svgBookOpen = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
    <title>You've read this book!</title>
    <path d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152V512l-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427V224c0-17.7 14.3-32 32-32H62.3c63.6 0 125.6 19.6 177.7 56zm32 264V248c52.1-36.4 114.1-56 177.7-56H480c17.7 0 32 14.3 32 32V427c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z"/>
  </svg>`;

  isRead.innerHTML = book.getIsRead() ? svgBookOpen : "";
  element.appendChild(isRead);

  return element;
}

function hideModal() {
  addBookModal.style.display = "none";
}

function showModal() {
  addBookModal.style.display = "block";
}

function clearModal() {
  form.reset();
}

function addBookToLibrary() {
  const titleInput = document.querySelector(".modal #title").value;
  const authorInput = document.querySelector(".modal #author").value;
  const pagesInput = document.querySelector(".modal #pages").value;

  const readInput =
    document.querySelector(".modal-radio input[name=read]:checked").id === "yes"
      ? true
      : false;

  const tagsInput = document
    .querySelector(".modal #tags")
    .value.split(",")
    .map((tag) => tag.toLowerCase());

  const book = new Book(
    titleInput,
    authorInput,
    pagesInput,
    readInput,
    tagsInput
  );

  myLibrary.addBook(book);
  libraryGrid.appendChild(createBookMarkup(book));
}
