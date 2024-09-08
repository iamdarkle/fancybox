<?php

namespace Darkle\Fancybox;

use s9e\TextFormatter\Configurator;

class DefineGalleryTemplate
{
    public function __invoke(Configurator $config)
    {
        // Define the IMG-GALLERY tag template
        $galleryTag = $config->tags->add('IMG-GALLERY');
        $galleryTag->template = <<<XML
        <div class="f-carousel">
            <div class="f-carousel__viewport">
                <div class="f-carousel__track">
                    <xsl:apply-templates/>
                </div>
            </div>
        </div>
        XML;

        // Define the IMG-GALLERY-ITEM tag template
        $itemTag = $config->tags->add('IMG-GALLERY-ITEM');
        $itemTag->template = <<<XML
            <div class="f-carousel__slide" data-fancybox="gallery" data-src="{@src}" data-index="{count(preceding-sibling::*)}">
                <img src="{@src}" alt="{@alt}" />
            </div>
        XML;
    }
}
