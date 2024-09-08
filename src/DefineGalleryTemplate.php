<?php

namespace Darkle\Fancybox;

use s9e\TextFormatter\Configurator;

class DefineGalleryTemplate
{
    public function __invoke(Configurator $config)
    {
        $tag = $config->tags->add('IMG-GALLERY');
        $tag->template = <<<XML
        <div class="fancybox-gallery" data-fancybox="gallery">
            <xsl:apply-templates/>
        </div>
        XML;

        $tag = $config->tags->add('IMG-GALLERY-ITEM');
        $tag->template = <<<XML
            <div class="fancybox-item">
                <xsl:apply-templates/>
            </div>
        XML;
    }
}
