import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';

import { Carousel } from '@fancyapps/ui/dist/carousel/carousel.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.css';

import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    this.initFancybox();
  });

  extend(CommentPost.prototype, 'onupdate', function () {
    this.initFancybox();
  });

  CommentPost.prototype.initFancybox = function () {
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
          dragFree: false,
          Navigation: {
            nextTpl: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d='M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z'/></svg>",
            prevTpl: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d='M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z'/></svg>",
          },
        });
        carousels.set(gallery.id, carousel);
      }
    });

    const fancyboxOptions = {
      Carousel: {
        infinite: false,
      },
      Toolbar: {
        display: {
          left: ["infobar"],
          middle: ["rotateCCW","rotateCW","flipX","flipY"],
          right: ["slideshow", "fullscreen", "close"],
        },
      },
      Images: {
        initialSize: 'fit',
      },
      on: {
        "Carousel.ready Carousel.change": (fancybox) => {
          const slide = fancybox.getSlide();
          const carouselEl = slide.triggerEl.closest('.fancybox-gallery');
          if (carouselEl) {
            const carousel = carousels.get(carouselEl.id);
            if (carousel) {
              // Correctly align the slide index
              carousel.slideTo(slide.index, { friction: 0 });
            }
          }
        },
      },
      dragToClose: true,
    };

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

          const fancyboxInstance = Fancybox.fromNodes(Array.from(group), {
            ...fancyboxOptions,
            startIndex: index,
          });

          // Sync slide changes between Carousel and Fancybox
          fancyboxInstance.on('Carousel.ready Carousel.change', (fancybox) => {
            const slide = fancybox.getSlide();
            const carouselEl = slide.triggerEl.closest('.fancybox-gallery');
            if (carouselEl) {
              const carousel = carousels.get(carouselEl.id);
              if (carousel) {
                // Ensure indices are correctly aligned
                carousel.slideTo(slide.index, { friction: 0 });
              }
            }
          });
        }
      });
    });
  };
});