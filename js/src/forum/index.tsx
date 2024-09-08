import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox, Carousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import '@fancyapps/ui/dist/carousel/carousel.css';

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
    Fancybox.bind('[data-fancybox]', {
      // Fancybox options can be added here
    });
  });
});
