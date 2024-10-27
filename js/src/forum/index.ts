import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';

import {Carousel, Fancybox} from '@fancyapps/ui';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'refreshContent', function () {
    if (this.isEditing()) return;

    const postBody = this.element.querySelector('.Post-body');
    if (!postBody || postBody.classList.contains("Post-body--fancybox")) return;

    postBody.classList.add("Post-body--fancybox");

    // Initialize Carousel for each gallery
    const carousels: Record<string, Carousel> = {};
    postBody.querySelectorAll('.fancybox-gallery').forEach((gallery, index) => {
      if (gallery.getAttribute("data-gallery-id")) return;
      const idx = index.toString();
      gallery.setAttribute("data-gallery-id", idx);
      carousels[idx] = new Carousel(gallery as HTMLElement, {
        Dots: false,
        infinite: false,
        dragFree: false,
      });
    });

    const syncSlide = (fancybox: Fancybox) => {
      const slide = fancybox.getSlide();
      if (!slide) return;
      const carouselEl = slide.triggerEl?.closest('.fancybox-gallery');
      if (!carouselEl) return;
      carousels[carouselEl.id]?.slideTo(slide.index, { friction: 0 });
    };

    (postBody.querySelectorAll('a[data-fancybox]') as unknown as HTMLElement[]).forEach((link) => {
      let isDragging = false;
      let startX: number, startY: number;

      link.addEventListener('mousedown', (e) => {
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
      });

      link.addEventListener('mousemove', (e) => {
        if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
          isDragging = true;
        }
      });

      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (isDragging) return;
        const groupName = link.getAttribute('data-fancybox');
        const carouselEl = link.closest('.fancybox-gallery');
        const group = (carouselEl || postBody).querySelectorAll(`a[data-fancybox="${groupName}"]`) as unknown as HTMLElement[];
        const index = Array.from(group).indexOf(link);

        const fancyboxInstance = Fancybox.fromNodes(Array.from(group), {
          Carousel: {
            infinite: false,
          },
          Toolbar: {
            display: {
              left: ['infobar'],
                  middle: ['rotateCCW', 'rotateCW', 'flipX', 'flipY'],
                  right: ['slideshow', 'fullscreen', 'close'],
            },
          },
          Images: {
            initialSize: 'fit' as 'fit',
          },
          dragToClose: true,
              Hash: false,
          startIndex: index,
        });

        // Sync slide changes between Carousel and Fancybox
        fancyboxInstance.on(['Carousel.ready', 'Carousel.change'], syncSlide);
      });
    });
  });
});
