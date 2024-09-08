<?php

namespace Darkle\Fancybox;

use s9e\TextFormatter\Configurator;

class DefineGalleryTemplate
{
    public function __invoke(Configurator $config)
    {
        // Define the IMG-GALLERY tag template
        $tag = $config->tags->add('IMG-GALLERY');
        $tag->template = <<<XML
        <div class="f-carousel" data-fancybox="gallery">
            <div class="f-carousel__viewport">
                <div class="f-carousel__track">
                    <xsl:apply-templates/>
                </div>
            </div>
        </div>
        XML;

        // Define the IMG-GALLERY-ITEM tag template
        $tag = $config->tags->add('IMG-GALLERY-ITEM');
        $tag->template = <<<XML
            <div class="f-carousel__slide">
                <xsl:apply-templates/>
            </div>
        XML;
    }
}
