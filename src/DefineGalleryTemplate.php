<?php

namespace Darkle\Fancybox;

use s9e\TextFormatter\Configurator;

class DefineGalleryTemplate
{
    public function __invoke(Configurator $config)
    {
        $tag = $config->tags->add('IMG-GALLERY');
        $tag->template = <<<XML
        <div class="f-carousel" data-fancybox="gallery">
            <div class="f-carousel__track">
                <xsl:apply-templates/>
            </div>
        </div>
        XML;

        $tag = $config->tags->add('IMG-GALLERY-ITEM');
        $tag->template = <<<XML
            <div class="f-carousel__slide">
                <xsl:apply-templates/>
            </div>
        XML;
    }
}
