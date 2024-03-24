import { Notify } from 'notiflix';

export default class Fetch {
  static API_KEY = 'AIzaSyBsgyw5msQwc2HX8RiFdzRf-qSWVnfNLJA';
  static create(data) {
    return fetch(
      'https://team-js-project-default-rtdb.firebaseio.com/users.json',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => response.json())
      .then(res => {
        data.id = res.name;
        return data;
      })
      .then(addToLocalStorage);
  }

  static regWithEmailAndPass(email, password) {
    return fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Fetch.API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          handleError(data);
        }
        return data;
      });
  }

  static authWithEmailAndPass(email, password) {
    return fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Fetch.API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          handleError(data);
        }
        return data;
      });
  }
}

function addToLocalStorage(data) {
  const users = localStorage.getItem('user');
  users
    ? localStorage.setItem('user', JSON.stringify([...JSON.parse(users), data]))
    : localStorage.setItem('user', JSON.stringify([data]));
}

function handleError(data) {
  const lang = localStorage.getItem('lang');
  if (data.error.message === 'EMAIL_NOT_FOUND') {
    lang === 'ua'
      ? Notify.failure(
          `Email не зареєстрований. Будь ласка, введіть зареєстровані дані`
        )
      : Notify.failure(`Email not registered. Please enter registered data`);
  } else if (data.error.message === 'INVALID_PASSWORD') {
    lang === 'ua'
      ? Notify.failure(`Неправильний пароль. Будь ласка, введіть коректні дані`)
      : Notify.failure(`Invalid password. Please enter correct data`);
  } else if (data.error.message === 'INVALID_EMAIL') {
    lang === 'ua'
      ? Notify.failure(`Невалідний email. Будь ласка, введіть коректні дані`)
      : Notify.failure(`Invalid email. Please enter correct data`);
  } else if (data.error.message === 'EMAIL_EXISTS') {
    lang === 'ua'
      ? Notify.failure(
          `Email вже зареєстрований. Будь ласка, увійдіть до свого акаунту чи зареєструйте новий`
        )
      : Notify.failure(
          `Email already registered. Please login to your account or register a new one`
        );
  }
}
