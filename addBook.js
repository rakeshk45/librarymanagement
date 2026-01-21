const bookForm = document.getElementById('bookForm');
const successMsg = document.getElementById('successMsg');

// Load existing admin books from localStorage
let storedEbooks = JSON.parse(localStorage.getItem("ebooks")) || [];

bookForm.addEventListener('submit', function(e){
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const category = document.getElementById('category').value.trim();
    const image = document.getElementById('image').value.trim();
    const pdf = document.getElementById('pdf').value.trim();

    if(title && author && category){
        const book = { title, author, category, image, pdf };
        storedEbooks.push(book);
        localStorage.setItem("ebooks", JSON.stringify(storedEbooks));
        successMsg.textContent = `"${title}" added successfully!`;
        bookForm.reset();
        setTimeout(() => successMsg.textContent = '', 3000);
    } else {
        alert('Please fill in Title, Author, and Category');
    }
});
