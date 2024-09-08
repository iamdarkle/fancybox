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

    // Initialize Fancybox for galleries
    Fancybox.bind('[data-fancybox="gallery"]', {
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

    // Make Fancybox available globally for single image clicks
    window.Fancybox = Fancybox;
  });
});
