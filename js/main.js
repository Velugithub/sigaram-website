/* ============================================================
   Site interactions — no dependencies, no build step
   ============================================================ */
(function () {
  "use strict";

  /* --- Sticky header shadow --- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu --- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.classList.remove("active");
      }
    });
  }

  /* --- Reveal on scroll --- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* --- FAQ accordion --- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* --- Active nav link --- */
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* --- Footer year --- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --- Contact form ---
     Uses Formspree (free tier: 50 submissions/month, no backend needed).
     1. Create a free form at https://formspree.io and copy your endpoint.
     2. Paste it below as FORMSPREE_ENDPOINT. That's the only change needed. */
  var FORMSPREE_ENDPOINT = "https://formspree.io/f/xvkglrdk";

  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (FORMSPREE_ENDPOINT.indexOf("YOUR_FORM_ID") !== -1) {
        status.className = "form-status err";
        status.textContent = "This demo form isn't connected yet — add your Formspree endpoint in js/main.js (one line).";
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Sending…";
      fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            status.className = "form-status ok";
            status.textContent = "Thanks — your message is on its way. We'll reply within one business day.";
            form.reset();
          } else {
            throw new Error("bad response");
          }
        })
        .catch(function () {
          status.className = "form-status err";
          status.textContent = "Something went wrong sending your message. Please email us directly instead.";
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = original;
        });
    });
  }
})();
