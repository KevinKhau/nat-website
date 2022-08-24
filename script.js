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
    // console.log(href);
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

const featuredLastEl = document.querySelector(
  ".featured--works__item:last-child"
);

// console.log(featuredLastEl);
const featuredEl = document.querySelector(".featured--works");
const navItems = document.querySelectorAll(".main--nav__item");
const containerEl = document.querySelector(".container");
console.log(containerEl);

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    // console.log(ent);
    if (document.title.includes("|")) return;
    if (ent.isIntersecting) {
      if (containerEl.clientWidth >= "900") {
        mainHeader.classList.add("hidden");
        for (let i = 1; i < navItems.length; i++) {
          navItems[i].classList.add("hidden-nav");
        }
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
    rootMargin: "480px",
  }
);

// Fix for resize after scrolling down on home page
const resizeFeaturedEl = new ResizeObserver((entries) => {
  for (let entry of entries) {
    if (entry) {
      if (window.innerWidth <= 944) {
        mainHeader.classList.remove("hidden");
        // fix resize bug??
        document.body.classList.remove("sticky");
        for (let i = 1; i < navItems.length; i++) {
          navItems[i].classList.remove("hidden-nav");
        }
      }
    }
  }
});

if (featuredEl && featuredLastEl) {
  obs.observe(featuredLastEl);
  resizeFeaturedEl.observe(featuredEl);
}
// if (featuredEl) {
//   obs.observe(featuredEl);
//   resizeFeaturedEl.observe(featuredEl);
// }

///////////////////////////////////
// Cancel pointer events for nav item poiting to current page

allNavElements.forEach(function (navEl) {
  if (document.title.includes(navEl.textContent)) {
    navEl.classList.add("no-pointer-events", "color");
  }
});

///////////////////////////////////
// About-page fix when screen width is smaller than 944px
const aboutDescEl = document.querySelector(".about--description");
if (aboutDescEl) {
  if (window.innerWidth < 945) {
    aboutDescEl.innerHTML =
      "Armed with 6 years of on-hand agency experience, I am a well-rounded and versatile creative.<br> As an insightful and strategic thinker, I believe in purpose-driven, relatable design and campaigns that deliver the work.";
  }
}

///////////////////////////////////
// About page - timeline layout change on resize (smaller than 55rem)
const timelineElements = document.querySelectorAll(".timeline");
const timelineDesktopEl = document.querySelector(".timeline--desktop");
const timelineMobileEl = document.querySelector(".timeline--mobile");
const aboutSectionEl = document.querySelector(".about");

if (aboutSectionEl) {
  if (ResizeObserver) {
    const resizeObs = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // console.log(entry);
        if (entry) {
          if (window.innerWidth <= 550) {
            // console.log("nav-small!");
            timelineMobileEl.classList.remove("hidden-nav");
            timelineDesktopEl.classList.add("hidden-nav");
          }
          if (window.innerWidth > 550) {
            // console.log("nav-large!");
            timelineDesktopEl.classList.remove("hidden-nav");
            timelineMobileEl.classList.add("hidden-nav");
          }
        }
      }
    });

    resizeObs.observe(aboutSectionEl);
  } else {
    if (timelineElements.length > 0) {
      if (window.innerWidth <= 550) {
        timelineDesktopEl.classList.add("hidden-nav");
        timelineMobileEl.classList.remove("hidden-nav");
      }
      if (window.innerWidth > 550) {
        timelineMobileEl.classList.add("hidden-nav");
        timelineDesktopEl.classList.remove("hidden-nav");
      }
    }
    window.addEventListener("resize", (e) => console.log(e.target.innerWidth));
  }
}

///////////////////////////////////
// Featured works section event delegation
const featuredWorksItems = document.querySelectorAll(".featured--works__item");

// Select <a> element
function clickInfo(event) {
  const aTagEl = event.target.closest("figure").children[1];
  aTagEl.click();
}

// Use event delegation to trigger the click event on the <a> element when clicking on the <figure> container
featuredWorksItems.forEach(function (work) {
  // const elClass = work.classList[1];
  work.addEventListener("click", clickInfo);
});

////////////////////////////////
// Portfolio section event delegation
const portfolioItems = document.querySelectorAll(".portfolio__item");
// console.log(portfolioItems);

function clickItem(event) {
  const aTagPortfolioEl = event.target.closest("h3").children[0];
  console.log(aTagPortfolioEl);
  aTagPortfolioEl.click();
}

portfolioItems.forEach(function (item) {
  item.addEventListener("click", clickItem);
});

////////////////////////////////
// Tabbed component for the portfolio / works page

const tabs = document.querySelectorAll(".portfolio__tab");
const tabsContainer = document.querySelector(".portfolio__tab--container");
const tabsContent = document.querySelectorAll(".portfolio__content");
if (tabs.length > 0) console.log(tabs);
if (tabsContainer) console.log(tabsContainer);

// Use event delegation to select each tab (btn) instead of adding an event listener for each tab
if (tabsContainer) {
  tabsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".portfolio__tab");
    if (clicked) {
      // Remove active from the other tab(s)
      tabs.forEach((t) => t.classList.remove("portfolio__tab--active"));
      tabsContent.forEach((t) =>
        t.classList.remove("portfolio__content--active")
      );
      // Activate  tab
      clicked.classList.add("portfolio__tab--active");
      console.log(clicked);

      // Hide other contents (remove active class)

      // Activate content area
      const activeContent = document.querySelector(
        `.portfolio__content--${clicked.dataset.tab}`
      );
      activeContent.classList.add("portfolio__content--active");
    }
  });
}

// Lazy loading images

// const loadImg = function (entries, observer) {
//   entries.forEach((entry) => {
//     if (!entry.isIntersecting) return;
//     entry.target.src = entry.target.dataset.src;
//     entry.target.addEventListener("load", function () {
//       entry.target.classList.remove("lazy-img");
//     });
//   });
// };

const imgTargets = document.querySelectorAll("img[data-src]");
console.log(imgTargets);

const body = document.querySelector("body");

const loadImg = function (entries, observer) {
  // const [entry] = entries;
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;

    // Replace src with data-src
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-loading");
    });
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach((img) => imgObserver.observe(img));
