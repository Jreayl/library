class Book {
  constructor(title, author, pages, isRead, tags) {
    this.id = this.convertIDToUniqueString(Date.now() + Math.random());
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.tags = tags;
  }

  convertIDToUniqueString(num) {
    return num.toString().replace(".", "");
  }

  getID() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getAuthor() {
    return this.author;
  }

  getPages() {
    return this.pages;
  }

  getIsRead() {
    return this.isRead;
  }

  getTags() {
    return this.tags;
  }
}
