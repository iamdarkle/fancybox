import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    const images = this.element.querySelectorAll(
      '.Post-body img:not(.emoji):not(.Avatar):not(.PostMeta-ip img):not([data-reaction]):not([data-link-preview]):not(.flamoji img):not(.countryFlag):not(.no-fancybox)'
    );

    if (images.length === 0) return;

    // Create a container for the gallery if there are multiple images
    const isGallery = images.length > 1;

    images.forEach((node) => {
      const src = node.getAttribute('data-src') || node.getAttribute('src');
      const fancyboxEl = document.createElement('a');
      fancyboxEl.href = src;
      fancyboxEl.setAttribute('data-fancybox', isGallery ? 'gallery' : 'single');

      // Insert the anchor element before the image and append the image to it
      node.parentNode.insertBefore(fancyboxEl, node);
      fancyboxEl.appendChild(node);
    });

    // Bind Fancybox to the container
    Fancybox.bind(this.element, '[data-fancybox]', {
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

  extend(CommentPost.prototype, 'onremove', function () {
    // Unbind Fancybox when the component is removed
    Fancybox.unbind(this.element);
    Fancybox.close();
  });
});
