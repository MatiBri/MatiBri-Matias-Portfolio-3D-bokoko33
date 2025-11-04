// quick-nav-dropdown.js
// Módulo para el botón desplegable de navegación rápida.
// Auto-init al cargar el DOM. Exporta initQuickNavDropdown(options) si querés init manual.

export function initQuickNavDropdown(options = {}) {
  const {
    toggleSelector = '#quick-nav-toggle',
    menuSelector = '#quick-nav-menu',
    itemSelector = '.quick-nav-item',
    offset = 0,       // offset en px si necesitás corregir header fijo
    smooth = true     // true -> scroll suave (si el usuario no prefiere reduced motion)
  } = options;

  const toggle = document.querySelector(toggleSelector);
  const menu = document.querySelector(menuSelector);
  if (!toggle || !menu) return console.info('[quick-nav] toggle o menu no encontrado');

  const items = Array.from(menu.querySelectorAll(itemSelector));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // helpers de apertura/cierre
  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    // fuerza reflow para animar
    requestAnimationFrame(() => menu.classList.add('open'));
    // focus al primer item
    if (items.length) items[0].focus();
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }

  function closeMenu(returnFocus = true) {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    // esperar transición antes de ocultar completamente
    setTimeout(() => {
      if (!menu.classList.contains('open')) menu.hidden = true;
    }, 160);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    if (returnFocus) toggle.focus();
  }

  function toggleMenu() {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) closeMenu();
    else openMenu();
  }

  // cerrar si clic fuera del menú / toggle
  function onDocumentClick(e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu(false);
    }
  }

  // teclado: Esc, flechas navegación, Enter/Space en menu items
  function onDocumentKeydown(e) {
    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    const active = document.activeElement;
    const idx = items.indexOf(active);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = items[(idx + 1) % items.length];
      next && next.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = items[(idx - 1 + items.length) % items.length];
      prev && prev.focus();
    }
  }

  // scroll suave hacia elemento target
  function scrollToTarget(targetSelector) {
    const el = document.querySelector(targetSelector);
    if (!el) return console.warn('[quick-nav] target no encontrado:', targetSelector);

    const top = Math.round(el.getBoundingClientRect().top + window.pageYOffset - (offset || 0));
    if (prefersReducedMotion || !smooth) {
      window.scrollTo(0, top);
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }

    // focus por accesibilidad
    try {
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    } catch (err) { /* algunos nodos no se enfocan */ }
  }

  // click en items
  function onItemClick(e) {
    const target = e.currentTarget.dataset.target;
    if (!target) return;
    e.preventDefault();
    closeMenu(false);
    scrollToTarget(target);
  }

  // keyboard on toggle: Enter/Space abre/cierra
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowDown') {
      e.preventDefault();
      openMenu();
    }
  });

  // Attach listeners to items
  items.forEach(item => {
    item.addEventListener('click', onItemClick);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        onItemClick(e);
      }
    });
  });

  // Return api to control externally
  return {
    open: openMenu,
    close: closeMenu,
    destroy() {
      toggle.removeEventListener('click', toggleMenu);
      toggle.removeEventListener('keydown', toggleKeyHandler);
      items.forEach(item => {
        item.removeEventListener('click', onItemClick);
      });
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };
}

// auto-init
document.addEventListener('DOMContentLoaded', () => {
  // offset: 0 por defecto, si necesitás compensar header fijo lo cambiás
  initQuickNavDropdown({ toggleSelector: '#quick-nav-toggle', menuSelector: '#quick-nav-menu', offset: 0, smooth: true });
});
