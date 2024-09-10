<?php

/*
 * This file is part of iamdarkle/fancybox
 *
 * Copyright (c) 2024 Tomás Romero.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Darkle\Fancybox;

use Flarum\Extend;
use Darkle\Fancybox\WrapImagesInGallery;
use Darkle\Fancybox\DefineGalleryTemplate;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Formatter)
        ->configure(DefineGalleryTemplate::class)
        ->render(WrapImagesInGallery::class),
];