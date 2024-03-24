import renderMovieCards from '../handlers/renderMovieCards';
import { fetchGetTrending } from '../queries/queries';
import Pagination from './Pagination';

const cardSection = document.querySelector('.body-container');

export default async function createFilmListTrending() {
  if (localStorage.getItem('last-search')) {
    localStorage.removeItem('last-search');
  } else if (localStorage.getItem('last-filter')) {
    localStorage.removeItem('last-filter');
  }
  const { results, totalPages, page, dataGenres } = await fetchGetTrending(1);
  cardSection.innerHTML = '';
  renderMovieCards({ results, dataGenres });

  document.querySelector('.pagination').innerHTML = '<ul></ul>';

  const paginationTrend = new Pagination({
    el: document.querySelector('.pagination ul'),
    totalPages: totalPages > 500 ? 500 : totalPages,
    page,
  });

  paginationTrend.onChange(async pageNumber => {
    const data = await fetchGetTrending(pageNumber);
    cardSection.innerHTML = '';
    renderMovieCards(data);
  });
}
