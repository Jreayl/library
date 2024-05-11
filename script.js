const myLibrary = new Library();

const addBtn = document.querySelector(".add");
const clearBtn = document.querySelector(".clear");
const addBookModal = document.querySelector(".modal");

window.addEventListener("load", displayBooks);
// addBtn.addEventListener("click", displayAddBookModal);

myLibrary.addBook(
  new Book("Dune", "Frank Herbert", 896, true, [
    "SciFi",
    "Space",
    "Desert",
    "Political",
  ])
);

myLibrary.addBook(
  new Book("Red Rising", "Pierce Brown", 416, false, [
    "Space",
    "SciFi",
    "Mars",
    "Slavery",
  ])
);

myLibrary.addBook(
  new Book("Red Rising", "Pierce Brown", 416, false, [
    "Space",
    "SciFi",
    "Mars",
    "Slavery",
  ])
);

myLibrary.addBook(
  new Book("Red Rising", "Pierce Brown", 416, false, [
    "Space",
    "SciFi",
    "Mars",
    "Slavery",
  ])
);

myLibrary.addBook(
  new Book("Red Rising", "Pierce Brown", 416, false, [
    "Space",
    "SciFi",
    "Mars",
    "Slavery",
  ])
);

function displayBooks() {
  const libraryGrid = document.querySelector(".library-grid");
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
