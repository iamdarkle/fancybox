import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox, Carousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import '@fancyapps/ui/dist/carousel/carousel.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    // Select all images that need to be processed
    const images = this.element.querySelectorAll(
      '.Post-body img:not(.emoji):not(.Avatar):not(.PostMeta-ip img):not([data-reaction]):not([data-link-preview]):not(.flamoji img):not(.countryFlag):not(.no-fancybox)'
    );

    if (images.length === 0) return;

    // Create a container for the gallery if there are multiple images
    const isGallery = images.length > 1;
    const galleryContainer = isGallery ? document.createElement('div') : null;
    
    if (isGallery) {
      galleryContainer.setAttribute('data-fancybox', 'gallery');
      this.element.appendChild(galleryContainer);
    }

    images.forEach((node) => {
      const src = node.getAttribute('data-src') || node.getAttribute('src');
      const fancyboxEl = document.createElement('a');
      fancyboxEl.href = src;
      
      if (isGallery) {
        // Append image to gallery container
        galleryContainer.appendChild(fancyboxEl);
      } else {
        // Treat as a single image
        fancyboxEl.setAttribute('data-fancybox', 'single');
        node.parentNode.insertBefore(fancyboxEl, node);
      }

      fancyboxEl.appendChild(node);
    });

    // Bind Fancybox based on the context
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

    Fancybox.bind('[data-fancybox="single"]', {
      Images: {
        zoom: false,
      },
    });
  });
});
