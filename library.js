class Library {
  constructor() {
    this.books = [];
    this.prevBooks = [];
  }

  addBook(book) {
    this.books.push(book);
    this.prevBooks.push(book);
  }

  removeBook(book) {
    const newBooks = this.books.filter((b) => b.id !== book.id);
    const newPrevBooks = this.books.filter((b) => b.id !== book.id);
    this.books = newBooks;
    this.prevBooks = newPrevBooks;
  }

  getBooks() {
    return this.books;
  }

  setBooks(books) {
    this.books = books;
  }

  restore() {
    this.books = this.prevBooks;
  }

  removeAllBooks() {
    this.books = [];
  }
}
