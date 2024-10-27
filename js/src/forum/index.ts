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
    postBody.querySelectorAll('.fancybox-gallery').forEach((gallery) => {
      new Carousel(gallery as HTMLElement, {
        Dots: false,
        infinite: false,
        dragFree: false,
      });
    });

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
        const startIndex = Array.from(group).indexOf(link);

        Fancybox.fromNodes(Array.from(group), {
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
          startIndex,
        });
      });
    });
  });
});
