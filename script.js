const myLibrary = new Library();

/* Header elements */
const addBtn = document.querySelector(".add");
const clearBtn = document.querySelector(".clear");

/* Modal elements */
const addBookModal = document.querySelector(".modal");
const addBookModalConfirm = document.querySelector(".modal button");
const closeBookModal = document.querySelector(".modal-content span");
const form = document.querySelector("form");

/* Library */
const libraryGrid = document.querySelector(".library-grid");

window.addEventListener("load", displayBooks);

window.addEventListener("click", (event) => {
  if (event.target == addBookModal) {
    hideModal();
  }
});

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

function displayBooks() {
  myLibrary.getBooks().forEach((book) => {
    libraryGrid.appendChild(createBookMarkup(book));
  });
}

function createBookMarkup(book) {
  const element = document.createElement("div");
  element.setAttribute("class", "book");
  element.setAttribute("data-id", book.getID());

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
  const svgBookmarkCheck = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>Read</title>
        <path class="isRead" d="M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,14L17.25,7.76L15.84,6.34L11,11.18L8.41,8.59L7,10L11,14Z" />
    </svg>`;
  const svgBookmarkMinus = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <title>Not read</title>
      <path d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3M15,11H9V9H15V11Z" />
    </svg>`;

  isRead.innerHTML = book.getIsRead() ? svgBookmarkCheck : svgBookmarkMinus;
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
