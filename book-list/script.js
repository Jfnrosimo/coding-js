class Book {
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class AddBook {

  addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="" class="delete">X</a><td>
    `;
  
    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement('div');

    //Add class name
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');

    //Get form
    const form = document.querySelector('#book-form');

    //Insert alert
    container.insertBefore(div, form);

    setTimeout(() => 
      document.querySelector('.alert').remove(), 3000);
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

}

//Event listener for adding book
document.getElementById('book-form').addEventListener('submit', function(e) {

  //Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  //Instantiate book
  const book = new Book(title, author, isbn);

  //Instantiate add book
  const addBook = new AddBook();

  //Validate
  if(title == '' || author == '' || isbn == ''){

    //Error alert
    addBook.showAlert('Please fill up all fields', 'error');

  }else {

    //Add book to list
    addBook.addBookToList(book);

    //Show success alert
    addBook.showAlert('Book is added', 'success');

    addBook.clearFields();
  }

  e.preventDefault();
});

//Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {

  //Instantiate add book
  const addBook = new AddBook();

  //Delete book
  addBook.deleteBook(e.target);

  //Show message
  addBook.showAlert('Book removed', 'success');

  e.preventDefault();
})