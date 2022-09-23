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
  const formData = new FormData(e.target);
  console.log(formData.get('title'));

  let isRead = false;
  if (document.getElementById('#is-read:checked') == null) isRead = true;
  addBookToLibrary(
    formData.get('title'),
    formData.get('author'),
    Number(formData.get('page-count')),
    isRead
  );
}

function assignListeners() {
  const newBookButton = document.querySelector('#new-book');
  newBookButton.addEventListener('click', toggleNewBookMenu, false);

  const resetReturn = document.querySelector('#return');
  resetReturn.addEventListener('click', toggleNewBookMenu, false);


  // Form validation

  const isNotEmpty = (e, elems) => {
    e.preventDefault();
    let noneEmpty = true;
    elems.forEach(el => {
      if (el.validity.valueMissing) {
        el.setCustomValidity('Field must not be empty.');
        el.reportValidity();
        noneEmpty = false;
      } else {
        el.setCustomValidity('');
      }
    });
    if (noneEmpty) {
      toggleNewBookMenu();
      createNewBook(e);
      e.currentTarget.reset();
      displayBooks();
    }
  }

  const submitNewBook = document.querySelector('#new-book-form');
  submitNewBook.addEventListener('submit', (e) => {
    isNotEmpty(
      e,
      [
      document.getElementById('title'),
      document.getElementById('author'),
      document.getElementById('page-count')
      ]
    );
  }, false)
}

function addPresetBooks() {
  addBookToLibrary('Twilight', 'Linda Mcartney', 501, false);
  addBookToLibrary('An Idiot Abroad', 'Karl Pilkington', 227, false)
  addBookToLibrary('A Brief History of Time', 'Stephen Hawking', 365, false)
}

function init() {
  assignListeners();
  addPresetBooks();
  displayBooks();
}

init();