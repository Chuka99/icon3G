/* ICON 3G — interactions: mobile nav, viewfinder placeholders, scroll reveal */
(function () {
  "use strict";

  /* ---- Mobile navigation ---- */
  var burger = document.querySelector(".burger");
  var links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("mobile-open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("mobile-open");
        burger.classList.remove("open");
      });
    });
  }

  /* ---- Build viewfinder image placeholders ---- */
  var lensSVG =
    '<svg class="lens" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.4"/>' +
    '<path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></svg>';

  document.querySelectorAll(".frame").forEach(function (f) {
    var caption = f.getAttribute("data-caption") || "Image placeholder";
    var ratio = f.getAttribute("data-ratio") || "4:3";
    ["tl", "tr", "bl", "br"].forEach(function (c) {
      var s = document.createElement("span");
      s.className = "frame__corner " + c;
      f.appendChild(s);
    });
    var body = document.createElement("div");
    body.className = "frame__body";
    body.innerHTML = lensSVG + "<b>" + caption + "</b><em>Drop image here</em>";
    f.appendChild(body);

    var meta = document.createElement("div");
    meta.className = "frame__meta";
    meta.innerHTML = '<span class="frame__rec">REC</span><span>' + ratio + "</span>";
    f.appendChild(meta);
  });

  /* ---- Scroll reveal ---- */
  var io;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    /* Safety net: never leave content hidden if the observer doesn't fire */
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.in)").forEach(function (el) { el.classList.add("in"); });
    }, 2600);
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Footer year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
