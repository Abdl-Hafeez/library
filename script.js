const newBookBtn = document.querySelectorAll('.new-book-btn');
const container = document.querySelector('.container');
const dialog = document.querySelector('dialog');
const closeBtn = document.querySelector('.close-dialog-btn');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const yearOfPubInput = document.querySelector('#year-of-pub');
const categoryInput = document.querySelector('#category');
const pagesInput = document.querySelector('#pages');
const readStatusInput = document.querySelector('#read');
const summaryInput = document.querySelector('#summary');
const closeDialogBtn = document.querySelectorAll('.close-dialog-btn');
const addBtn = document.querySelector('.add');
const removeBtn = document.querySelector('.remove');

const library = [];

function Book(title, author, yearOfPub, category, pages, readStatus, summary, dateAdded) {
    this.title = title;
    this.author = author;
    this.yearOfPub = yearOfPub;
    this.category = category;
    this.pages = pages;
    this.readStatus = readStatus;
    this.summary = summary;
    this.dateAdded = dateAdded;
}

function createAndAddBookToLibrary(title, author, yearOfPub, category, pages, readStatus, summary, dateAdded) {
    const newBook = new Book(title, author, yearOfPub, category, pages, readStatus, summary, dateAdded);
    library.push(newBook);
    console.log(library);
}

function displayBooks() {
    const existingBooks = document.querySelectorAll('.book-card')
    existingBooks.forEach((element) => {
        element.remove();
    })
    library.forEach((item) => {
        const bookEl = document.createElement('div');
        bookEl.classList.add('book');
        bookEl.innerHTML = `
        <h2 class='book-header'>${item.title}</h2>
        <p class='author'>${item.author}</p>
        <p class='year-of-pub'>${item.yearOfPub}</p>
        <p class='category'>Category: ${item.category}</p>
        <p class='pages'>${item.pages} pages.</p>
        <p class='summary'>${item.summary}</p>
        <div class='book-footer'>
            <p class='date-added'>Updated on ${item.dateAdded}</p>
            <button type="button" class="remove">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>remove</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
            </button>
        </div>
        `
        // const editBtn = document.createElement('button');
        // editBtn.textContent = 'Edit';
        // editBtn.classList.add('edit');
        // bookEl.appendChild(editBtn);
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
    createAndAddBookToLibrary(titleInput.value, authorInput.value, yearOfPubInput.value, categoryInput.value, pagesInput.value, readStatusInput.checked, summaryInput.value, addedDate);
    displayBooks();
    resetForm();
    dialog.close();
});
