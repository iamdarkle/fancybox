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
    const carousels = [];
    postBody.querySelectorAll('.fancybox-gallery').forEach((gallery, index) => {
      gallery.id = `gallery-${index}`;
      const carousel = new Carousel(gallery, {
        Dots: false,
        infinite: false,
        dragFree: true,
      });
      carousels.push(carousel);
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
      on: {
        done: (fancybox, slide) => {
          const carousel = carousels.find(c => c.container.id === slide.triggerEl.closest('.fancybox-gallery').id);
          if (carousel) {
            carousel.slideTo(slide.index, { friction: 0 });
          }
        },
      },
    });

    // Prevent Fancybox from opening when dragging the carousel
    postBody.querySelectorAll('.fancybox-gallery').forEach(gallery => {
      let isDragging = false;
      let startX, startY;

      gallery.addEventListener('mousedown', e => {
        isDragging = false;
        startX = e.pageX;
        startY = e.pageY;
      });

      gallery.addEventListener('mousemove', e => {
        if (Math.abs(e.pageX - startX) > 5 || Math.abs(e.pageY - startY) > 5) {
          isDragging = true;
        }
      });

      gallery.addEventListener('click', e => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);
    });
  });
});
