<?php

namespace Darkle\Fancybox;

use s9e\TextFormatter\Configurator;

class DefineGalleryTemplate
{
    public function __invoke(Configurator $config)
    {
        // Define the gallery container
        $tag = $config->tags->add('IMG-GALLERY');
        $tag->template = <<<XML
        <div>
            <xsl:apply-templates/>
        </div>
        XML;

        // Define each gallery item
        $tag = $config->tags->add('IMG-GALLERY-ITEM');
        $tag->template = <<<XML
            <a data-fancybox="gallery" href="{@src}">
                <img src="{@src}" alt="{@alt}" loading="lazy"/>
            </a>
        XML;

        // Ensure each image is wrapped appropriately
        foreach (['IMG', 'UPL-IMAGE-PREVIEW'] as $tagName) {
            if ($config->tags->exists($tagName)) {
                $tag = $config->tags->get($tagName);

                // Wrap each image with a link for Fancybox
                $dom = $tag->template->asDOM();
                $imgs = $dom->getElementsByTagName('img');
                foreach ($imgs as $img) {
                    $img->setAttribute('loading', 'lazy'); // Adding the lazy loading attribute
                    $a = $dom->createElement('a');
                    $a->setAttribute('data-fancybox', 'gallery');
                    $a->setAttribute('href', $img->getAttribute('src'));
                    $img->parentNode->replaceChild($a, $img);
                    $a->appendChild($img);
                }
                $dom->saveChanges();
            }
        }
    }
}
