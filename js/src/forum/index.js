import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox } from '@fancyapps/ui';
import { Carousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/carousel/carousel.css';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    // Initialize Carousel
    this.element
      .querySelectorAll('.f-carousel')
      .forEach((carousel) => {
        new Carousel(carousel, {
          Dots: false,
        });
      });

    // Initialize Fancybox
    Fancybox.bind('[data-fancybox="gallery"]', {
      // Custom Fancybox options
    });
  });
});
