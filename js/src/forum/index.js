import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';

import { Carousel } from '@fancyapps/ui/dist/carousel/carousel.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.css';

import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    const postBody = this.element.querySelector('.Post-body');
    
    // Function to get the correct image URL
    const getImageUrl = (element) => {
      const img = element.querySelector('img');
      return img ? (img.getAttribute('data-src') || img.getAttribute('src')) : element.href;
    };

    // Initialize Carousel for each gallery
    postBody.querySelectorAll('.fancybox-gallery').forEach((gallery, index) => {
      gallery.id = `gallery-${index}`;
      const carousel = new Carousel(gallery, {
        Dots: false,
        on: {
          createSlide: (carousel, slide) => {
            const link = slide.el.querySelector('a');
            if (link) {
              link.addEventListener('click', (e) => {
                if (!carousel.isDragging) {
                  e.preventDefault();
                  const slides = Array.from(gallery.querySelectorAll('.f-carousel__slide'));
                  const images = slides.map(slide => ({
                    src: getImageUrl(slide.querySelector('a')),
                    type: 'image'
                  }));
                  Fancybox.show(images, { startIndex: slide.index });
                }
              });
            }
          }
        }
      });
    });

    // Initialize Fancybox for single images
    Fancybox.bind('a[data-fancybox="single"]', {
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

    // Handle clicks on single images
    postBody.querySelectorAll('a[data-fancybox="single"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const imageUrl = getImageUrl(link);
        Fancybox.show([{ src: imageUrl, type: 'image' }]);
      });
    });
  });
});
