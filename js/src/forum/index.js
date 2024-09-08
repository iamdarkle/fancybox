import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox, Carousel } from '@fancyapps/ui';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    // Initialize Fancybox for individual images
    this.element
      .querySelectorAll('.Post-body img:not(.emoji):not(.Avatar):not(.PostMeta-ip img):not([data-reaction]):not([data-link-preview]):not(.flamoji img):not(.countryFlag):not(.no-fancybox)')
      .forEach((node) => {
        const src = node.getAttribute('data-src') || node.getAttribute('src');
        const fancyboxEl = document.createElement('a');
        fancyboxEl.setAttribute('data-fancybox', 'gallery');
        fancyboxEl.href = src;
        node.parentNode.insertBefore(fancyboxEl, node);
        fancyboxEl.appendChild(node);
      });

    Fancybox.bind('[data-fancybox="gallery"]', {
      Images: {
        zoom: false,
      },
    });

    // Initialize Carousel for galleries
    this.element
      .querySelectorAll('.f-carousel[data-fancybox="gallery"]')
      .forEach((carousel) => {
        new Carousel(carousel, {
          infinite: false,
        });
      });
  });
});
