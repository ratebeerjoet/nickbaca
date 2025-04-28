document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel__track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');
    const dotsNav = document.querySelector('.carousel__nav');

    // --- Initial Setup ---

    // Check if essential elements exist
    if (!track || !nextButton || !prevButton || slides.length === 0) {
        console.error("Carousel elements not found or no slides present.");
        // Optionally hide controls if setup fails
        const carousel = document.querySelector('.carousel');
        if (carousel) carousel.style.display = 'none';
        return; // Stop execution if setup fails
    }

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
        // Using 'left' property for positioning (alternative to transform)
        // If using transform: track.style.transform = 'translateX(-' + amountToMove + ')';
    };
    // slides.forEach(setSlidePosition); // We'll use transform on the track instead

    // Create Navigation Dots
    slides.forEach((_, index) => {
        const button = document.createElement('button');
        button.classList.add('carousel__indicator');
        if (index === 0) {
            button.classList.add('current-slide'); // Mark first dot as active
        }
        dotsNav.appendChild(button);
    });

    const dots = Array.from(dotsNav.children); // Get the created dots

    // Add slide count attribute for CSS hiding rules
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.setAttribute('data-slide-count', slides.length);
    }

    // --- Helper Functions ---

    const moveToSlide = (currentSlide, targetSlide) => {
        if (!targetSlide) return; // Exit if target slide doesn't exist

        const amountToMove = targetSlide.style.left || (slides.indexOf(targetSlide) * slideWidth + 'px'); // Calculate based on index if left isn't set yet
        track.style.transform = `translateX(-${targetSlide.offsetLeft}px)`; // Use offsetLeft for accurate position

        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        if (!currentDot || !targetDot) return;
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    const hideShowArrows = (targetIndex) => {
        if (slides.length <= 1) { // Hide both if only one slide
             prevButton.style.display = 'none';
             nextButton.style.display = 'none';
             return;
        }
        prevButton.style.display = targetIndex === 0 ? 'none' : 'block';
        nextButton.style.display = targetIndex === slides.length - 1 ? 'none' : 'block';
    };


    // --- Event Listeners ---

    // When I click left, move slides to the right
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        if (prevSlide) {
            moveToSlide(currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
            hideShowArrows(prevIndex);
        }
    });

    // When I click right, move slides to the left
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);

        if (nextSlide) {
            moveToSlide(currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
            hideShowArrows(nextIndex);
        }
    });

    // When I click the nav indicators, move to that slide
    dotsNav.addEventListener('click', e => {
        // What indicator was clicked on?
        const targetDot = e.target.closest('button.carousel__indicator');

        if (!targetDot) return; // Exit if click wasn't on a dot

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        if (targetSlide && targetDot !== currentDot) { // Only move if it's a different slide
             moveToSlide(currentSlide, targetSlide);
             updateDots(currentDot, targetDot);
             hideShowArrows(targetIndex);
        }
    });

    // --- Initialize Arrow Visibility ---
    const initialSlideIndex = slides.findIndex(slide => slide.classList.contains('current-slide'));
    hideShowArrows(initialSlideIndex >= 0 ? initialSlideIndex : 0); // Handle case where no slide has current-slide initially

}); // End DOMContentLoaded