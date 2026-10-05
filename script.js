/* ===== ZYRO GAMING CLUB ===== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Nav background on scroll --- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu --- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('nav-menu');

  function setMenu(open) {
    if (!burger || !menu) return;
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  function menuOpen() {
    return !!(menu && menu.classList.contains('open'));
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      setMenu(!menuOpen());
    });

    /* close after choosing a section */
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });

    /* Escape closes and returns focus to the button */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOpen()) {
        setMenu(false);
        burger.focus();
      }
    });

    /* click outside closes */
    document.addEventListener('click', function (e) {
      if (!menuOpen()) return;
      if (nav && nav.contains(e.target)) return;
      setMenu(false);
    });

    /* reset when returning to desktop width */
    var mq = window.matchMedia('(min-width: 901px)');
    var onMq = function (ev) { if (ev.matches) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    else if (mq.addListener) mq.addListener(onMq);
  }

  /* --- Year --- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Scroll reveal (skipped when reduced motion is on) --- */
  var revealTargets = document.querySelectorAll(
    '.section-head, .games-list li, .rate-table, .subhead, .g-item, .reel, .visit-card, .food-copy, .food-img, .map-wrap, .fact'
  );

  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        setTimeout(function () { el.classList.add('in'); }, Math.min(i * 40, 240));
        io.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* --- Videos: play only while visible --- */
  var videos = document.querySelectorAll('.reel video');
  if (videos.length && 'IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          if (v.preload === 'none') v.preload = 'auto';
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.3 });
    videos.forEach(function (v) { vio.observe(v); });
  }

  /* --- Hero video: pause off-screen, respect reduced motion --- */
  var heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    if (reduceMotion) {
      heroVideo.removeAttribute('autoplay');
      heroVideo.pause();
    } else if ('IntersectionObserver' in window) {
      var hio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var p = heroVideo.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            heroVideo.pause();
          }
        });
      }, { threshold: 0.1 });
      hio.observe(heroVideo);
    }
  }

  /* --- Anchor links: offset for the fixed nav, move focus to target --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = nav ? nav.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
})();
