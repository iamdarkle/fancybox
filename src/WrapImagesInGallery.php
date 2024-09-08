<?php

namespace Darkle\Fancybox;

use s9e\TextFormatter\Renderer;

class WrapImagesInGallery
{
    const MATCH_IMG_TAGS = '((?:<UPL-IMAGE-PREVIEW[^>]*>(?:(?!<\/UPL-IMAGE-PREVIEW>).)*<\/UPL-IMAGE-PREVIEW>)|(?:<IMG[^>]*>(?:(?!<\/IMG>).)*<\/IMG>))';
    const MATCH_GALLERY_REGEX = '((?:'.self::MATCH_IMG_TAGS.'(?:\n|<br\/>)*){2,})';

    public function __invoke(Renderer $renderer, $context, string $xml): string
    {
        // Wrap gallery images
        $xml = preg_replace_callback('/'.self::MATCH_GALLERY_REGEX.'/m', function ($matches) {
            $m = preg_replace('/'.self::MATCH_IMG_TAGS.'/m', '<IMG-GALLERY-ITEM>$1</IMG-GALLERY-ITEM>', $matches[0]);

            return '<IMG-GALLERY>' . str_replace('<br/>', '', $m) . '</IMG-GALLERY>';
        }, $xml);

        // Wrap single images
        $xml = preg_replace('/<IMG src="([^"]+)"(.*?)>(.*?)<\/IMG>/', '<a href="$1" data-fancybox="single"><img src="$1" $2>$3</img></a>', $xml);

        return $xml;
    }
}
