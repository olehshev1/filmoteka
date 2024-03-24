export default function makeMyLibraryCards({
  id,
  title,
  genres,
  release_date,
  poster_path,
  first_air_date,
} = movie) {
  let genresList;

  if (genres.length > 0) {
    genresList = genres
      .reduce((acc, ganre) => acc + ', ' + ganre.name, '')
      .slice(1);
  } else {
    const lang = localStorage.getItem('lang');
    lang === 'ua' ? (genresList = 'Інше') : (genresList = 'Other');
  }
  return `
  <li class="film__wrap">
  <button type="button" class="film__btn--delete" id="film__btn--delete" data-id="${id}"><img class="film__btn--delete-img"  data-id="${id}" src="https://img.icons8.com/fluency/452/delete-sign.png"/></button>
  <img  class="film__img" src="${
    poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : 'https://st.depositphotos.com/1653909/4590/i/600/depositphotos_45905265-stock-photo-movie-clapper.jpg'
  }" alt="${title}" data-id='${id}'/>
  <h2 class="film__text film__name">${title} | ${
    first_air_date ? first_air_date?.slice(0, 4) : release_date?.slice(0, 4)
  }</h2>
  <p class="film__text film__description">${genresList}</p>
  </li>

  `;
}
