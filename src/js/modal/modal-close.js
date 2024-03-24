import { remove } from '../current-session/localStorageService';
export { backdrop };
import { getTrailer } from './treiler';

let backdrop = document.querySelector('.backdrop');
let modal = document.querySelector('.modal');
let modalIconClose = document.querySelector('.modal__btn-close');
const addToWatchedBtn = document.querySelector('.btn__modal-watched');
const addToQueueBtn = document.querySelector('.btn__modal-queue');
const poster = document.querySelector('.modal__card-poster');
const treiler = document.querySelector('.video-treiler');
const iframe = document.querySelector('iframe');
const btnTreilerYouTube = document.querySelector('.btn__trailer');
const scrollBtn = document.querySelector('.back-to-top');

backdrop.addEventListener('click', closeModal);
modalIconClose.addEventListener('click', closeModal);

export default function closeModal(e) {
  e.preventDefault();
  if (modal.classList.contains('is-hidden')) {
    if (e.target === backdrop || e.code === 'Escape') {
      treiler.classList.add('is-hidden');
      iframe.removeAttribute('src');
      modal.classList.remove('is-hidden');
    }
  } else if (
    e.target === backdrop ||
    e.currentTarget === modalIconClose ||
    e.code === 'Escape'
  ) {
    if (window.scrollY) {
      scrollBtn.classList.add('show');
    }
    btnTreilerYouTube.removeEventListener('click', getTrailer);
    poster.src = 'https://viyar.ua/store/Items/photos/ph67137.jpg';
    document.body.style.overflow = 'visible';
    backdrop.classList.add('is-hidden');
    document.removeEventListener('keydown', closeModal);
    remove('openFilm');
    addToWatchedBtn.disabled = false;
    addToWatchedBtn.textContent = 'Add to watched';
    addToQueueBtn.disabled = false;
    addToQueueBtn.textContent = 'Add to queue';
  }
}
