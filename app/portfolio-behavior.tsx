'use client';

import { useEffect } from 'react';

export default function PortfolioBehavior() {
  useEffect(() => {
    const header = document.querySelector('#site-header');
    const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
    const primaryNav = document.querySelector('#primary-nav');
    const year = document.querySelector('#year');

    if (year) year.textContent = String(new Date().getFullYear());

    const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
    const closeMenu = () => {
      menuToggle?.setAttribute('aria-expanded', 'false');
      primaryNav?.classList.remove('is-open');
    };
    const toggleMenu = () => {
      const isOpen = menuToggle?.getAttribute('aria-expanded') === 'true';
      menuToggle?.setAttribute('aria-expanded', String(!isOpen));
      primaryNav?.classList.toggle('is-open', !isOpen);
    };
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    menuToggle?.addEventListener('click', toggleMenu);
    primaryNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', handleKeydown);

    const revealItems = document.querySelectorAll('.reveal');
    let observer: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            instance.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8%', threshold: 0.08 });
      revealItems.forEach((item) => observer?.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    return () => {
      window.removeEventListener('scroll', updateHeader);
      menuToggle?.removeEventListener('click', toggleMenu);
      primaryNav?.querySelectorAll('a').forEach((link) => link.removeEventListener('click', closeMenu));
      document.removeEventListener('keydown', handleKeydown);
      observer?.disconnect();
    };
  }, []);

  return null;
}
