// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Mobile navigation
const btnNav = document.querySelector(".btn-mobile-nav");
const mainHeader = document.querySelector(".main");

btnNav.addEventListener("click", function () {
  mainHeader.classList.toggle("nav-open");
});

// Sticky navigation
const featuredEl = document.querySelector(".featured--works");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting) {
      console.log(ent);
      document.body.classList.add("sticky");
    }
    if (!ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-50px",
  }
);

obs.observe(featuredEl);
