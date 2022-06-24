class Storage {

  // Add Film To Storage
  static addFilmToStorage(newFilm) {
    let films = this.getFilmsFromStorage();

    films.push(newFilm);

    localStorage.setItem("films", JSON.stringify(films));
  }

  // Get Films From Storage
  static getFilmsFromStorage() {
    let films;

    if (localStorage.getItem("films") === null) {
      films = [];
    } else {
      films = JSON.parse(localStorage.getItem("films"));
    }

    return films;
  }

  // Delete Film From Storage
  static deleteFilmFromStorage(filmTitle) {
    let films = this.getFilmsFromStorage();

    //Splice
    films.forEach(function (film, index) {
      if (film.title === filmTitle) {
        films.splice(index, 1);
      }
    });

    localStorage.setItem("films", JSON.stringify(films));
  }

  // Clear All Films From Storage
  static clearAllFilmsFromStorage() {
    localStorage.removeItem("films");
  }

}