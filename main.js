const overlay = document.querySelector(".overlay");
const addbutton = document.querySelector(".add-btn");
const form = document.querySelector("#form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pageInput = document.querySelector("#page");
const checkboxInput = document.querySelector("#isRead");

let LIBRARY = JSON.parse(localStorage.getItem("library")) || [];
if (LIBRARY.length) displayBooks();

addbutton.addEventListener("click", () => {
    overlay.style.scale = "1";
});

overlay.addEventListener("click", (event) => {
    if (event.target.id == "overlay") {
        overlay.style.scale = "0";
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newBook = {
        title: titleInput.value,
        author: authorInput.value,
        page: pageInput.value,
        checked: checkboxInput.checked,
    };

    LIBRARY.push(newBook);

    setLibrary();
    displayBooks();
    form.reset();
    overlay.style.scale = "0";
});
function displayBooks() {
    const bookGrid = document.querySelector(".book-grid");
    console.log(bookGrid);
    bookGrid.innerHTML = "";

    LIBRARY.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.innerHTML = `
                    <h2 class="book-title">${book.title}</h2>
                    <h3 class="book-author">${book.author} </h3>
                    <h3 class="book-page">${book.page} pages </h3>

                    <div class="btn-group">
                        <button onclick="toggleRead(${index})" ${
            book.checked
                ? 'class="btn read-btn">Read'
                : 'class="btn not-read-btn">Not Read'
        }</button>
                        <button onclick="removeBook(${index})" class="btn remove-btn">Remove</button>
                    </div>`;

        bookGrid.append(bookCard);
    });
}

function removeBook(id) {
    LIBRARY = LIBRARY.filter((book, index) => index != id);
    setLibrary();
    displayBooks();
}

function setLibrary() {
    localStorage.setItem("library", JSON.stringify(LIBRARY));
}

function toggleRead(id) {
    LIBRARY = LIBRARY.map((book, index) => {
        if (id == index) {
            return { ...book, checked: !book.checked };
        } else {
            return { ...book };
        }
    });
    setLibrary();
    displayBooks();
}
