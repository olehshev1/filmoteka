import renderMyLibrary from './renderMyLibrary';
export { watchedBtnCB, queueBtnCB };

const cardSection = document.querySelector('.body-container');
const watchedBtn = document.querySelector('.watchedBtn');
const queueBtn = document.querySelector('.queueBtn');

function render(list) {
  document.querySelector('.pagination').innerHTML = '<ul></ul>';
  cardSection.innerHTML = '';
  renderMyLibrary(list);
}

function watchedBtnCB() {
  queueBtn.classList.remove('currentMyLib');
  watchedBtn.classList.add('currentMyLib');

  watchedBtn.disabled = true;
  queueBtn.disabled = false;

  localStorage.setItem('current-my-lyb', 'w');

  try {
    const watchedList = JSON.parse(localStorage.getItem('watchedList'));
    render(watchedList);
  } catch {
    console.log('No watched films');
  }
}

function queueBtnCB() {
  watchedBtn.classList.remove('currentMyLib');
  queueBtn.classList.add('currentMyLib');

  queueBtn.disabled = true;
  watchedBtn.disabled = false;

  localStorage.setItem('current-my-lyb', 'q');

  try {
    const queueList = JSON.parse(localStorage.getItem('queueList'));
    render(queueList);
  } catch {
    console.log('No films in queue');
  }
}
