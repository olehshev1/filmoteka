import makeMyLibraryCards from './makeMyLibraryCards';

import { load, save } from '../current-session/localStorageService';
const cardSection = document.querySelector('.body-container');

export function noContentMessage() {
  if (sessionStorage.getItem('my-lib')) {
    const lang = localStorage.getItem('lang');
    let emptyText;
    if (lang) {
      lang === 'ua'
        ? (emptyText = '...тут ще нічого немає')
        : (emptyText = '...there is nothing here yet');
    }
    cardSection.innerHTML = `<p class="empty__container">${emptyText}&#129335;</p>`;
  }
}

export default function renderMyLibrary(results) {
  if (!results) {
    cardSection.innerHTML = '';
    return noContentMessage();
  }

  results?.map(movie => {
    cardSection.insertAdjacentHTML('afterbegin', makeMyLibraryCards(movie));
  });
}

let watchedBtn = document.querySelector('.watchedBtn');
let queueBtn = document.querySelector('.queueBtn');
let containerCardFilm = document.querySelector('.body-container');
containerCardFilm.addEventListener('click', deleteFilm);
const clearBtn = document.querySelector('.clearBtn');
clearBtn.addEventListener('click', clearMyLibrary);

function clearMyLibrary() {
  if (watchedBtn.classList.contains('currentMyLib')) {
    localStorage.removeItem('watchedList');
    renderMyLibrary(load('watchedList'));
  }
  if (queueBtn.classList.contains('currentMyLib')) {
    localStorage.removeItem('queueList');
    renderMyLibrary(load('queueList'));
  }
  noContentMessage();
}

function deleteFilm(e) {
  e.preventDefault();

  if (e.target.classList.contains('film__btn--delete-img')) {
    if (watchedBtn.classList.contains('currentMyLib')) {
      let watchedList = load('watchedList');
      let num = Number(e.target.getAttribute('data-id'));
      let index = watchedList.findIndex(item => item.id === num);
      watchedList.splice(index, 1);
      if (watchedList.length) {
        save('watchedList', watchedList);
      } else {
        localStorage.removeItem('watchedList');
      }

      cardSection.innerHTML = '';
      renderMyLibrary(load('watchedList'));
    }

    if (queueBtn.classList.contains('currentMyLib')) {
      let queueList = load('queueList');
      let num = Number(e.target.getAttribute('data-id'));
      let index = queueList.findIndex(item => item.id === num);

      queueList.splice(index, 1);
      if (queueList.length) {
        save('queueList', queueList);
      } else {
        localStorage.removeItem('queueList');
      }

      cardSection.innerHTML = '';
      renderMyLibrary(load('queueList'));
    }
  }
}
