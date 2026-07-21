(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    if (!toggle || !mobileMenu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  };

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu?.classList.toggle('open', open);
    mobileMenu?.setAttribute('aria-hidden', String(!open));
  });
  mobileMenu?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      toggle?.focus();
    }
  });

  const openTally = () => {
    const settings = window.fractionlSettings || {};
    if (window.Tally?.openPopup && settings.tallyFormId) {
      window.Tally.openPopup(settings.tallyFormId, {
        layout: 'modal',
        width: 700,
        emoji: { text: '👋', animation: 'wave' },
      });
      return;
    }
    if (settings.tallyUrl) window.open(settings.tallyUrl, '_blank', 'noopener,noreferrer');
  };
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-tally-open]');
    if (!button) return;
    event.preventDefault();
    openTally();
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((node) => node.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((node) => observer.observe(node));
  }

  document.querySelectorAll('[data-insight-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.insightFilter;
      document.querySelectorAll('[data-insight-filter]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      document.querySelectorAll('[data-insight-category]').forEach((card) => {
        card.hidden = category !== 'all' && card.dataset.insightCategory !== category;
      });
      const url = new URL(window.location.href);
      category === 'all' ? url.searchParams.delete('category') : url.searchParams.set('category', category);
      window.history.replaceState({}, '', url);
    });
  });
})();
