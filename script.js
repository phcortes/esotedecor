// =========================================
//  ESOTÉ DECOR — Landing Page Script
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- HERO LOAD ANIMATION ----
  const hero = document.getElementById('hero');
  setTimeout(() => hero.classList.add('loaded'), 100);

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
  navbar.classList.add('scrolled'); // start styled

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- INTERSECTION OBSERVER (scroll reveal) ----
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  // ---- CONTACT FORM ----
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const empresa = document.getElementById('empresa').value.trim();

    if (!nome || !whatsapp || !empresa) {
      shakeForm(form);
      return;
    }

    // Build WhatsApp message
    const msg = encodeURIComponent(
      `Olá! Vim pela landing page da ESOTÉ DECOR.\n\n` +
      `*Nome:* ${nome}\n` +
      `*WhatsApp:* ${whatsapp}\n` +
      `*Empresa:* ${empresa}\n\n` +
      `Gostaria de solicitar um orçamento personalizado! 🌿`
    );

    // Show success
    form.style.display = 'none';
    success.classList.add('show');

    // Open WhatsApp (update number as needed)
    setTimeout(() => {
      window.open(`https://wa.me/5521999999999?text=${msg}`, '_blank');
    }, 800);
  });

  function shakeForm(el) {
    el.classList.add('shake');
    el.addEventListener('animationend', () => el.classList.remove('shake'), { once: true });
  }

  // ---- SMOOTH ANCHOR SCROLL (for older browsers) ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ---- HERO PARALLAX (subtle) ----
  const heroBg = document.getElementById('hero-bg-img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1) translateY(${scrolled * 0.25}px)`;
      }
    }, { passive: true });
  }

  // ---- WHATSAPP PHONE MASK ----
  const phoneInput = document.getElementById('whatsapp');
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      let val = phoneInput.value.replace(/\D/g, '').substring(0, 11);
      if (val.length > 6) {
        val = `(${val.slice(0,2)}) ${val.slice(2,7)}-${val.slice(7)}`;
      } else if (val.length > 2) {
        val = `(${val.slice(0,2)}) ${val.slice(2)}`;
      } else if (val.length > 0) {
        val = `(${val}`;
      }
      phoneInput.value = val;
    });
  }

});
