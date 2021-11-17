<?php

/*
 * This file is part of iamdarkle/fancybox
 *
 * Copyright (c) 2021 Tomás Romero.
 * Copyright (c) 2021 Mark Cutting.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Flarum\Extend;
use Flarum\Frontend\Document;

return [
    (new Extend\Frontend('forum'))
        ->content(function (Document $document) {
            $document->head[] = '<script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"></script>';
            $document->head[] = '<link rel="preload" as="style" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css" onload="this.onload=null;this.rel=\'stylesheet\'">';
            $document->foot[] = <<<HTML
<script>
flarum.core.compat.extend.extend(flarum.core.compat['components/CommentPost'].prototype, 'oncreate', function (output, vnode) {
    const self = this;

    this.$('img').not('.emoji').not(".Avatar").not($(".PostMeta-ip img")).each(function () {
        var currentImage = $(this);
        var checksrc = currentImage.attr("data-src");
        if (checksrc) {
            $(this).wrap("<a class=\"fancybox\" href='" + currentImage.attr("data-src") + "'></a>");
        }
        else {
            $(this).wrap("<a class=\"fancybox\" href='" + currentImage.attr("src") + "'></a>");
        }
        try {
            $().ready(function(){
                $().fancybox({
                    selector: '.fancybox'
                });
            })
        } catch (e) {
            console.error(e.name);
            console.error(e.message);
        }
    });
});
</script>
HTML;
        })
];