const newBookBtn = document.querySelectorAll('.new-book-btn');
const container = document.querySelector('.container');
const dialog = document.querySelector('dialog');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const yearOfPubInput = document.querySelector('#year-of-pub');
const categoryInput = document.querySelector('#category');
const pagesInput = document.querySelector('#pages');
const readStatusInput = document.querySelector('#read');
const summaryInput = document.querySelector('#summary');
const closeDialogBtn = document.querySelectorAll('.close-dialog-btn');
const addBtn = document.querySelector('.add');

const library = [];
let bookCounter = 1;
let editingBookId = null;

function Book(title, author, yearOfPub, category, pages, readStatus, summary, dateAdded, id) {
    this.title = title;
    this.author = author;
    this.yearOfPub = yearOfPub;
    this.category = category;
    this.pages = pages;
    this.readStatus = readStatus;
    this.summary = summary;
    this.dateAdded = dateAdded;
    this.id = id;
}

function createAndAddBookToLibrary(title, author, yearOfPub, category, pages, readStatus, summary, dateAdded) {
    const newBook = new Book(title, author, yearOfPub, category, pages, readStatus, summary, dateAdded, bookCounter++);
    library.push(newBook);
    console.log(library);
}

function displayBooks() {
    const existingBooks = document.querySelectorAll('.user-book');
    existingBooks.forEach((element) => {
        element.remove();
    })
    library.forEach((item) => {
        const bookEl = document.createElement('div');
        bookEl.classList.add('book', 'user-book');
        bookEl.setAttribute('data-id', item.id);
        bookEl.innerHTML = `
        <h2 class='book-header'>${item.title}</h2>
        <hr>
        <p class='author'>${item.author}</p>
        <p class='year-of-pub'>${item.yearOfPub}</p>
        <p class='category'>Category: ${item.category}</p>
        <p class='pages'>${item.pages} pages.</p>
        <p class='summary'>${item.summary}</p>
        <div class='book-footer'>
            <p class='date-added'>Updated on ${item.dateAdded}</p>
            <button type="button" class="edit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>edit</title><path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" /></svg>
            </button>
            <button type="button" class="remove">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>remove</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
            </button>
        </div>
        `
        container.appendChild(bookEl);
    })
}

function resetForm() {
    titleInput.value = '';
    authorInput.value = '';
    yearOfPubInput.value = '';
    categoryInput.selectedIndex = 0;
    pagesInput.value = '';
    readStatusInput.checked = false;
    summaryInput.value = '';
    addBtn.textContent = 'Add';
    editingBookId = null;
}

newBookBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        dialog.showModal();
    })
})

closeDialogBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        dialog.close();
    })
})

addBtn.addEventListener('click', (event) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const addedDate = `${day}-${month}-${year}.`
    event.preventDefault();
    if(editingBookId === null) {
        createAndAddBookToLibrary(titleInput.value, authorInput.value, yearOfPubInput.value, categoryInput.value, pagesInput.value, readStatusInput.checked, summaryInput.value, addedDate);
    } else {
        const bookToUpdate = library.find((book) => {
            return book.id = editingBookId;
        })
        if(bookToUpdate) {
            bookToUpdate.title = titleInput.value;
            bookToUpdate.author = authorInput.value;
            bookToUpdate.yearOfPub = yearOfPubInput.value;
            bookToUpdate.category = categoryInput.value;
            bookToUpdate.pages = pagesInput.value;
            bookToUpdate.readStatus = readStatusInput.checked;
            bookToUpdate.summary = summaryInput.value;
            bookToUpdate.dateAdded = addedDate;
        }
    }
    displayBooks();
    resetForm();
    dialog.close();
});

container.addEventListener("click", function (event) {
    const removeBtn = event.target.closest('.remove')
    if (removeBtn) {
        const bookCard = event.target.closest('.book');
        const bookId = parseInt(bookCard.getAttribute('data-id'));
        const bookIndex = library.findIndex((book) => {
            return book.id === bookId;
        })
        if(bookIndex !== -1) {
            library.splice(bookIndex, 1);
            console.log(library);
        }
        bookCard.remove();
    }

    const editBtn = event.target.closest('.edit');
    if(editBtn) {
        const bookCard = event.target.closest('.book');
        const bookId = parseInt(bookCard.getAttribute('data-id'));
        const bookToEdit = library.find((book) => {
            return book.id === bookId;
        })   
        if(bookToEdit) {
            titleInput.value = bookToEdit.title;
            authorInput.value = bookToEdit.author;
            yearOfPubInput.value = bookToEdit.yearOfPub;
            categoryInput.value = bookToEdit.category;
            pagesInput.value = bookToEdit.pages;
            readStatusInput.checked = bookToEdit.readStatus;
            summaryInput.value = bookToEdit.summary;

            editingBookId = bookToEdit.id;
            addBtn.textContent = 'Save changes';
            dialog.showModal();
        }       
    }
});
