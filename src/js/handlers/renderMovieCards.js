import getFilmGenresNameArray from './getFilmGenresNameArray';
import makeMovieTrandingCards from './makeMovieTrandingCards';
import { loaderOff } from '../loader/loader';

const cardSection = document.querySelector('.body-container');

export default function renderMovieCards({ results, dataGenres }) {
  loaderOff();
  results.map(movie => {
    const filmGenres = getFilmGenresNameArray(movie, dataGenres);
    cardSection.insertAdjacentHTML(
      'beforeend',
      makeMovieTrandingCards(movie, filmGenres)
    );
  });
}
