import { closeModal } from './authModal';
import switchToLibrary, { switchToHome } from '../header/header';

const form = document.getElementById('auth-form');
const loginInput = form.querySelector('#auth-login');
const passwordInput = form.querySelector('#auth-password');
const authBtn = document.querySelector('.auth-btn__enter');
const leaveBtn = document.querySelector('.auth-btn__leave');
const loginName = document.querySelector('.login');

const formRegContainer = document.querySelector('.reg-form');
const formAuthContainer = document.querySelector('.auth-form');
const alreadyRegBtn = document.querySelector('.already-reg');
const anywayRegBtn = document.querySelector('.anyway-reg');

alreadyRegBtn.addEventListener('click', switchForm);
anywayRegBtn.addEventListener('click', switchForm);

window.addEventListener('load', () => {
  if (localStorage.getItem('userEmail')) {
    loginName.innerHTML = localStorage.getItem('userEmail');
    leaveBtn.classList.remove('visually-hidden');
    authBtn.classList.add('visually-hidden');
    if (sessionStorage.getItem('my-lib')) {
      switchToLibrary();
    }
  }
});

leaveBtn.addEventListener('click', handleLeaveFromAccount);

export function enterToAccount(userData) {
  loginName.innerHTML = userData.email;
  localStorage.setItem('userEmail', userData.email);
  leaveBtn.classList.remove('visually-hidden');
  authBtn.classList.add('visually-hidden');
  loginInput.value = '';
  passwordInput.value = '';
  closeModal();
}

export function handleLeaveFromAccount() {
  leaveBtn.classList.add('visually-hidden');
  loginName.innerHTML = '';

  authBtn.classList.remove('visually-hidden');

  localStorage.removeItem('userEmail');
  switchToHome();
}

function switchForm() {
  formRegContainer.classList.toggle('move');
  formAuthContainer.classList.toggle('move');
}
