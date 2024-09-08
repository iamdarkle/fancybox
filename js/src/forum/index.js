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
    postBody.querySelectorAll('.fancybox-gallery').forEach((gallery, index) => {
      if (!gallery.id) {
        gallery.id = `gallery-${index}`;
        new Carousel(gallery, {
          Dots: false,
          infinite: false,
          dragFree: true,
        });
      }
    });

    // Initialize Fancybox for both galleries and single images
    Fancybox.bind(postBody, '[data-fancybox]', {
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
        initCarousel: (fancybox) => {
          const slide = fancybox.getSlide();
          const carouselEl = slide.triggerEl && slide.triggerEl.closest('.fancybox-gallery');
          if (carouselEl) {
            const carousel = Carousel.getInstance(carouselEl);
            if (carousel) {
              carousel.slideTo(slide.index);
            }
          }
        },
      },
    });

    // Prevent default link behavior
    postBody.querySelectorAll('a[data-fancybox]').forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
      };
    });
  };
});
