const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

const phrases = ['Building tomorrow.', 'Creating with curiosity.', 'Growing every day.'];
const typed = document.getElementById('typed');
let phraseIndex = 0;
let charIndex = phrases[0].length;
let deleting = false;

function typeText() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    charIndex++;
    typed.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeText, 1500);
      return;
    }
  } else {
    charIndex--;
    typed.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeText, deleting ? 45 : 85);
}
setTimeout(typeText, 1800);
