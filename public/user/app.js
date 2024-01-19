// MOBILE MENU
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-links").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// ======== SHOW ACTIVE PAGE =======
const activePage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a").forEach((link) => {
  if (link.href.includes(`${activePage}`)) {
    link.classList.add("active-link");
  }
});

/*=============== SWIPER TESTIMONIAL ===============*/
var swiper = new Swiper(".swiper", {
  spaceBetween: true,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // pagination: {
  //     el: ".swiper-pagination",
  //     clickable : true,
  // },
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 200,
  reset: false,
});
sr.reveal(`.main, .why-area`);
sr.reveal(`.hero`, { delay: 500 });
sr.reveal(`.home-description, .sectors,  .testimonial, .questions`, {
  delay: 300,
});
// sr.reveal(`.home-search`, {delay:600})
// sr.reveal(`.home-value`, {delay:700})
sr.reveal(`.cta`, { delay: 600, origin: "bottom" });
// sr.reveal(`.logos-img`, { interval: 100})
// sr.reveal(`.value-images, .contact-content, form, .properties-tit`, { origin: 'left'})
sr.reveal(`.plans`, { origin: "right" });
// sr.reveal(`.properties-container, .map`, { origin: 'right'})

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  //when the scroll is higher than 350 viewpoert height, add the show-scroll class to the tag 'a' tag with scroll-to-top
  if (this.scrollY >= 350) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);
