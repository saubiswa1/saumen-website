'use client';

import { useEffect } from 'react';

export default function PortfolioBehavior() {
  useEffect(() => {
    const header = document.querySelector('#site-header');
    const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
    const primaryNav = document.querySelector('#primary-nav');
    const year = document.querySelector('#year');
    const contactForms = document.querySelectorAll<HTMLFormElement>('[data-contact-form]');

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
    const handleContactSubmit = (event: Event) => {
      event.preventDefault();
      const form = event.currentTarget as HTMLFormElement;
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const companyRole = String(data.get('companyRole') || '').trim();
      const message = String(data.get('message') || '').trim();
      const subject = companyRole
        ? `Website introduction — ${companyRole}`
        : `Website introduction from ${name}`;
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        companyRole ? `Company / role: ${companyRole}` : '',
        '',
        message,
      ].filter(Boolean).join('\n');
      const status = form.querySelector('[data-contact-status]');

      if (status) status.textContent = 'Opening your email app…';
      window.location.href = `mailto:saubiswa1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    menuToggle?.addEventListener('click', toggleMenu);
    primaryNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    contactForms.forEach((form) => form.addEventListener('submit', handleContactSubmit));
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
      contactForms.forEach((form) => form.removeEventListener('submit', handleContactSubmit));
      document.removeEventListener('keydown', handleKeydown);
      observer?.disconnect();
    };
  }, []);

  return null;
}
