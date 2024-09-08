import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    // Wrap single images with anchor tags for Fancybox
    this.element
      .querySelectorAll('.Post-body img:not(.emoji):not(.Avatar):not(.PostMeta-ip img):not([data-reaction]):not([data-link-preview]):not(.flamoji img):not(.countryFlag):not(.no-fancybox)')
      .forEach((node) => {
        if (!node.closest('.f-carousel__slide')) { // Ensure it's not part of a gallery
          const src = node.getAttribute('data-src') || node.getAttribute('src');
          if (!node.closest('a[data-fancybox]')) {
            const fancyboxEl = document.createElement('a');
            fancyboxEl.setAttribute('data-fancybox', 'single');
            fancyboxEl.href = src;
            node.parentNode.insertBefore(fancyboxEl, node);
            fancyboxEl.appendChild(node);
          }
        }
      });

    // Initialize Fancybox for all elements with data-fancybox attribute
    Fancybox.bind('[data-fancybox]', {
      // Custom options can be added here
    });
  });
});
