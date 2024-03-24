import Fetch from './fetch';
import { enterToAccount } from './loginMechanics';

const form = document.getElementById('auth-form');
const loginInput = form.querySelector('#auth-login');
const passwordInput = form.querySelector('#auth-password');

form.addEventListener('submit', event => {
  event.preventDefault();
  const email = loginInput.value;
  const password = passwordInput.value;
  if (email && password) {
    Fetch.authWithEmailAndPass(email, password).then(userData => {
      if (!userData.error) {
        enterToAccount(userData);
      }
    });
  }
});
