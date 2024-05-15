const myLibrary = new Library();

myLibrary.addBook(
  new Book("Dune", "Frank Herbert", 896, true, [
    "SciFi",
    "Space",
    "Political Drama",
  ])
);

myLibrary.addBook(
  new Book("To Kill a Mockingbird", "Harper Lee", 281, true, [
    "Classic",
    "Fiction",
    "Legal Drama",
  ])
);

myLibrary.addBook(
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false, [
    "Classic",
    "Fiction",
    "Romance",
  ])
);

myLibrary.addBook(
  new Book("The Hobbit", "J.R.R. Tolkien", 310, true, [
    "Fantasy",
    "Adventure",
    "Middle-earth",
  ])
);

myLibrary.addBook(
  new Book("Pride and Prejudice", "Jane Austen", 279, false, [
    "Classic",
    "Romance",
    "Social Commentary",
  ])
);

/* Main elements */
const libraryGrid = document.querySelector(".library-grid");

/* Window */
window.addEventListener("load", () => {
  displayBooks(myLibrary.getBooks());
});
window.addEventListener("click", (event) => {
  if (event.target === addBookModal) {
    hideModal();
  } else if (!sortBtn.contains(event.target)) {
    dropdownSort.classList.replace("show", "hidden");
  }
});

/* Header elements */
const searchInput = document.querySelector(".search > input");
const sortBtn = document.querySelector(".sort");
const addBtn = document.querySelector(".add");
const clearBtn = document.querySelector(".clear");
const dropdownSort = document.querySelector(".dropdown-sort");
const dropdownSortAllBooks = document.querySelector(
  ".dropdown-item:nth-child(1)"
);
const dropdownSortIsRead = document.querySelector(
  ".dropdown-item:nth-child(2)"
);
const dropdownSortNotRead = document.querySelector(
  ".dropdown-item:nth-child(3)"
);
const dropdownSortMostPages = document.querySelector(
  ".dropdown-item:nth-child(4)"
);
const dropdownSortLeastPages = document.querySelector(
  ".dropdown-item:nth-child(5)"
);
const dropdownSortRecentlyAdded = document.querySelector(
  ".dropdown-item:nth-child(6)"
);
searchInput.addEventListener("input", (event) => {
  displayBooks(filterBooks(event));
});
sortBtn.addEventListener("click", () => {
  if (dropdownSort.classList.contains("hidden")) {
    dropdownSort.classList.replace("hidden", "show");
  } else {
    dropdownSort.classList.replace("show", "hidden");
  }
});
addBtn.addEventListener("click", showModal);
clearBtn.addEventListener("click", () => {
  myLibrary.removeAllBooks();
  clearBooks();
});
dropdownSortAllBooks.addEventListener("click", () => {
  myLibrary.restoreBooks();
  displayBooks(myLibrary.getBooks());
});
dropdownSortIsRead.addEventListener("click", () => {
  displayBooks(
    myLibrary.getBooks().sort((b, a) => a.getIsRead() - b.getIsRead())
  );
});
dropdownSortNotRead.addEventListener("click", () => {
  displayBooks(
    myLibrary.getBooks().sort((a, b) => a.getIsRead() - b.getIsRead())
  );
});
dropdownSortLeastPages.addEventListener("click", () => {
  displayBooks(
    myLibrary.getBooks().sort((b, a) => a.getPages() < b.getPages())
  );
});
dropdownSortMostPages.addEventListener("click", () => {
  displayBooks(
    myLibrary.getBooks().sort((b, a) => a.getPages() > b.getPages())
  );
});
dropdownSortRecentlyAdded.addEventListener("click", () => {
  displayBooks([...myLibrary.getPrevBooks()].reverse());
});

/* Modal elements */
const addBookModal = document.querySelector(".modal");
const addBookModalConfirm = document.querySelector(".modal button");
const closeBookModal = document.querySelector(".modal-content span");
const form = document.querySelector("form");
closeBookModal.addEventListener("click", hideModal);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  clearModal();
  hideModal();
});

function clearBooks() {
  libraryGrid.innerText = "";
  myLibrary.length = 0;
}

function displayBooks(books) {
  libraryGrid.innerHTML = "";
  books.forEach((book) => {
    libraryGrid.appendChild(createBookMarkup(book));
  });
}

function filterBooks(event) {
  const searchQuery = event.target.value.toLowerCase();

  // Display default library with no search input
  if (searchQuery === "") {
    return myLibrary.getBooks();
  }

  const filteredBooks = [];

  for (let i = 0; i < myLibrary.getBooks().length; i++) {
    let title = myLibrary.getBooks()[i].getTitle().toLowerCase();
    let author = myLibrary.getBooks()[i].getAuthor().toLowerCase();
    let pages = myLibrary.getBooks()[i].getPages().toString();
    let tags = myLibrary
      .getBooks()
      [i].getTags()
      .map((tag) => tag.toLowerCase());

    // If search query shows in title, book, pages, or any tags,
    // add it to array of books to be displayed
    if (
      title.includes(searchQuery) ||
      author.includes(searchQuery) ||
      pages.includes(searchQuery) ||
      tags.some((tag) => tag.includes(searchQuery))
    ) {
      filteredBooks.push(myLibrary.getBooks()[i]);
    }
  }

  return filteredBooks;
}

function createBookMarkup(book) {
  const element = document.createElement("div");
  element.setAttribute("class", "book");
  element.setAttribute("data-id", book.getID());

  const remove = document.createElement("div");
  const removeSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
    <title>Remove book</title>
    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
  </svg>`;
  remove.classList.add("book-remove");
  remove.classList.add("hidden");
  remove.addEventListener("click", () => {
    myLibrary.removeBook(book);
    displayBooks(myLibrary.getBooks());
  });
  remove.innerHTML = removeSvg;
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
    <title>You've read this book!</title>
    <path class="isRead" d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z"/>
  </svg>`;

  const svgBookClosed = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
    <title>You have not read this book.</title>
    <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
  </svg>`;

  isRead.innerHTML = book.getIsRead() ? svgBookOpen : svgBookClosed;
  isRead.addEventListener("click", () => {
    book.setIsRead(!book.getIsRead());
    isRead.innerHTML = book.getIsRead() ? svgBookOpen : svgBookClosed;
  });
  element.appendChild(isRead);

  element.addEventListener("mouseleave", () => {
    remove.classList.add("hidden");
  });

  element.addEventListener("mouseover", () => {
    remove.classList.remove("hidden");
  });

  return element;
}

function hideModal() {
  addBookModal.classList.replace("show", "hidden");
}

function showModal() {
  addBookModal.classList.replace("hidden", "show");
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
