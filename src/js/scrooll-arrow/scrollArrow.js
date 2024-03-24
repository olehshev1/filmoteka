const scrollBtn = document.querySelector('.back-to-top');
const backdrop = document.querySelector('.backdrop');
const footerBackdrop = document.querySelector('.footer__backdrop');

const btnVisibility = () => {
  if (
    window.scrollY > 0 &&
    backdrop.classList.contains('is-hidden') &&
    footerBackdrop.classList.contains('is-hidden')
  ) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
};

function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

document.addEventListener('scroll', () => {
  btnVisibility();
});
scrollBtn.addEventListener('click', e => {
  e.preventDefault();
  scrollUp();
});
