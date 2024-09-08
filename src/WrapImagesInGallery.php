<?php

namespace Darkle\Fancybox;

use s9e\TextFormatter\Renderer;
use s9e\TextFormatter\Utils;

class WrapImagesInGallery
{
    const MATCH_IMG_TAGS = '((?:<IMG[^>]*>(?:(?!<\/IMG>).)*<\/IMG>))';
    const MATCH_GALLERY_REGEX = '((?:'.self::MATCH_IMG_TAGS.'(?:\n|<br\/>)*){2,})';

    public function __invoke(Renderer $renderer, $context, string $xml): string
    {
        return preg_replace_callback('/'.self::MATCH_GALLERY_REGEX.'/m', function ($matches) {
            $m = preg_replace('/'.self::MATCH_IMG_TAGS.'/m', '<FANCYBOX-GALLERY-ITEM>$1</FANCYBOX-GALLERY-ITEM>', $matches[0]);

            return '<FANCYBOX-GALLERY>' . str_replace('<br/>', '', $m) . '</FANCYBOX-GALLERY>';
        }, $xml);
    }
}
