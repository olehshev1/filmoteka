import { langMainArr } from './langData';
import { fetchGetTrending } from '../queries/queries';
import renderMovieCards from '../handlers/renderMovieCards';
import { auditFilter, auditYear, auditGenre } from '../film-filter/filterFilms';
import { noContentMessage } from '../my-library/renderMyLibrary';
import createFilmListSearch from '../film-search/searchFilms';
import createFilmListFilter from '../film-filter/filterFilms';

const langSwitcher = document.getElementById('lang-checkbox');
const cardSection = document.querySelector('.body-container');

window.addEventListener('load', onWindowLoad);
langSwitcher.addEventListener('click', switchLanguage);

async function switchLanguage(event) {
  event.target.checked
    ? localStorage.setItem('lang', 'ua')
    : localStorage.setItem('lang', 'en');
  const lang = localStorage.getItem('lang');
  setContentLang(langMainArr, lang);
  const watchedList = JSON.parse(localStorage.getItem('watchedList'));
  const queueList = JSON.parse(localStorage.getItem('queueList'));
  const currentMyLib = localStorage.getItem('current-my-lyb');
  if (
    (currentMyLib === 'w' && !watchedList?.length) ||
    (currentMyLib === 'q' && !queueList?.length)
  ) {
    noContentMessage();
  }
  if (sessionStorage.getItem('my-lib')) {
    return;
  }

  const lastSearch = JSON.parse(localStorage.getItem('last-search'));
  if (lastSearch) {
    const { input, page } = lastSearch;
    createFilmListSearch(input, page);
    return;
  }

  if (localStorage.getItem('last-filter')) {
    // document.querySelector('.header__input').value = '';
    // const genre = document.getElementById('genres');
    // const genreId = genre.options[genre.selectedIndex].dataset.id;
    // const year = document.querySelector('.input--year').value;
    // const someUrl = auditGenre(genreId) + auditYear(year);
    // auditFilter(year, someUrl);
    const { someUrl, page } = JSON.parse(localStorage.getItem('last-filter'));

    createFilmListFilter(someUrl, page);
    return;
  }
  const page = document.querySelector('.numb.active').dataset.page;
  const { results, dataGenres } = await fetchGetTrending(page);
  cardSection.innerHTML = '';
  renderMovieCards({ results, dataGenres });
}

async function onWindowLoad() {
  const lang = localStorage.getItem('lang');
  if (lang) {
    setContentLang(langMainArr, lang);
    lang === 'ua'
      ? (langSwitcher.checked = true)
      : (langSwitcher.checked = false);
  }
}

export default function setContentLang(contentArr, lang) {
  contentArr.forEach(el => {
    el.placeholder
      ? (document.querySelector(`.lng__${el.selector}`).placeholder = el[lang])
      : (document.querySelector(`.lng__${el.selector}`).textContent = el[lang]);
  });
}
