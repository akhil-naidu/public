// Step 01
const images = document.querySelectorAll('[data-src]');

// step 04 => Contains the most important logic
function preloadImage(img) {
  const src = img.getAttribute('data-src');

  if (!src) {
    console.log(`something is wrong while fetching images`);
    return;
  }
  img.src = src;
}

// Step 02
const imgOptions = {
  threshold: 0,
  rootMargin: '0px 0px 100px 0px',
};

// Step 03
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
}, imgOptions);

// step 05
images.forEach((image) => {
  imgObserver.observe(image);
});
