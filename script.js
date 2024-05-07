import { Book } from "./book";
import { Library } from "./library";

const myLibrary = new Library();

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

/*                     “In the case of good books, the point is not to see how many
                    of them you can get through, but rather how many can get
                    through to you.” */
