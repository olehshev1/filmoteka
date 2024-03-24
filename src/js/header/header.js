import { watchedBtnCB, queueBtnCB } from '../my-library/callbacksForMyLibrery';
import currentSession from '../current-session/currentSession';
import currentLibrary from '../current-session/currentLibrary';
import { openAuthModal } from '../auth/authModal';
import noContentMessage from '../my-library/renderMyLibrary';

const headerBoxRef = document.querySelector('.header__box');
const filter = document.querySelector('.filter_conteiner');
const homeBtnRef = document.querySelector('.home');
const libBtnRef = document.querySelector('.library');
const headerRef = document.querySelector('.header');
const headerButtons = document.querySelector('.header__buttons');
const watchedBtn = document.querySelector('.watchedBtn');
const queueBtn = document.querySelector('.queueBtn');
const logo = document.querySelector('.header__logo');

libBtnRef.addEventListener('click', switchToLibrary);

function switchHeaderBgImage() {
  if (sessionStorage.getItem('my-lib')) {
    filter.classList.add('is-hidden');
    headerRef.classList.add('header__library');
  } else {
    filter.classList.remove('is-hidden');
    headerRef.classList.remove('header__library');
  }
}

export default function switchToLibrary() {
  if (!localStorage.getItem('userEmail')) {
    openAuthModal();
    return;
  }

  homeBtnRef.addEventListener('click', switchToHome);
  homeBtnRef.classList.remove('current');
  libBtnRef.classList.add('current');
  libBtnRef.removeEventListener('click', switchToLibrary);

  headerButtons.classList.remove('visually-hidden');
  headerBoxRef.classList.add('visually-hidden');

  currentLibrary();

  watchedBtn.addEventListener('click', watchedBtnCB);
  queueBtn.addEventListener('click', queueBtnCB);

  sessionStorage.setItem('my-lib', 'true');
  switchHeaderBgImage();
  if (
    (localStorage.getItem('current-my-lyb') === 'q' &&
      !localStorage.getItem('queueList')) ||
    (localStorage.getItem('current-my-lyb') === 'w' &&
      !localStorage.getItem('watchedList'))
  ) {
    noContentMessage();
  }
}
export function switchToHome() {
  libBtnRef.addEventListener('click', switchToLibrary);
  homeBtnRef.classList.add('current');
  libBtnRef.classList.remove('current');
  homeBtnRef.removeEventListener('click', switchToHome);

  headerButtons.classList.add('visually-hidden');
  headerBoxRef.classList.remove('visually-hidden');

  currentSession();

  watchedBtn.removeEventListener('click', watchedBtnCB);
  queueBtn.removeEventListener('click', queueBtnCB);

  sessionStorage.removeItem('my-lib');
  switchHeaderBgImage();
}

logo.addEventListener('click', () => {
  if (localStorage.getItem('last-search')) {
    localStorage.removeItem('last-search');
  } else if (localStorage.getItem('last-filter')) {
    localStorage.removeItem('last-filter');
  }
});
