// Runs passed in function every 20 milliseconds
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
// Selecting all slider images and corresponding text  
const sliderImages = Array.from(document.querySelectorAll('.align-right'));
const sliderText = Array.from(document.querySelectorAll('.align-left'));

function checkSlide() {
 sliderImages.forEach(image => { 
   /* slideInAt + isHalfShown create a minimum Y coordinate 
      to show an image - when scrolling down*/
   const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
   // Bottom of image
   const imageBottom = image.offsetTop + image.height;
   // Is the bottom of the window half past the top of current image
   const isHalfShown = slideInAt > image.offsetTop;
   // Is the top of the window below the bottom of current image
   const isNotScrolledPast = window.scrollY < imageBottom;
   // If past half of the image && image has not been scrolled past
   if (isHalfShown && isNotScrolledPast) {
    // Animate image into view   
    image.classList.add('active');
    // Animate corresponding text into view
    sliderText[sliderImages.indexOf(image)].classList.add('active');
   } else {
    // Animate image out of view   
    image.classList.remove('active');
    // Animate corresponding text out of view
    sliderText[sliderImages.indexOf(image)].classList.remove('active');    
   }
 });
}
// Adding a scroll event to window. checkSlide is wrapped in debounce function
// Add (checkSlide, number) to increase time
window.addEventListener('scroll', debounce(checkSlide));