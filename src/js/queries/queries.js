import axios from 'axios';
import { save } from '../current-session/localStorageService';
import { loaderOn } from '../loader/loader';
import { saveSearch } from '../film-search/searchFilms';
import { saveFilter } from '../film-filter/filterFilms';

const API_KEY = 'ffda232ba1095b2db867c38e7745d8d7';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const URL_IMG = 'https://image.tmdb.org/t/p/w500';

export async function fetchGenresList() {
  const lang = localStorage.getItem('lang');
  let langURL;
  lang === 'ua' ? (langURL = `uk-UA`) : (langURL = `en-US`);
  let response;
  if (langURL) {
    response = await axios.get(
      `/genre/movie/list?api_key=${API_KEY}&language=${langURL}`
    );
  }

  return response.data.genres;
}

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchMovieCreditsById(id) {
  return fetchWithErrorHandling(
    `${axios.defaults.baseURL}/movie/${id}/credits?api_key=${API_KEY}`
  );
}

export async function fetchGetMovieId(MOVIE_ID) {
  const lang = localStorage.getItem('lang');
  let langURL;
  lang === 'ua' ? (langURL = `uk-UA`) : (langURL = `en-US`);
  let response;
  loaderOn();
  if (langURL) {
    response = await axios.get(
      `/movie/${MOVIE_ID}?api_key=${API_KEY}&language=${langURL}`
    );
  } else {
    response = await axios.get(`/movie/${MOVIE_ID}?api_key=${API_KEY}`);
  }
  save('openFilm', response.data);
  return response.data;
}

export async function fetchGetFilmName(name, pageValue) {
  loaderOn();

  const lang = localStorage.getItem('lang');
  let langURL;
  lang === 'ua' ? (langURL = `uk-UA`) : (langURL = `en-US`);
  let response;
  if (langURL) {
    response = await axios.get(
      `/search/movie?api_key=${API_KEY}&language=${langURL}&query=${name}&include_adult=false&page=${pageValue}`
    );
  } else {
    response = await axios.get(
      `/search/movie?api_key=${API_KEY}&language=en-US&query=${name}&include_adult=false&page=${pageValue}`
    );
  }

  const dataGenres = await fetchGenresList();
  const { results, total_pages, page, total_results } = response.data;
  saveSearch(name, page);

  return { results, total_pages, page, total_results, dataGenres };
}

export async function fetchGetFilterFilms(someUrl, pageValue) {
  loaderOn();
  const lang = localStorage.getItem('lang');
  let langURL;
  lang === 'ua' ? (langURL = `uk-UA`) : (langURL = `en-US`);
  let response;
  if (langURL) {
    response = await axios.get(
      `/discover/movie?api_key=${API_KEY}&language=${langURL}${someUrl}&page=${pageValue}`
    );
  } else {
    response = await axios.get(
      `/discover/movie?api_key=${API_KEY}&language=en-US${someUrl}&page=${pageValue}`
    );
  }

  const dataGenres = await fetchGenresList();
  const { results, total_pages, page, total_results } = response.data;
  saveFilter(someUrl, pageValue);

  return { results, total_pages, page, total_results, dataGenres };
}

export async function fetchGetTrending(pageValue, lang) {
  loaderOn();
  try {
    const lang = localStorage.getItem('lang');
    let langURL;
    lang === 'ua' ? (langURL = `uk-UA`) : (langURL = `en-US`);
    let response;
    if (langURL) {
      response = await axios.get(
        `/movie/popular?api_key=${API_KEY}&language=${langURL}&page=${pageValue}`
      );
    } else {
      response = await axios.get(
        `/movie/popular?api_key=${API_KEY}&page=${pageValue}`
      );
    }

    const dataGenres = await fetchGenresList();
    const { results, total_pages, page, total_results } = response.data;
    return {
      results,
      totalPages: total_pages,
      page,
      totalResults: total_results,
      dataGenres,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function fetchGetMovieTreiler(MOVIE_ID) {
  const { data } = await axios.get(
    `/movie/${MOVIE_ID}/videos?api_key=${API_KEY}`
  );
  return data.results;
}
