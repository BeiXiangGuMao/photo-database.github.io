const iconSrc = {
  light: 'sun.svg',
  dark:  'moon.svg'
};

function apply(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme-icon').src = iconSrc[theme];
  localStorage.setItem('theme', theme);
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  apply(cur === 'dark' ? 'light' : 'dark');
});

const saved = localStorage.getItem('theme') ||
              (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

apply(saved);
