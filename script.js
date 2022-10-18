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
const mainNav = document.querySelector(".main--nav");
// Toggle nav on click on the nav mobile btn
btnNav.addEventListener("click", function () {
  main.classList.toggle("nav-open");
});
// Close main nav if click on backdrop
mainNav.addEventListener("click", function () {
  main.classList.remove("nav-open");
});

///////////////////////////////////
// Sticky back-on-top button
const btnTop = document.querySelector(".btn--top");

const obsBtn = new IntersectionObserver(
  function (entries) {
    const entry1 = entries[0];
    // console.log(entry1);
    if (!entry1.isIntersecting) {
      btnTop.classList.remove("hidden-nav");
      btnTop.classList.add("sticky");
    }
    if (entry1.isIntersecting) {
      btnTop.classList.add("hidden-nav");
      btnTop.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
  }
);
obsBtn.observe(mainHeader);

///////////////////////////////////
// Cancel pointer events for nav item poiting to current page
const allNavElements = document.querySelectorAll(".main--nav__item a:link");
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
        if (entry) {
          if (window.innerWidth <= 550) {
            timelineMobileEl.classList.remove("hidden-nav");
            timelineDesktopEl.classList.add("hidden-nav");
          }
          if (window.innerWidth > 550) {
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
// Canesten & Social Pages layout change for mobile view
const worksImages = document.querySelectorAll(".works--images__toggle");
const worksImagesDesktop = document.querySelector(".works--img__desktop");
const worksImagesMobile = document.querySelector(".works--img__mobile");
if (
  document.title.includes("canesten digital") ||
  document.title.includes("social")
) {
  if (ResizeObserver) {
    const resizeObs = new ResizeObserver((entries) =>
      entries.forEach((e) => {
        if (e.contentRect.width <= 600) {
          worksImagesDesktop.classList.add("hidden-images");
          worksImagesMobile.classList.remove("hidden-images");
        }
        if (e.contentRect.width > 600) {
          worksImagesDesktop.classList.remove("hidden-images");
          worksImagesMobile.classList.add("hidden-images");
        }
      })
    );
    resizeObs.observe(main);
  } else {
    if (window.innerWidth <= 944) {
      console.log("smaller " + window.innerWidth);
      worksImagesDesktop.classList.add("hidden-images");
      worksImagesMobile.classList.remove("hidden-images");
    }
    if (window.innerWidth > 944) {
      console.log("larger " + window.innerWidth);
      worksImagesDesktop.classList.remove("hidden-images");
      worksImagesMobile.classList.add("hidden-images");
    }
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
  work.addEventListener("click", clickInfo);
});

////////////////////////////////
// Portfolio section event delegation
const portfolioItems = document.querySelectorAll(".portfolio__item");
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
const imgTargets = document.querySelectorAll("img[data-src]");
const body = document.querySelector("body");

const loadImg = function (entries, observer) {
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

////////////////////////////////
// Slider (carousel)
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".carousel--btn__left");
  const btnRight = document.querySelector(".carousel--btn__right");

  let curentSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curentSlide === maxSlide - 1) {
      curentSlide = 0;
    } else {
      curentSlide++;
    }
    goToSlide(curentSlide);
  };

  const prevSlide = function () {
    if (curentSlide === 0) {
      curentSlide = maxSlide - 1;
    } else {
      curentSlide--;
    }
    goToSlide(curentSlide);
  };

  const init = function () {
    goToSlide(0);
  };

  init();

  // Prevent error on other pages
  if (document.title === "Natassja Velasco") {
    setInterval(() => {
      btnRight.click();
    }, 3000);

    // Event Handlers
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") prevSlide();
      e.key === "ArrowRight" && nextSlide();
    });
  }
};
slider();
