(function () {
  'use strict';

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var dropdowns = document.querySelectorAll('.dropdown');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      navToggle.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close nav when clicking a link (anchor)
    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Dropdown on mobile (toggle submenu)
  dropdowns.forEach(function (dropdown) {
    var trigger = dropdown.querySelector('a');
    if (trigger) {
      trigger.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  });

  // FAQ accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    if (btn && answer) {
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('active');
        faqItems.forEach(function (other) {
          other.classList.remove('active');
          var otherAnswer = other.querySelector('.faq-a');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // Sticky header shadow on scroll
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)';
      }
    });
  }

  // Contact form submit (demo - no backend)
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you! Your inquiry has been received. We will contact you soon for your free trial.');
    });
  }
})();
