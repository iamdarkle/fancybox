import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';

import { Carousel } from '@fancyapps/ui/dist/carousel/carousel.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.css';

import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oninit', function() {
    this.initFancybox = () => {
      const postBody = this.element.querySelector('.Post-body');
      if (!postBody) return;

      // Initialize Carousel for each gallery
      const carousels = new Map();
      postBody.querySelectorAll('.fancybox-gallery').forEach((gallery, index) => {
        if (!gallery.id) {
          gallery.id = `gallery-${index}`;
          const carousel = new Carousel(gallery, {
            Dots: false,
            infinite: false,
            dragFree: true,
          });
          carousels.set(gallery.id, carousel);
        }
      });

      // Fancybox options
      const fancyboxOptions = {
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
          init: (fancybox) => {
            const slide = fancybox.getSlide();
            const carouselEl = slide.triggerEl.closest('.fancybox-gallery');
            if (carouselEl) {
              const carousel = carousels.get(carouselEl.id);
              if (carousel) {
                carousel.slideTo(slide.index, { friction: 0 });
              }
            }
          },
          "Carousel.change": (fancybox, carousel, slideIndex) => {
            const slide = fancybox.getSlide();
            const carouselEl = slide.triggerEl.closest('.fancybox-gallery');
            if (carouselEl) {
              const carousel = carousels.get(carouselEl.id);
              if (carousel) {
                carousel.slideTo(slideIndex, { friction: 0 });
              }
            }
          },
          destroy: (fancybox) => {
            const lastSlide = fancybox.getSlide();
            const carouselEl = lastSlide.triggerEl.closest('.fancybox-gallery');
            if (carouselEl) {
              const carousel = carousels.get(carouselEl.id);
              if (carousel) {
                carousel.slideTo(lastSlide.index, { friction: 0 });
              }
            }
          },
        },
        dragToClose: false,
      };

      // Handle clicks on Fancybox-enabled links
      postBody.querySelectorAll('a[data-fancybox]').forEach(link => {
        let isDragging = false;
        let startX, startY;

        link.addEventListener('mousedown', (e) => {
          isDragging = false;
          startX = e.clientX;
          startY = e.clientY;
        });

        link.addEventListener('mousemove', (e) => {
          if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
            isDragging = true;
          }
        });

        link.addEventListener('click', (e) => {
          e.preventDefault();
          if (!isDragging) {
            const groupName = link.getAttribute('data-fancybox');
            const group = postBody.querySelectorAll(`a[data-fancybox="${groupName}"]`);
            const index = Array.from(group).indexOf(link);
            
            Fancybox.show(
              Array.from(group).map(el => {
                const img = el.querySelector('img');
                return {
                  src: img.getAttribute('data-src') || img.src,
                  thumb: img.src,
                  type: 'image',
                };
              }),
              {
                ...fancyboxOptions,
                startIndex: index,
              }
            );
          }
        });
      });

      // Sync carousels with Fancybox
      carousels.forEach((carousel, id) => {
        carousel.on('change', (carousel) => {
          const fancybox = Fancybox.getInstance();
          if (fancybox) {
            const currentSlide = fancybox.getSlide();
            if (currentSlide && currentSlide.triggerEl.closest('.fancybox-gallery').id === id) {
              fancybox.setPage(carousel.page);
            }
          }
        });
      });
    };
  });

  extend(CommentPost.prototype, 'oncreate', function() {
    this.initFancybox();
  });

  extend(CommentPost.prototype, 'onupdate', function() {
    this.initFancybox();
  });
});
