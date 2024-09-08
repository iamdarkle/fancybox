import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';

import { Carousel } from '@fancyapps/ui/dist/carousel/carousel.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.css';

import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    const postBody = this.element.querySelector('.Post-body');
    
    // Function to get the correct image URL
    const getImageUrl = (element) => {
      const img = element.querySelector('img');
      return img ? (img.getAttribute('data-src') || img.getAttribute('src')) : element.href;
    };

    // Initialize Carousel for each gallery
    postBody.querySelectorAll('.fancybox-gallery').forEach((gallery, index) => {
      gallery.id = `gallery-${index}`;
      const carousel = new Carousel(gallery, {
        Dots: false,
        infinite: false,
      });

      // Prevent Fancybox from opening when dragging the carousel
      let isDragging = false;
      carousel.on('dragStart', () => { isDragging = true; });
      carousel.on('dragEnd', () => { setTimeout(() => { isDragging = false; }, 0); });
    });

    // Initialize Fancybox for both galleries and single images
    Fancybox.bind('[data-fancybox]', {
      Carousel: {
        infinite: false,
      },
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ["slideshow", "fullscreen", "close"],
        },
      },
      Images: {
        initialSize: 'fit',
      },
    });

    // Prevent page refresh on all Fancybox-enabled image clicks
    postBody.querySelectorAll('a[data-fancybox]').forEach(link => {
      link.addEventListener('click', (e) => {
        const carousel = link.closest('.fancybox-gallery');
        if (carousel && carousel.classList.contains('is-dragging')) {
          return;
        }
        
        e.preventDefault();
        const imageUrl = getImageUrl(link);
        if (link.getAttribute('data-fancybox') === 'single') {
          Fancybox.show([{ src: imageUrl, type: 'image' }]);
        } else {
          // For carousel images, find the correct starting index
          const gallery = link.closest('.fancybox-gallery');
          if (gallery) {
            const slides = Array.from(gallery.querySelectorAll('.f-carousel__slide'));
            const index = slides.indexOf(link.closest('.f-carousel__slide'));
            const images = slides.map(slide => ({
              src: getImageUrl(slide.querySelector('a')),
              type: 'image'
            }));
            Fancybox.show(images, { startIndex: index });
          }
        }
      });
    });
  });
});
