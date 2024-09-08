import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox } from '@fancyapps/ui';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function (vnode) {
    // Initialize Fancybox for single images
    this.element
      .querySelectorAll('.Post-body img:not(.emoji):not(.Avatar):not(.PostMeta-ip img):not([data-reaction]):not([data-link-preview]):not(.flamoji img):not(.countryFlag):not(.no-fancybox)')
      .forEach((node) => {
        if (!node.closest('.fancybox-gallery')) {
          const src = node.getAttribute('data-src') || node.getAttribute('src');
          const fancyboxEl = document.createElement('a');
          fancyboxEl.setAttribute('data-fancybox', 'single');
          fancyboxEl.href = src;
          node.parentNode.insertBefore(fancyboxEl, node);
          fancyboxEl.appendChild(node);
        }
      });

    // Initialize Fancybox for galleries
    Fancybox.bind('[data-fancybox="gallery"], [data-fancybox="single"]', {
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
