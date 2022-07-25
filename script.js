///////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
if (yearEl) yearEl.textContent = currentYear;

///////////////////////////////////
// Mobile navigation
const btnNav = document.querySelector(".btn-mobile-nav");
const mainHeader = document.querySelector(".main--heading");
const main = document.querySelector(".main");
const logo = document.querySelector(".logo");

btnNav.addEventListener("click", function () {
  main.classList.toggle("nav-open");
});

///////////////////////////////////
// Smooth scrolling animation

const allNavElements = document.querySelectorAll(".main--nav__item a:link");
allNavElements.forEach(function (navEl) {
  navEl.addEventListener("click", function (e) {
    // e.preventDefault();
    const href = navEl.getAttribute("href");
    console.log(href);
    if (href === "#home") window.scrollTo({ top: 0, behavior: "smooth" });

    // Scrolling for other elements
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile navigation
    // if (navEl.classList.contains("main--nav__item"))
    main.classList.toggle("nav-open");
  });
});

///////////////////////////////////
// Sticky navigation

const featuredEl = document.querySelector(".featured--works");
const navItems = document.querySelectorAll(".main--nav__item");
const containerEl = document.querySelector(".container");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting) {
      if (containerEl.clientWidth >= "900") {
        for (let i = 1; i < navItems.length; i++) {
          navItems[i].classList.add("hidden-nav");
        }
        mainHeader.classList.add("hidden");
        document.body.classList.add("sticky");
      }
      if (containerEl.clientWidth < "900") {
        btnNav.classList.add("sticky");
      }
    }
    if (!ent.isIntersecting) {
      if (containerEl.clientWidth >= "900") {
        for (let i = 1; i < navItems.length; i++) {
          navItems[i].classList.remove("hidden-nav");
        }
        mainHeader.classList.remove("hidden");
        document.body.classList.remove("sticky");
      }
      if (containerEl.clientWidth < "900") {
        btnNav.classList.remove("sticky");
      }
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-100px",
  }
);
if (featuredEl) obs.observe(featuredEl);

///////////////////////////////////
// Cancel pointer events for nav item poiting to current page

console.log(document.title);
allNavElements.forEach(function (navEl) {
  if (document.title.includes(navEl.textContent)) {
    navEl.classList.add("no-pointer-events", "color");
  }
});

///////////////////////////////////
// About page fix when screen width is smaller than 944px
const aboutDescEl = document.querySelector(".about--description");
console.log(window.innerWidth);
if (window.innerWidth < 945) {
  aboutDescEl.innerHTML =
    "Armed with 6 years of on-hand agency experience, I am a well-rounded and versatile creative.<br> As an insightful and strategic thinker, I believe in purpose-driven, relatable design and campaigns that deliver the work.";
}
