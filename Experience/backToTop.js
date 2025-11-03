export function initBackToTop(options = {}) {
  const {
    selector = '#back-to-top',
    showOnScroll = false,    // si true: el botón se oculta en top y aparece detras del scroll
    showAfter = 300 
  } = options;

  const btn = document.querySelector(selector);
  if (!btn) return console.warn('[backToTop] botón no encontrado con selector:', selector);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex', '0');
  if (!btn.hasAttribute('role') && btn.tagName.toLowerCase() !== 'button') btn.setAttribute('role', 'button');

  function scrollToTop() {
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    try { document.documentElement.focus({ preventScroll: true }); } catch (e) { /* no todos los navegadores */ }
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToTop();
  });

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      scrollToTop();
    }
  });

  if (showOnScroll) {
    let ticking = false;

    function updateVisibility() {
      const y = window.scrollY || window.pageYOffset;
      if (y > showAfter) {
        btn.classList.remove('hidden');
        btn.classList.add('visible');
      } else {
        btn.classList.add('hidden');
        btn.classList.remove('visible');
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    }, { passive: true });

    updateVisibility();
  } else {
    btn.classList.remove('hidden');
  }

  return {
    scrollToTop,
    destroy() {
      btn.removeEventListener('click', scrollToTop);
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  initBackToTop({ selector: '#back-to-top', showOnScroll: false, showAfter: 300 });
});