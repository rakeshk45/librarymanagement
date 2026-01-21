// ===== ADMIN BOOKS (LocalStorage) =====
let storedEbooks = JSON.parse(localStorage.getItem("ebooks")) || [];

// ===== MERGE DEFAULT + ADMIN =====
let ebooks = [...defaultEbooks, ...storedEbooks];

// ===== CONTAINER =====
const container = document.getElementById("ebook-container");
container.innerHTML = "";

// ===== UNIQUE CATEGORIES =====
const categories = [...new Set(ebooks.map(book => book.category))];

// ===== RENDER =====
categories.forEach(category => {
  const h2 = document.createElement("h2");
  h2.className = "category";
  h2.innerText = category + " :";
  container.appendChild(h2);

  const row = document.createElement("div");
  row.className = "books";

  ebooks
    .filter(book => book.category === category)
    .forEach((book, index) => {
      const isAdminBook = index >= defaultEbooks.length;

      row.innerHTML += `
        <div class="book">
          <img src="${book.image}"
               onerror="this.src='https://via.placeholder.com/180x250?text=No+Image'">

          <h4>${book.title}</h4>

          <a download href="${book.image}" class="btn">Download Image</a>
          <a download href="${book.pdf}" class="btn">Download Ebook</a>

          ${isAdminBook ? 
            `<button class="del" onclick="deleteBook(${index - defaultEbooks.length})">
              Delete
            </button>` 
          : ""}
        </div>
      `;
    });

  container.appendChild(row);
});

// ===== DELETE ADMIN BOOK =====
function deleteBook(i) {
  if (!confirm("Delete this book?")) return;

  storedEbooks.splice(i, 1);
  localStorage.setItem("ebooks", JSON.stringify(storedEbooks));
  location.reload();
}
