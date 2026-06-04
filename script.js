/* ============================================================
   Nicole Design & Co. — script.js
   Header state, mobile nav, smooth-scroll, scroll reveals.
   ============================================================ */
(function () {
  "use strict";

  /* ---- Current year in footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky header background on scroll ---- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu toggle ---- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    /* Close after tapping a link or the CTA button */
    menu.querySelectorAll("a, button").forEach(function (el) {
      el.addEventListener("click", closeMenu);
    });
  }

  /* ---- Smooth scroll with header offset ---- */
  var headerH = 78;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - (id === "#top" ? 0 : headerH - 8);
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    });
  });

  /* ---- Placeholder links: prevent dead jumps ---- */
  document.querySelectorAll('a[data-placeholder]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (a.getAttribute("href") === "#") e.preventDefault();
    });
  });

  /* ---- Scroll reveal ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    /* Stagger grouped items for a gentle cascade */
    var groups = [
      document.querySelectorAll(".services-grid .service-card"),
      document.querySelectorAll(".work-grid .work-card"),
      document.querySelectorAll(".team-grid .team-card"),
      document.querySelectorAll(".hero .reveal")
    ];
    groups.forEach(function (group) {
      group.forEach(function (el, i) {
        el.style.transitionDelay = (i * 0.07) + "s";
      });
    });

    reveals.forEach(function (el) { io.observe(el); });

    /* Failsafe: the observer should reveal at least the above-the-fold
       elements almost immediately. If NOTHING has been revealed shortly
       after load, the observer isn't firing in this environment — so show
       everything statically (no transition) to guarantee the page is never
       blank. When the observer IS working we leave it alone, preserving the
       scroll-reveal animation for the rest of the page. */
    setTimeout(function () {
      if (document.querySelectorAll(".reveal.in").length === 0) {
        document.querySelectorAll(".reveal").forEach(function (el) {
          el.style.transition = "none";
          el.style.transitionDelay = "0s";
          el.classList.add("in");
        });
      }
    }, 900);
  }
})();
