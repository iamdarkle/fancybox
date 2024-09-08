import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

app.initializers.add('darkle/fancybox', () => {
  extend(CommentPost.prototype, 'oncreate', function () {
    console.log('Initializing Fancybox');
    // Initialize Fancybox for both single images and galleries
    Fancybox.bind('[data-fancybox]', {
      // Add any custom options here
    });
  });
});
