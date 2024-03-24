import createFilmListTrending from '../pagination/createFilmList';
import createFilmListSearch from '../film-search/searchFilms';
import createFilmListFilter from '../film-filter/filterFilms';

const cardSection = document.querySelector('.body-container');

export default function currentSession() {
  cardSection.innerHTML = '';

  if (localStorage.getItem('last-search')) {
    try {
      const { input, page } = JSON.parse(localStorage.getItem('last-search'));
      document.querySelector('.header__input').value = input;
      createFilmListSearch(input, page);
    } catch {
      createFilmListTrending();
    }
  } else {
    try {
      const { someUrl, page, genre, year } = JSON.parse(
        localStorage.getItem('last-filter')
      );
      document.querySelector('.input--year').value = year;
      document.getElementById('genres').value = genre;
      createFilmListFilter(someUrl, page);
    } catch {
      createFilmListTrending();
    }
  }
}
