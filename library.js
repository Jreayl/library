class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(book) {
    const newBooks = this.books.filter((b) => b.id !== book.id);
    this.books = newBooks;
  }

  getBooks() {
    return this.books;
  }

  removeAllBooks() {
    this.books = [];
  }
}
