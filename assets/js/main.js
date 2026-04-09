/* =========================================================
   DevOps Portfolio — main.js
   ========================================================= */

(function () {
  'use strict';

  /* ── Scroll Progress Bar ───────────────────────────────── */
  var progressBar = document.getElementById('scrollProgress');

  function updateProgress() {
    var scrollTop  = window.scrollY;
    var docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    var pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });


  /* ── Reveal on Scroll ──────────────────────────────────── */
  var revealEls = document.querySelectorAll('.rv');

  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });

  revealEls.forEach(function (el) { revealObs.observe(el); });

  // Safety fallback — ensure everything is visible after 1.2s
  setTimeout(function () {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }, 1200);


  /* ── Skill Bar Scroll Animation ────────────────────────── */
  // Reads data-skill="XX" and animates width to XX% on intersection
  var skillFills = document.querySelectorAll('.skill-fill[data-skill]');

  var skillObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var target = entry.target.getAttribute('data-skill') + '%';
        entry.target.style.width = target;
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillFills.forEach(function (el) { skillObs.observe(el); });


  /* ── Stats Counter Animation ───────────────────────────── */
  function animateCounter(el) {
    var target  = parseInt(el.getAttribute('data-to'), 10);
    var suffix  = el.getAttribute('data-sfx') || '';
    var current = 0;
    var step    = target / (1400 / 16);
    var timer   = setInterval(function () {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  var statsStrip = document.getElementById('statsStrip');
  if (statsStrip) {
    var statsObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-to]').forEach(animateCounter);
          statsObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    statsObs.observe(statsStrip);
  }


  /* ── Project Filter ────────────────────────────────────── */
  var filterTabs   = document.querySelectorAll('.ftab');
  var projectCards = document.querySelectorAll('.proj-card');

  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var filter = tab.getAttribute('data-filter');

      filterTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      projectCards.forEach(function (card) {
        var match = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.style.display = match ? 'flex' : 'none';
      });
    });
  });


  /* ── Scroll Dots ───────────────────────────────────────── */
  var sectionIds = ['hero', 'about', 'featured', 'projects', 'skills', 'impact', 'contact'];
  var scrollDots = document.querySelectorAll('.scroll-dot');

  scrollDots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      var target = document.getElementById(sectionIds[i]);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  function updateScrollDots() {
    var scrollY     = window.scrollY + 220;
    var activeIndex = 0;
    sectionIds.forEach(function (id, i) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) activeIndex = i;
    });
    scrollDots.forEach(function (d) { d.classList.remove('active'); });
    if (scrollDots[activeIndex]) scrollDots[activeIndex].classList.add('active');
  }

  window.addEventListener('scroll', updateScrollDots, { passive: true });
  updateScrollDots();


  /* ── Mobile Navigation ─────────────────────────────────── */
  var navToggle  = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
      });
    });
  }


  /* ── Active Nav Link Highlight on Scroll ───────────────── */
  var navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNavLink() {
    var scrollY = window.scrollY + 120;
    var current = '';
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });


  /* ── Navbar scroll shadow ──────────────────────────────── */
  var mainNav = document.getElementById('mainNav');
  window.addEventListener('scroll', function () {
    if (mainNav) {
      mainNav.style.boxShadow = window.scrollY > 40
        ? '0 4px 30px rgba(0,0,0,0.4)'
        : 'none';
    }
  }, { passive: true });


  /* ── Subtle Parallax on Hero background text ───────────── */
  var heroBgText = document.querySelector('.hero-bg-text');

  if (heroBgText) {
    window.addEventListener('scroll', function () {
      // Move at 30% of scroll speed for a subtle depth effect
      heroBgText.style.transform = 'translateY(calc(-50% + ' + (window.scrollY * 0.3) + 'px))';
    }, { passive: true });
  }

})();
