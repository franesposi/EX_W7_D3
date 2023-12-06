async function getBooks() {
  try {
    const response = await fetch("https://striveschool-api.herokuapp.com/books");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Errore nel recupero dei libri:", error);
  }
}

// Funzione per generare le card dei libri
function createBookCards(books) {
  const bookListContainer = document.getElementById("bookList");

  books.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("col");

    card.innerHTML = `
        <div class="card">
          <img src="${book.img}" class="card-img-top" alt="Copertina del libro">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">Prezzo: ${book.price} €</p>
            <button class="btn btn-danger" onclick="discardBook(this)">Scarta</button>
          </div>
        </div>
      `;

    bookListContainer.appendChild(card);
  });
}

// Funzione chiamata quando il pulsante "Scarta" viene premuto
function discardBook(button) {
  const card = button.closest(".card");
  card.remove();
}

// Inizializza la pagina con i libri
window.onload = async function () {
  const books = await getBooks();
  createBookCards(books);
};
