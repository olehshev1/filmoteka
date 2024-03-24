import renderMovieCards from '../handlers/renderMovieCards';
import { fetchGetFilterFilms } from '../queries/queries';
import createFilmListTrending from '../pagination/createFilmList';
import Pagination from '../pagination/Pagination';

const cardSection = document.querySelector('.body-container');
const filter = document.querySelector('.filter_conteiner');

export default async function createFilmListFilter(someUrl, p) {
  if (localStorage.getItem('last-search')) {
    localStorage.removeItem('last-search');
  }

  const {
    results,
    total_pages: totalPages,
    page,
    dataGenres,
  } = await fetchGetFilterFilms(someUrl, p);
  cardSection.innerHTML = '';
  renderMovieCards({ results, dataGenres });

  document.querySelector('.pagination').innerHTML = '<ul></ul>';
  if (totalPages === 1 || !totalPages) {
    return;
  }
  const paginationFilter = new Pagination({
    el: document.querySelector('.pagination ul'),
    totalPages: totalPages > 500 ? 500 : totalPages,
    page,
  });

  paginationFilter.onChange(async pageNumber => {
    const data = await fetchGetFilterFilms(someUrl, pageNumber);
    cardSection.innerHTML = '';
    renderMovieCards(data);
  });
}

export function saveFilter(someUrl, page) {
  const genre = document.getElementById('genres').value;
  const year = document.querySelector('.input--year').value;
  const filter = JSON.stringify({ someUrl, page, genre, year });
  localStorage.setItem('last-filter', filter);
}

export function auditYear(year) {
  if (year === '') {
    return '';
  } else if (Date.parse(year) < Date.parse(1850)) {
    return '';
  } else if (Date.parse(year) > new Date()) {
    return '';
  } else {
    return `&primary_release_year=${year}`;
  }
}

export function auditGenre(genre) {
  if (genre === '') {
    return '';
  } else {
    return `&with_genres=${genre}`;
  }
}

export function auditFilter(year, someUrl) {
  if (someUrl === '') {
    createFilmListTrending();
  } else {
    createFilmListFilter(someUrl, 1);
  }
}

filter.addEventListener('change', () => {
  document.querySelector('.header__input').value = '';
  const genre = document.getElementById('genres');
  const genreId = genre.options[genre.selectedIndex].dataset.id;
  const year = document.querySelector('.input--year').value;
  const someUrl = auditGenre(genreId) + auditYear(year);
  auditFilter(year, someUrl);
});

let dateDropdown = document.getElementById('date-dropdown');

let currentYear = new Date().getFullYear();
let earliestYear = 1874;
while (currentYear >= earliestYear) {
  let dateOption = document.createElement('option');
  dateOption.text = currentYear;
  dateOption.value = currentYear;
  dateDropdown.add(dateOption);
  currentYear -= 1;
}
