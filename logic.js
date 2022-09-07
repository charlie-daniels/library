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
  myLibrary.map((b, index) => {
    const newTile = document.createElement('div');
    newTile.classList.add('book', `data-index=${index}`);

    const bookInfo = document.createElement('p');
    bookInfo.textContent = b.info();
    const t = newTile.appendChild(bookInfo)
    
    container.appendChild(newTile);
  });
}

function showCreateBookMenu() {
  const menu = document.querySelector('.hidden');
  menu.classList.remove('hidden');
}

function createBook(event) {

}

function assignListeners() {
  const newBookButton = document.querySelector('#new-book');
  newBookButton.addEventListener('click', showCreateBookMenu);
} assignListeners();

// tests
 
function addTestBooks() {
  addBookToLibrary('Twilight', 'Linda Mcartney', 501, false);
  addBookToLibrary('An Idiot Abroad', 'Carl Pilkington', 227, false)
  addBookToLibrary('A Brief History of Time', 'Stephen Hawking', 365, false)
}

addTestBooks();
displayBooks();