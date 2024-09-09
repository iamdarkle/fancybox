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
    const currentIndices = new Map(); // Map to store current indices for each gallery

    postBody.querySelectorAll('.fancybox-gallery').forEach((gallery, index) => {
      if (!gallery.id) {
        gallery.id = `gallery-${index}`;
        const carousel = new Carousel(gallery, {
          Dots: false,
          infinite: false,
          dragFree: false,
        });
        carousels.set(gallery.id, carousel);
        currentIndices.set(gallery.id, 0); // Initialize current index
      }
    });

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

          const gallery = link.closest('.fancybox-gallery');
          if (!gallery) return;

          // Use the stored current index for this gallery
          const startIndex = currentIndices.get(gallery.id) || 0;

          const fancyboxInstance = Fancybox.fromNodes(Array.from(group), {
            Carousel: {
              infinite: false,
              Sync: {
                target: carousels.get(gallery.id),
              },
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
            dragToClose: false,
            startIndex: startIndex,
          });

          // Update current index on slide change
          fancyboxInstance.on('Carousel.change', (fancybox) => {
            const slide = fancybox.getSlide();
            currentIndices.set(gallery.id, slide.index);
          });
        }
      });
    });
  };
});
