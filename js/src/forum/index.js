import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox } from '@fancyapps/ui';
import { Carousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import '@fancyapps/ui/dist/carousel/carousel.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function (vnode) {
    // Wrap images with anchor tags for Fancybox, only if not already wrapped
    this.element
      .querySelectorAll('.Post-body img:not(.emoji):not(.Avatar):not(.PostMeta-ip img):not([data-reaction]):not([data-link-preview]):not(.flamoji img):not(.countryFlag):not(.no-fancybox)')
      .forEach((node) => {
        if (!node.closest('a[data-fancybox="gallery"]')) {
          const src = node.getAttribute('data-src') || node.getAttribute('src');
          const fancyboxEl = document.createElement('a');
          fancyboxEl.setAttribute('data-fancybox', 'gallery');
          fancyboxEl.href = src;
          node.parentNode.insertBefore(fancyboxEl, node);
          fancyboxEl.appendChild(node);
        }
      });

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
