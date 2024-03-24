import Fetch from './fetch';
import { enterToAccount } from './loginMechanics';

const form = document.getElementById('reg-form');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', event => {
  event.preventDefault();
  const email = loginInput.value;
  const password = passwordInput.value;
  if (email && password) {
    Fetch.regWithEmailAndPass(email, password).then(userData => {
      if (!userData.error) {
        enterToAccount(userData);
      }
    });
  }
});
