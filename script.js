const newBookBtn = document.querySelector('.new-book-btn');
const addBookBtn = document.querySelector('#add-book-btn');
const table = document.querySelector('#table');

newBookBtn.addEventListener('click', openCloseForm);
addBookBtn.addEventListener('click', getFormData);

let myLibrary = [];
let currLibrarySize = 0;
const maxLibrarySize = 13;

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = function () {
            let isRead = read === true ? 'read' : 'not read yet';
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
    let row = table.insertRow(currLibrarySize + 1);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    cell0.innerText = book.title;
    cell1.innerText = book.author;
    cell2.innerText = book.pages;
    cell3.appendChild(createReadStatusBtn());
    if (book.read) cell3.firstChild.checked = '1';
    cell4.appendChild(createRemoveBtn());
}

function changeBookReadStatus(e) {
    let idx = document
        .getElementById(e.target.id)
        .getAttribute('data-library-idx');
    let tableRows = table.rows;
    tableRowsArray = Array.from(tableRows);
    let tableRowsChildren = tableRowsArray[Number(idx) + 1].children;
    tableRowsChildren = Array.from(tableRowsChildren);

    console.log(tableRowsArray[Number(idx) + 1]);
    console.log(tableRowsChildren[3]);

    if (myLibrary[idx].read === true) {
        myLibrary[idx].read = false;
        tableRowsChildren[3].value = '0';
    } else if (myLibrary[idx].read === false) {
        myLibrary[idx].read = true;
        tableRowsChildren[3].value = '1';
    }
}

function createRemoveBtn() {
    let btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'remove-book-btn' + currLibrarySize;
    btn.className = 'remove-book-btn';
    btn.innerText = 'remove';
    btn.style.width = '75px';
    btn.style.height = '25px';
    btn.setAttribute('data-library-idx', currLibrarySize);
    btn.addEventListener('click', (e) => removeBookFromLibrary(e));
    return btn;
}

function createReadStatusBtn() {
    let btn = document.createElement('input');
    btn.type = 'checkbox';
    btn.id = 'read-status-btn' + currLibrarySize;
    btn.className = 'read-status-btn';
    btn.value = '0';
    btn.style.width = '75px';
    btn.style.height = '25px';
    btn.setAttribute('data-library-idx', currLibrarySize);
    btn.addEventListener('click', (e) => changeBookReadStatus(e));
    return btn;
}

function removeBookFromLibrary(e) {
    let idx = document
        .getElementById(e.target.id)
        .getAttribute('data-library-idx');
    removeBookFromTable(Number(idx) + 1);
    myLibrary.splice(Number(idx), 1);
    currLibrarySize--;
}

function removeBookFromTable(idx) {
    let tableRwsArr = Array.from(tableRows);
    console.log(tableRwsArr.length);
    for (let i = 1; i < tableRwsArr.length; i++) {
        let btn = tableRwsArr[i].lastChild.firstChild;
        btn.setAttribute('data-library-idx', i - 1);
    }
}

function openCloseForm() {
    let form = document.getElementById('new-book-form');
    if (form.style.display === 'block') {
        form.style.display = 'none';
        resetFormValues();
    } else {
        form.style.display = 'block';
    }
}

function openNewBookForm() {
    document.getElementById('new-book-form').style.display = 'block';
}

function closeNewBookForm() {
    document.getElementById('new-book-form').style.display = 'none';
    resetFormValues();
}

function resetFormValues() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').value = '0';
}

function getFormData() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;

    if (title === '' || author === '' || pages === '' || read === '') {
        alert('All fields must be complete.');
        return;
    }

    addBookToLibrary(new Book(title, author, pages, read));
}
