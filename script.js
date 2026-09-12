/* ==========================================================================
   Nutri Heaven — Interactivity
   Vanilla JS only. No dependencies.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky header state on scroll ---------- */
  var header = document.getElementById('siteHeader');
  function updateHeaderState() {
    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close mobile nav after choosing a link
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Category filter for product grid ---------- */
  var pills = document.querySelectorAll('.pill');
  var productCards = document.querySelectorAll('.product-card');
  var productNote = document.querySelector('.product-note');

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('is-active'); });
      pill.classList.add('is-active');

      var category = pill.getAttribute('data-category');
      var visibleCount = 0;

      productCards.forEach(function (card) {
        var matches = category === 'all' || card.getAttribute('data-category') === category;
        card.classList.toggle('is-hidden', !matches);
        if (matches) visibleCount++;
      });

      if (productNote) {
        productNote.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });

  /* ---------- Smooth scroll for in-page anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerOffset = 76;
          var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- Scroll-reveal for section heads and key blocks ---------- */
  var revealTargets = document.querySelectorAll(
    '.section-head, .why-item, .story-inner, .visit-info, .visit-map, .contact-form-wrap'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show everything immediately if IntersectionObserver isn't supported
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Contact form validation (client-side only) ---------- */
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var fields = [
        { input: document.getElementById('name'), error: document.getElementById('nameError'), message: 'Please enter your name.' },
        { input: document.getElementById('phone'), error: document.getElementById('phoneError'), message: 'Please enter a valid phone number.' },
        { input: document.getElementById('message'), error: document.getElementById('messageError'), message: 'Please add a short message.' }
      ];

      fields.forEach(function (field) {
        var row = field.input.closest('.form-row');
        var value = field.input.value.trim();
        var isPhoneValid = field.input.id !== 'phone' || /^[0-9+\-\s]{7,15}$/.test(value);

        if (!value || !isPhoneValid) {
          valid = false;
          row.classList.add('has-error');
          field.error.textContent = field.message;
        } else {
          row.classList.remove('has-error');
          field.error.textContent = '';
        }
      });

      if (valid) {
        // NOTE: This only simulates a successful submission.
        // Connect this form to a real backend or service (Formspree, EmailJS, etc.)
        // before launch so messages actually reach the shop.
        contactForm.reset();
        formSuccess.hidden = false;
        setTimeout(function () { formSuccess.hidden = true; }, 6000);
      }
    });
  }

  /* ---------- Stock updates signup (placeholder) ---------- */
  var updatesForm = document.getElementById('updatesForm');
  var updatesSuccess = document.getElementById('updatesSuccess');

  if (updatesForm) {
    updatesForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // NOTE: Placeholder only — wire up to WhatsApp Business API,
      // an SMS service, or a simple mailing list tool before launch.
      updatesForm.reset();
      updatesSuccess.hidden = false;
      setTimeout(function () { updatesSuccess.hidden = true; }, 6000);
    });
  }

});
