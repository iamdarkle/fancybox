import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox, Carousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import '@fancyapps/ui/dist/carousel/carousel.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    const images = Array.from(
      this.element.querySelectorAll(
        '.Post-body img:not(.emoji):not(.Avatar):not(.PostMeta-ip img):not([data-reaction]):not([data-link-preview]):not(.flamoji img):not(.countryFlag):not(.no-fancybox)'
      )
    );

    let galleryImages = [];
    images.forEach((img, index) => {
      // Check if the image is part of a gallery
      const isPartOfGallery =
        (index > 0 && images[index - 1].nextElementSibling === img) ||
        (index < images.length - 1 && images[index + 1].previousElementSibling === img);

      if (isPartOfGallery) {
        galleryImages.push(img);
      } else {
        // Handle single image
        wrapSingleImage(img);
      }
    });

    if (galleryImages.length > 0) {
      wrapGalleryImages(galleryImages);
    }

    // Initialize Fancybox for all elements with data-fancybox attribute
    Fancybox.bind('[data-fancybox]', {
      // Custom options can be added here
    });
  });

  function wrapSingleImage(img) {
    const src = img.getAttribute('data-src') || img.getAttribute('src');
    if (!img.closest('a[data-fancybox]')) {
      const fancyboxEl = document.createElement('a');
      fancyboxEl.setAttribute('data-fancybox', 'single');
      fancyboxEl.href = src;
      img.parentNode.insertBefore(fancyboxEl, img);
      fancyboxEl.appendChild(img);
    }
  }

  function wrapGalleryImages(images) {
    const carouselTrack = document.createElement('div');
    carouselTrack.classList.add('f-carousel__track');

    images.forEach((img) => {
      const src = img.getAttribute('data-src') || img.getAttribute('src');
      const slide = document.createElement('div');
      slide.classList.add('f-carousel__slide');
      slide.setAttribute('data-fancybox', 'gallery');
      slide.setAttribute('data-src', src);
      slide.appendChild(img);
      carouselTrack.appendChild(slide);
    });

    const carouselViewport = document.createElement('div');
    carouselViewport.classList.add('f-carousel__viewport');
    carouselViewport.appendChild(carouselTrack);

    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('f-carousel');
    carouselContainer.appendChild(carouselViewport);

    images[0].parentNode.insertBefore(carouselContainer, images[0]);
  }
});
