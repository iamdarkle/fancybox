import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';

import { Carousel } from '@fancyapps/ui/dist/carousel/carousel.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.css';

import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    this.initFancybox();
  });

  extend(CommentPost.prototype, 'onupdate', function () {
    this.initFancybox();
  });

  CommentPost.prototype.initFancybox = function () {
    const postBody = this.element.querySelector('.Post-body');
    if (!postBody) return;

    // Initialize Carousel for each gallery
    postBody.querySelectorAll('.fancybox-gallery').forEach((gallery, index) => {
      if (!gallery.id) {
        gallery.id = `gallery-${index}`;
        new Carousel(gallery, {
          Dots: false,
          infinite: false,
          dragFree: true,
        });
      }
    });

    // Prepare Fancybox items
    const fancyboxItems = [];
    postBody.querySelectorAll('a[data-fancybox]').forEach((link, index) => {
      const img = link.querySelector('img');
      if (img) {
        const src = img.getAttribute('data-src') || img.getAttribute('src') || link.href;
        fancyboxItems.push({
          src: src,
          type: 'image',
          thumbSrc: img.src,
        });
        
        // Update link to use JavaScript API
        link.onclick = (e) => {
          e.preventDefault();
          Fancybox.show(fancyboxItems, {
            startIndex: index,
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
            Images: {
              initialSize: 'fit',
            },
          });
        };
      }
    });
  };
});
