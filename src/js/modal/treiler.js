import { loaderOff, loaderOn } from '../loader/loader';
import { backdrop } from './modal-close';
import { fetchGetMovieTreiler } from '../queries/queries';
const btnTreilerYouTube = document.querySelector('.btn__trailer');
const modal = document.querySelector('.modal');
const treiler = document.querySelector('.video-treiler');
const youTubePlayer = document.querySelector('iframe');

let containerCardFilm = document.querySelector('.body-container');
containerCardFilm.addEventListener('click', onClickImg);

async function onClickImg(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  btnTreilerYouTube.addEventListener('click', getTrailer);
}

export function getTrailer() {
  const openFilm = JSON.parse(localStorage.getItem('openFilm'));
  if (openFilm) {
    fetchGetMovieTreiler(openFilm.id)
      .then(data => treilerMovie(data))
      .then(response => setAttributeYouTubeFrame(response));
  }
}

function treilerMovie(x) {
  for (const key of x) {
    if (key.name === 'Official Trailer') {
      return key.key;
    }
  }
}

function setAttributeYouTubeFrame(youTubeKey) {
  youTubePlayer.src = `https://www.youtube.com/embed/${youTubeKey}`;
}

btnTreilerYouTube.addEventListener('click', openTreiler);

function openTreiler() {
  if (backdrop.classList.contains('is-hidden-off')) {
    loaderOn();
    modal.classList.add('is-hidden');
    treiler.classList.remove('is-hidden');
    setTimeout(() => {
      loaderOff();
    }, 250);
  }
}
