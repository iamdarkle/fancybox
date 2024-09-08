import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox, Carousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import '@fancyapps/ui/dist/carousel/carousel.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    // Wrap images and initialize Carousel and Fancybox
    this.element
      .querySelectorAll('.Post-body img:not(.emoji):not(.Avatar):not(.PostMeta-ip img):not([data-reaction]):not([data-link-preview]):not(.flamoji img):not(.countryFlag):not(.no-fancybox)')
      .forEach((node) => {
        const src = node.getAttribute('data-src') || node.getAttribute('src');
        const parent = node.parentNode;

        // Check if it's part of a gallery
        if (parent && !parent.closest('.f-carousel__slide')) {
          // Create a carousel slide container
          const slide = document.createElement('div');
          slide.classList.add('f-carousel__slide');
          slide.setAttribute('data-fancybox', 'gallery');
          slide.setAttribute('data-src', src);
          slide.appendChild(node);

          // Insert the slide into a carousel track
          const carouselTrack = document.createElement('div');
          carouselTrack.classList.add('f-carousel__track');
          carouselTrack.appendChild(slide);

          // Insert the carousel viewport
          const carouselViewport = document.createElement('div');
          carouselViewport.classList.add('f-carousel__viewport');
          carouselViewport.appendChild(carouselTrack);

          // Insert the full carousel container
          const carouselContainer = document.createElement('div');
          carouselContainer.classList.add('f-carousel');
          carouselContainer.appendChild(carouselViewport);

          parent.insertBefore(carouselContainer, node);
        }
      });

    // Initialize Carousel for each gallery
    this.element.querySelectorAll('.f-carousel').forEach((carouselElement) => {
      new Carousel(carouselElement, {
        Dots: false,
        infinite: true,
      });
    });

    // Initialize Fancybox for all elements with data-fancybox attribute
    Fancybox.bind('[data-fancybox="gallery"]', {
      // Custom options can be added here
    });
  });
});
