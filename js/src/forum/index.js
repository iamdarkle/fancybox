import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox } from '@fancyapps/ui';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    // Handle individual images
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

    // Initialize fancybox for individual images
    Fancybox.bind('[data-fancybox="gallery"]', {
      Images: {
        zoom: false,
      },
    });

    // Handle galleries (carousels)
    this.element
      .querySelectorAll('.f-carousel[data-fancybox="gallery"]')
      .forEach((carousel) => {
        Fancybox.bind(carousel, {
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
});
