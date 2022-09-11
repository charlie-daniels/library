let myLibrary = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
  info() {
    let info = [this.title,' ' ,this.author, `${this.pages} pages`];
    if (this.isRead) info.push('Unread');
    else info.push('Read');
    return info;
  };
  toggleReadStatus() {
    this.isRead = !this.isRead;
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function toggleReadStatusText(book, target) {
  if (book.isRead) target.textContent = 'Finish';
  else target.textContent = 'Unfinish';
}

function createBookTile(container) {
  myLibrary.map((b, index) => {
    const info = b.info();
    const bookInfo = document.createElement('div');
    info.forEach(line => {
      const bookLine = document.createElement('p');
      bookLine.textContent = line;
      bookInfo.appendChild(bookLine);
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (e) => {
      myLibrary.splice(e.currentTarget.parentNode.dataset.index, 1);
      displayBooks();
    });

    const toggleButton = document.createElement('button');
    toggleReadStatusText(b, toggleButton);
    toggleButton.addEventListener('click', () => {
      b.toggleReadStatus();
      toggleReadStatusText(b, toggleButton);
      displayBooks();
    });

    const newTile = document.createElement('div');
    newTile.classList.add('book');
    newTile.setAttribute('data-index', index);
    newTile.append(bookInfo, deleteButton, toggleButton);

    container.appendChild(newTile);
  });
}

function displayBooks() {
  const container = document.querySelector('.books');
  container.innerHTML = ''; // Clear previous set of tiles
  createBookTile(container);
}

function toggleNewBookMenu() {
  const menu = document.querySelector('#menu-create');
  if (menu.classList.contains('hidden')) menu.classList.remove('hidden');
  else menu.classList.add('hidden');
}

function createNewBook(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  let isRead = false;
  if (document.querySelector('#is-read:checked') == null) isRead = true;
  addBookToLibrary(
    formData.get('title'),
    formData.get('author'),
    Number(formData.get('page-count')),
    isRead
  );
  displayBooks();
  e.currentTarget.reset();
  toggleNewBookMenu();
}

function assignListeners() {
  const newBookButton = document.querySelector('#new-book');
  newBookButton.addEventListener('click', toggleNewBookMenu, false);

  const submitNewBook = document.querySelector('#new-book-form');
  submitNewBook.addEventListener('submit', createNewBook, false)

  const resetReturn = document.querySelector('#return');
  resetReturn.addEventListener('click', toggleNewBookMenu, false);
} assignListeners();

function addPresetBooks() {
  addBookToLibrary('Twilight', 'Linda Mcartney', 501, false);
  addBookToLibrary('An Idiot Abroad', 'Karl Pilkington', 227, false)
  addBookToLibrary('A Brief History of Time', 'Stephen Hawking', 365, false)
}

addPresetBooks();
displayBooks();