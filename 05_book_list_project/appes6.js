// Refactored version of app.js using ES6 classes. Also persists data to local storage in the browser

// Book Class
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// UI Class
class UI {
	addBookToList(book) {
		const list = document.getElementById('book-list');
		// Create tr element
		const row = document.createElement('tr');
		// Insert cols
		row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
		list.appendChild(row);
	}

	showAlert(message, className) {
		// Create div
		const div = document.createElement('div');
		// Add classes
		div.className = `alert ${className}`;
		// Add text
		div.appendChild(document.createTextNode(message));
		// Get parent
		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		// Insert alert
		container.insertBefore(div, form);
		// Timeout after 3 seconds
		setTimeout(function() {
			document.querySelector('.alert').remove();
		}, 3000);
	}

	deleteBook(target) {
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove();
			// Instantiate UI
			const ui = new UI();
			// Show Alert
			ui.showAlert('Book Removed from List', 'success');
		}
	}

	clearFields() {
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = '';
	}
}

// Local Storage Class
class Store {
	static getBooks() {
		let books;
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}

	static displayBooks() {
		const books = Store.getBooks();
		books.forEach(function(book) {
			const ui = new UI();
			// Add book to UI
			ui.addBookToList(book);
		});
	}

	static addBook(book) {
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	}

	static removeBook(isbn, index) {
		const books = Store.getBooks();
		books.forEach(function(book) {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});
		localStorage.setItem('books', JSON.stringify(books));
	}
}

// Event Listener for DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks());

// Event Listener for Add Book
document.getElementById('book-form').addEventListener('submit', function(e) {
	// Get form values
	const title = document.getElementById('title').value,
		author = document.getElementById('author').value,
		isbn = document.getElementById('isbn').value;

	// Instatiate book
	const book = new Book(title, author, isbn);

	// Instantiate UI
	const ui = new UI();

	// Validate Inputs
	if (title === '' || author === '' || isbn === '') {
		// Error alert
		ui.showAlert('Please fill in all fields', 'error');
	} else {
		// Add book to list
		ui.addBookToList(book);

		// Add to Local Storage
		Store.addBook(book);

		// Show success alert
		ui.showAlert('Book Added!', 'success');

		// Clear Fields
		ui.clearFields();
	}

	e.preventDefault();
});

// Event Listener for Delete Book
document.getElementById('book-list').addEventListener('click', function(e) {
	// Instantiate UI
	const ui = new UI();
	// Delete Book from UI
	ui.deleteBook(e.target);
	// Remove from Local Storage
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

	e.preventDefault();
});
