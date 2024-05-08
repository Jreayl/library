const myLibrary = new Library();

window.addEventListener("load", displayBooks);

myLibrary.addBook(
  new Book("Dune", "Frank Herbert", 896, false, [
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
  title.innerText = book.getTitle();
  element.appendChild(title);

  const author = document.createElement("span");
  author.innerText = book.getAuthor();
  element.appendChild(author);

  const pages = document.createElement("span");
  pages.innerText = book.getPages();
  element.appendChild(pages);

  return element;
}
