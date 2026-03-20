/* ============================================
   MuuuTeca — Shared JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Floating nav: scroll background ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    function updateNavBg() {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateNavBg, { passive: true });
    updateNavBg();
  }

  /* ── Mobile menu ── */
  const menuBtn    = document.getElementById('menuBtn');
  const closeBtn   = document.getElementById('closeMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const backdrop   = document.getElementById('mobileBackdrop');

  if (menuBtn && mobileMenu) {
    function openMenu()  { mobileMenu.classList.add('open');   document.body.style.overflow = 'hidden'; }
    function closeMenu() { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn)  closeBtn.addEventListener('click', closeMenu);
    if (backdrop)  backdrop.addEventListener('click', closeMenu);

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ── Nav: active link highlighting ── */
  const pageLinks = document.querySelectorAll('.page-nav-link');
  if (pageLinks.length) {
    const id = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    pageLinks.forEach(a => {
      const href = a.getAttribute('href');
      if (
        (id === 'index' && href === 'index.html') ||
        (id !== 'index' && href === id + '.html')
      ) {
        a.classList.add('nav-active');
      }
    });
  }

  /* ── Booking form ── */
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    const successMsg = document.getElementById('bookingSuccess');
    const errorMsg   = document.getElementById('bookingError');
    const dateInput  = document.getElementById('bookingDate');

    if (dateInput) {
      dateInput.min = new Date().toISOString().split('T')[0];
    }

    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      if (successMsg) successMsg.classList.add('hidden');
      if (errorMsg)   errorMsg.classList.add('hidden');

      const date   = document.getElementById('bookingDate')?.value;
      const time   = document.getElementById('bookingTime')?.value;
      const guests = document.getElementById('bookingGuests')?.value;

      if (!date || !time || !guests) {
        if (errorMsg) errorMsg.classList.remove('hidden');
        return;
      }

      const btn = bookingForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Invio in corso…';
      btn.style.opacity = '0.7';

      setTimeout(() => {
        if (successMsg) successMsg.classList.remove('hidden');
        bookingForm.reset();
        btn.disabled = false;
        btn.textContent = 'Verifica Disponibilità';
        btn.style.opacity = '1';
      }, 1200);
    });
  }

  /* ── Scroll fade-up animations ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      observer.observe(el);
    });
  }
});
