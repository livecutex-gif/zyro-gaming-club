/* ===== ZYRO GAMING CLUB ===== */
(function () {
  'use strict';

  /* --- Nav scroll state --- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu --- */
  var burger = document.getElementById('burger');
  var links = document.getElementById('nav-menu');

  function setMenu(open) {
    if (!burger || !links) return;
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  function isMenuOpen() {
    return !!(links && links.classList.contains('open'));
  }

  if (burger && links) {
    burger.addEventListener('click', function () {
      setMenu(!isMenuOpen());
    });

    /* Close after choosing a section link */
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });

    /* Escape closes the menu and returns focus to the button */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMenuOpen()) {
        setMenu(false);
        burger.focus();
      }
    });

    /* Click outside closes the menu */
    document.addEventListener('click', function (e) {
      if (!isMenuOpen()) return;
      if (nav && nav.contains(e.target)) return;
      setMenu(false);
    });

    /* Reset state when resizing back up to desktop */
    var mq = window.matchMedia('(min-width: 901px)');
    var onMq = function (ev) { if (ev.matches) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    else if (mq.addListener) mq.addListener(onMq);
  }

  /* --- Year --- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* --- Scroll reveal --- */
  var targets = document.querySelectorAll(
    '.section-head, .game-card, .price-card, .offer, .g-item, .reel, .visit-card, .food-copy, .food-img, .map-wrap'
  );
  targets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = Math.min(i * 55, 320);
          setTimeout(function () { el.classList.add('in'); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  /* --- Reels: play when visible, pause when not --- */
  var reels = document.querySelectorAll('.reel video');
  if (reels.length && 'IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    reels.forEach(function (v) { vio.observe(v); });
  }

  /* --- Hero video: pause when off-screen to save battery --- */
  var heroVid = document.querySelector('.hero-video');
  if (heroVid && 'IntersectionObserver' in window) {
    var hio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var p = heroVid.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          heroVid.pause();
        }
      });
    }, { threshold: 0.15 });
    hio.observe(heroVid);
  }

  /* --- Smooth anchor offset for fixed nav --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: top, behavior: 'smooth' });
      /* Move focus to the target so keyboard users land where they looked */
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    });
  });
})();
