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
    
    // Initialize Carousel for each gallery
    postBody.querySelectorAll('.fancybox-gallery').forEach((gallery, index) => {
      gallery.id = `gallery-${index}`;
      new Carousel(gallery, {
        Dots: false,
      });
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
    });

    // Prevent page refresh on all Fancybox-enabled image clicks
    postBody.querySelectorAll('a[data-fancybox]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (link.getAttribute('data-fancybox') === 'single') {
          Fancybox.show([{ src: link.href, type: 'image' }]);
        } else {
          // For carousel images, find the correct starting index
          const gallery = link.closest('.fancybox-gallery');
          if (gallery) {
            const slides = Array.from(gallery.querySelectorAll('.f-carousel__slide'));
            const index = slides.indexOf(link.closest('.f-carousel__slide'));
            Fancybox.fromOpener(link, { startIndex: index });
          }
        }
      });
    });
  });
});
