import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox, Carousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import '@fancyapps/ui/dist/carousel/carousel.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    // Wrap images with anchor tags for Fancybox
    this.element
      .querySelectorAll('.Post-body img:not(.emoji):not(.Avatar):not(.PostMeta-ip img):not([data-reaction]):not([data-link-preview]):not(.flamoji img):not(.countryFlag):not(.no-fancybox)')
      .forEach((node) => {
        const src = node.getAttribute('data-src') || node.getAttribute('src');
        if (!node.closest('a[data-fancybox]')) {
          const fancyboxEl = document.createElement('a');
          fancyboxEl.setAttribute('data-fancybox', 'gallery');
          fancyboxEl.href = src;
          node.parentNode.insertBefore(fancyboxEl, node);
          fancyboxEl.appendChild(node);
        }
      });

    // Initialize Carousel for each gallery
    this.element.querySelectorAll('.f-carousel').forEach((carouselElement) => {
      new Carousel(carouselElement, {
        // Carousel options
        Dots: false,
        infinite: true,
      });
    });

    // Initialize Fancybox
    Fancybox.bind('[data-fancybox]', {
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
