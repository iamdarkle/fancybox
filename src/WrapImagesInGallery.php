<?php

namespace Darkle\Fancybox;

use s9e\TextFormatter\Renderer;
use s9e\TextFormatter\Utils;

class WrapImagesInGallery
{
    const MATCH_IMG_TAGS = '(\[upl-image-preview[^\]]*\]|\<IMG[^>]*\>(?:.*?)\<\/IMG\>|\<UPL-IMAGE-PREVIEW[^>]*\>(?:.*?)\<\/UPL-IMAGE-PREVIEW\>)';
    const MATCH_GALLERY_REGEX = '/(' . self::MATCH_IMG_TAGS . '(?:\s*\n\s*' . self::MATCH_IMG_TAGS . ')+)/s';

    public function __invoke(Renderer $renderer, $context, string $xml): string
    {
        return preg_replace_callback(self::MATCH_GALLERY_REGEX, function ($matches) {
            $images = preg_split('/\s*\n\s*/', $matches[1]);
            $galleryItems = array_map(function($img) {
                return '<FANCYBOX-GALLERY-ITEM>' . trim($img) . '</FANCYBOX-GALLERY-ITEM>';
            }, $images);
            
            return '<FANCYBOX-GALLERY>' . implode('', $galleryItems) . '</FANCYBOX-GALLERY>';
        }, $xml);
    }
}
