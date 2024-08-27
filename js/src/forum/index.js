import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox } from '@fancyapps/ui';

app.initializers.add('darkle/fancybox', () => {
  Fancybox.defaults.Image = { zoom: false };

  extend(CommentPost.prototype, 'oncreate', function (vnode) {
    this.element
      .querySelectorAll('.Post-body img:not(.emoji):not(.Avatar):not(.PostMeta-ip img):not([data-reaction]):not([data-link-preview]):not(.flamoji img):not(.countryFlag):not(.no-fancybox)')
      .forEach((node) => {
        const fancyboxEl = document.createElement('a');
        fancyboxEl.setAttribute('data-fancybox', 'responsive');
        fancyboxEl.setAttribute('data-src', node.getAttribute('data-src') || node.getAttribute('src'));

        $(node).wrap(fancyboxEl);
      });
  });
});
