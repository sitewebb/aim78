// AIM 78 — interactions simples : menu mobile, lightbox photothèque, formulaire de contact

document.addEventListener('DOMContentLoaded', () => {

  // --- Menu burger mobile ---
  const burger = document.getElementById('burger');
  const nav = document.getElementById('main-nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Ferme le menu quand on clique un lien (mobile)
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Année dynamique dans le pied de page ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Lightbox photothèque ---
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxFrame = document.getElementById('lightbox-frame');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (gallery && lightbox) {
    gallery.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const caption = item.getAttribute('data-caption') || '';
        lightboxCaption.textContent = caption;
        lightboxFrame.style.background = getComputedStyle(item).backgroundImage !== 'none'
          ? getComputedStyle(item).backgroundImage
          : getComputedStyle(item).background;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }

  // --- Formulaire de contact (démo statique, à relier à un service d'envoi) ---
  const form = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  if (form && formNote) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent = 'Merci, votre message a bien été préparé. (Formulaire à relier à un service d\'envoi d\'e-mails.)';
      form.reset();
    });
  }

  // --- Mise en surbrillance du lien de navigation actif au défilement ---
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`.main-nav a[href="#${entry.target.id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
  }
});
