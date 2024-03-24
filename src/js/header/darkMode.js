const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  toggleSwitch.checked = currentTheme === THEME.DARK;
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', THEME.DARK);
    localStorage.setItem('theme', THEME.DARK);
  }
  else {
    document.documentElement.setAttribute('data-theme', THEME.LIGHT);
    localStorage.setItem('theme', THEME.LIGHT);
  }
}

toggleSwitch.addEventListener('change', switchTheme);