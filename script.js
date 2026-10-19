document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  document.querySelectorAll('.lineage-group-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const items = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', !expanded);
      btn.querySelector('.toggle-icon').textContent = expanded ? '+' : '−';
      if (expanded) {
        items.style.maxHeight = items.scrollHeight + 'px';
        requestAnimationFrame(() => {
          items.classList.remove('open');
          items.style.maxHeight = '0';
        });
      } else {
        items.removeAttribute('hidden');
        items.classList.add('open');
        items.style.maxHeight = items.scrollHeight + 'px';
        items.addEventListener('transitionend', function handler() {
          items.style.maxHeight = 'none';
          items.removeEventListener('transitionend', handler);
        });
      }
    });
  });

  const fadeEls = document.querySelectorAll(
    '.section-header, .about-grid, .lineage-chain, .lineage-group, .teaching-card, ' +
    '.lalaji-content, .dargah-content, .visit-card, .featured-quote'
  );

  fadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach(el => observer.observe(el));

  // Language switching
  function setLanguage(lang) {
    const dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    const t = translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key]) el.innerHTML = t[key];
    });

    localStorage.setItem('dargah-lang', lang);
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  const saved = localStorage.getItem('dargah-lang');
  if (saved && saved !== 'en') setLanguage(saved);
});
