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

