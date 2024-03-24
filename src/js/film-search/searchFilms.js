import renderMovieCards from '../handlers/renderMovieCards';
import { fetchGetFilmName } from '../queries/queries';
import { Notify } from 'notiflix';
import Pagination from '../pagination/Pagination';

const cardSection = document.querySelector('.body-container');
const searchSubmit = document.querySelector('.header__form');

function totalResultsFilms(results) {
  const lang = localStorage.getItem('lang');
  if (results === 0) {
    return lang === 'ua'
      ? Notify.failure('Фільми не знайдено, спробуйте знайти щось інше')
      : Notify.failure('No movie found, change request');
  } else if (results > 100) {
    return lang === 'ua'
      ? Notify.info(
          `${results} фільмів знайдено, введіть більш унікальний запит`
        )
      : Notify.info(`${results} movies found, make a more precise request`);
  } else if (results > 0 && results <= 100) {
    return lang === 'ua'
      ? Notify.success(`Знайдено ${results} фільмів`)
      : Notify.success(`Found ${results} movies`);
  } else {
    return lang === 'ua'
      ? Notify.warning('Щось пішло не так...')
      : Notify.warning('Something went wrong...');
  }
}

export default async function createFilmListSearch(name, p) {
  if (localStorage.getItem('last-filter')) {
    localStorage.removeItem('last-filter');
  }

  const {
    results,
    total_pages: totalPages,
    page,
    dataGenres,
    total_results,
  } = await fetchGetFilmName(name, p);
  cardSection.innerHTML = '';
  renderMovieCards({ results, dataGenres });

  document.querySelector('.pagination').innerHTML = '<ul></ul>';
  if (totalPages === 1 || !totalPages) {
    return total_results;
  }
  const paginationSearch = new Pagination({
    el: document.querySelector('.pagination ul'),
    totalPages: totalPages > 500 ? 500 : totalPages,
    page,
  });

  paginationSearch.onChange(async pageNumber => {
    const data = await fetchGetFilmName(name, pageNumber);
    cardSection.innerHTML = '';
    renderMovieCards(data);
  });

  return total_results;
}

export function saveSearch(input, page) {
  const search = JSON.stringify({ input, page });
  localStorage.setItem('last-search', search);
}

searchSubmit.addEventListener('submit', async e => {
  const lang = localStorage.getItem('lang');
  e.preventDefault();
  document.querySelector('.input--year').value = '';
  document.getElementById('genres').value = '';
  const name = e.currentTarget.elements[0].value.trim();
  if (name === '') {
    return lang === 'ua'
      ? Notify.warning('Запит не може бути порожнім')
      : Notify.warning('An empty string cannot be a query');
  } else {
    cardSection.innerHTML = '';
    const results = await createFilmListSearch(name, 1);
    totalResultsFilms(results);
  }
});
