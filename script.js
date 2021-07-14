let myLibrary = [];
let currLibrarySize = 0;
const maxLibrarySize = 12;

const newBookBtn = document.querySelector('.new-book-btn');
const closeFormBtn = document.querySelector('#close-form-btn');
const addBookBtn = document.querySelector('#add-book-btn');

newBookBtn.addEventListener('click', openNewBookForm);
closeFormBtn.addEventListener('click', closeNewBookForm);
addBookBtn.addEventListener('click', getNewBookFormData);

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = function() {
            let isRead = (read === true) ? 'read' : 'not read yet';
            return `${title} by ${author}, ${pages} pages long, ${isRead}.`;
        };
    }
}

function addBookToLibrary(book) {
    if (currLibrarySize === maxLibrarySize) return;
    addBookToTable(book);
    myLibrary.push(book);
    currLibrarySize++;
}

function addBookToTable(book) {
    let table = document.querySelector('#table');
    let row = table.insertRow(currLibrarySize + 1);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    let cell5 = row.insertCell(5);
    cell0.innerText = book.title;
    cell1.innerText = book.author;
    cell2.innerText = book.pages;
    cell3.innerText = book.read;  // change to slider
    cell4.appendChild(createReadStatusBtn());
    cell5.appendChild(createRemoveBtn());
}

function changeBookReadStatus(e) {
    let idx = document.getElementById(e.target.id).getAttribute('data-library-idx');
    let table = document.getElementById('table');
    let tableRows = table.rows;
    tableRowsArray = Array.from(tableRows);
    let tableRowsChildren = tableRowsArray[Number(idx) + 1].children;
    tableRowsChildren = Array.from(tableRowsChildren);


    console.log(tableRowsArray[Number(idx) + 1]);
    console.log(tableRowsChildren[3]);

    if (myLibrary[idx].read === true) {
        myLibrary[idx].read = false;
        tableRowsChildren[3].innerText = 'false';
    }
    else if (myLibrary[idx].read === false) {
        myLibrary[idx].read = true;
        tableRowsChildren[3].innerText = 'true';
    }
}

function createRemoveBtn() {
    let btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'remove-book-btn' + currLibrarySize;
    btn.innerText = 'remove';
    btn.style.width = '75px';
    btn.style.height = '25px';
    btn.setAttribute('data-library-idx', currLibrarySize);
    btn.addEventListener('click', (e) => removeBookFromLibrary(e));
    return btn;
}

function createReadStatusBtn() {
    let btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'read-status-btn' + currLibrarySize;
    btn.innerText = 'read?';
    btn.style.width = '75px';
    btn.style.height = '25px';
    btn.setAttribute('data-library-idx', currLibrarySize);
    btn.addEventListener('click', (e) => changeBookReadStatus(e));
    return btn;
}

function removeBookFromLibrary(e) {
    let idx = document.getElementById(e.target.id).getAttribute('data-library-idx');
    removeBookFromTable(Number(idx) + 1);
    myLibrary.splice(Number(idx), 1);
    currLibrarySize--;
}

function removeBookFromTable(idx) {
    console.log('idx:'+idx);
    let table = document.getElementById('table');
    table.deleteRow(idx);
    let tableRows = table.rows;
    let tableRwsArr = Array.from(tableRows);
    console.log(tableRwsArr.length);
    for (let i = 1; i < tableRwsArr.length; i++) {
        let btn = tableRwsArr[i].lastChild.firstChild;
        btn.setAttribute('data-library-idx', (i - 1));
    } 
}

function openNewBookForm() {
    document.getElementById('new-book-form').style.display = 'block';
}

function closeNewBookForm() {
    document.getElementById('new-book-form').style.display = "none";
}

function getNewBookFormData() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector('#read').checked;

    addBookToLibrary(new Book(title, author, pages, read));
}

// const dune = new Book('Dune', 'Frank Herbert', 850, false);
// const lotr = new Book('Lord of the Rings', 'J.R.R Tolkien', 900, false);
// const harryPotter = new Book('Harry Potter', 'J.K. Rowling', 750, true);

// addBookToLibrary(dune);
// addBookToLibrary(lotr);
// addBookToLibrary(harryPotter);
// displayBooks();
