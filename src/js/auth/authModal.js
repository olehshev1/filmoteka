import './authentication';
import './registration';
import closeFilmModal from '../modal/modal-close';
import setContentLang from '../languages/changeLang';
import { langAuthModalArr } from '../languages/langData';

const overlay = document.querySelector('.auth-overlay');
const authBtn = document.querySelector('.auth-btn__enter');
const closeBtn = document.querySelector('.auth-modal__btn-close');

authBtn.addEventListener('click', openAuthModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('mousedown', event => {
  if (event.target !== overlay) {
    return;
  }
  closeModal();
});

export function closeModal() {
  document.querySelector('body').style.overflow = 'visible';

  if (localStorage.getItem('openFilm')) {
    document.addEventListener('keydown', closeFilmModal);
  }

  overlay.classList.add('visually-hidden');
  document.removeEventListener('keydown', handleKeyListener);
}

export function openAuthModal() {
  document.querySelector('body').style.overflow = 'hidden';
  const lang = localStorage.getItem('lang');
  if (lang) setContentLang(langAuthModalArr, lang);

  if (localStorage.getItem('openFilm')) {
    document.removeEventListener('keydown', closeFilmModal);
  }
  overlay.classList.remove('visually-hidden');

  document.addEventListener('keydown', handleKeyListener);
}

function handleKeyListener(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
