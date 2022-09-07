let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = () => {
        let info = `${this.title} by ${this.author}, ${this.pages} pages, `;
        if (this.isRead) return info += 'unread';
        return info += 'read';
    };
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function displayBooks() {
  const container = document.querySelector('.books');
  container.innerHTML = ''; // Clear previous set of tiles
  myLibrary.map((b, index) => {
    const bookInfo = document.createElement('p');
    bookInfo.textContent = b.info();
    
    const newTile = document.createElement('div');
    newTile.classList.add('book', `data-index=${index}`);
    newTile.appendChild(bookInfo)

    container.appendChild(newTile);
  });
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
} assignListeners();

// tests
 
function addTestBooks() {
  addBookToLibrary('Twilight', 'Linda Mcartney', 501, false);
  addBookToLibrary('An Idiot Abroad', 'Karl Pilkington', 227, false)
  addBookToLibrary('A Brief History of Time', 'Stephen Hawking', 365, false)
}

addTestBooks();
displayBooks();