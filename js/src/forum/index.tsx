import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox } from '@fancyapps/ui';
import { Carousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import '@fancyapps/ui/dist/carousel/carousel.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    console.log('Running oncreate for CommentPost');

    // Initialize Carousel
    this.element.querySelectorAll('.f-carousel').forEach((carousel) => {
      new Carousel(carousel, {
        Dots: false,
      });
    });

    console.log('Binding Fancybox');
    // Bind Fancybox to the newly created anchor elements
    Fancybox.bind('[data-fancybox="gallery"]', {
      // Add any custom options here
      Carousel: {
        infinite: false,
      },
      Slideshow: {
        playOnStart: true,
        timeout: 3000,
      },
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ["slideshow", "close"],
        },
      },
      Images: {
        zoom: false,
      },
    });
  });
});
