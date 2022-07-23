// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Mobile navigation
const btnNav = document.querySelector(".btn-mobile-nav");
const mainHeader = document.querySelector(".main--heading");
const main = document.querySelector(".main");

btnNav.addEventListener("click", function () {
  main.classList.toggle("nav-open");
});

// Sticky navigation

const featuredEl = document.querySelector(".featured--works");
const navItems = document.querySelectorAll(".main--nav__item");
const containerEl = document.querySelector(".container");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting) {
      // console.log(ent);
      if (containerEl.clientWidth >= "900") {
        for (let i = 1; i < navItems.length; i++) {
          navItems[i].classList.add("hidden-nav");
        }
        mainHeader.classList.add("hidden");
        document.body.classList.add("sticky");
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
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-100px",
  }
);

obs.observe(featuredEl);
