// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Mobile navigation
const btnNav = document.querySelector(".btn-mobile-nav");
const mainHeader = document.querySelector(".main--heading");

btnNav.addEventListener("click", function () {
  mainHeader.classList.toggle("nav-open");
});

// Sticky navigation
const featuredEl = document.querySelector(".featured--works");
const navItems = document.querySelectorAll(".main--nav__item");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting) {
      console.log(ent);
      for (let i = 1; i < navItems.length; i++) {
        navItems[i].classList.add("hidden");
      }
      mainHeader.classList.add("hidden");
      document.body.classList.add("sticky");
    }
    if (!ent.isIntersecting) {
      for (let i = 1; i < navItems.length; i++) {
        navItems[i].classList.remove("hidden");
      }
      mainHeader.classList.remove("hidden");
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-100px",
  }
);

obs.observe(featuredEl);
