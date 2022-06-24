const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//All Events
eventListeners();

function eventListeners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    let films = Storage.getFilmsFromStorage();
    UI.loadAllFilms(films);
  });

  secondCardBody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}

// Add Film
function addFilm(e) {

  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director === "" || url === "") {
    //Error
    UI.displayMessages("These information is reqUIred.", "danger");
  } else {
    // New Film
    const newFilm = new Film(title, director, url);

    //Add Film To UI
    UI.addFilmToUI(newFilm);

    // Add Film To Storage
    Storage.addFilmToStorage(newFilm);

    UI.displayMessages("The film was successfully added.", "success");
  }

  // Clear Input
  UI.clearInputs(titleElement, urlElement, directorElement);

  e.preventDefault();
}

function deleteFilm(e) {
  if (e.target.id === "delete-film") {
    UI.deleteFilmFromUI(e.target);
    Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    UI.displayMessages("The film was successfully removed.", "success");
  }
}

function clearAllFilms() {

  if (confirm("Are you sure?")) {
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
  }
}