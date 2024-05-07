export class Book {
  constructor(title, author, pages, isRead, tags) {
    this.id = generateUniqueID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.tags = tags;
  }

  generateUniqueID() {
    return Date.now() + Math.random();
  }

  getID() {
    return this.id;
  }
}
