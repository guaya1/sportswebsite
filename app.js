
// Enhanced Product Gallery
function initProductGallery() {
  const gallery = document.querySelector('.product-showcase');
  if (!gallery) return;

  // Elements
  const thumbnails = gallery.querySelectorAll('.thumbnail-btn');
  const mainImage = gallery.querySelector('#showcase-main-image');
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Preload all gallery images
  function preloadImages() {
    thumbnails.forEach(thumb => {
      const img = new Image();
      img.src = thumb.dataset.image;
    });
  }
  
  // Change main image
  function changeImage(thumb) {
    thumbnails.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    
    const newImageSrc = thumb.dataset.image;
    const newImageAlt = `Sylarna Shell Jacket - ${thumb.dataset.alt}`;
    
    mainImage.style.opacity = 0;
    setTimeout(() => {
      mainImage.src = newImageSrc;
      mainImage.alt = newImageAlt;
      mainImage.style.opacity = 1;
    }, 200);
  }
  
  // Handle swipe gestures
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }
  
  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }
  
  function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
      // Swipe left - next image
      const currentIndex = Array.from(thumbnails).findIndex(t => t.classList.contains('active'));
      const nextIndex = (currentIndex + 1) % thumbnails.length;
      changeImage(thumbnails[nextIndex]);
    }
    
    if (touchEndX - touchStartX > 50) {
      // Swipe right - previous image
      const currentIndex = Array.from(thumbnails).findIndex(t => t.classList.contains('active'));
      const prevIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      changeImage(thumbnails[prevIndex]);
    }
  }
  
  // Initialize
  preloadImages();
  
  // Click events
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => changeImage(thumb));
    
    // Keyboard navigation
    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        changeImage(thumb);
      }
    });
  });
  
  // Touch events
  gallery.addEventListener('touchstart', handleTouchStart, { passive: true });
  gallery.addEventListener('touchend', handleTouchEnd, { passive: true });
}

// Initialize
document.addEventListener('DOMContentLoaded', initProductGallery);

