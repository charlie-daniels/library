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
