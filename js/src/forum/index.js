import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';

import { Carousel } from '@fancyapps/ui/dist/carousel/carousel.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.css';

import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    console.log('Initializing Carousel');

    // Initialize Carousel for each gallery
    this.element.querySelectorAll('.f-carousel').forEach((carouselElement) => {
      new Carousel(carouselElement, {
        // Carousel options
        Dots: false,
        infinite: true,
      });
    });

    console.log('Initializing Fancybox');

    // Initialize Fancybox for all elements with data-fancybox attribute
    Fancybox.bind('[data-fancybox="gallery"]', {
      // Fancybox options can be added here
    });
  });
});
