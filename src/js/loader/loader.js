const loader = document.querySelector('.lader_backdrop');

const loaderOn = () => loader.classList.remove('is-hidden');
const loaderOff = () =>
  setTimeout(() => loader.classList.add('is-hidden'), 250);

export { loaderOn, loaderOff };
